import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { BidEventsService } from './bid-events.service';

@Injectable()
export class AuctionService {
  constructor(
    private prisma: PrismaService,
    private bidEvents: BidEventsService,
  ) {}

  async createAuction(title: string, startPrice: number, description?: string) {
    return this.prisma.auction.create({
      data: {
        title,
        description,
        startPrice,
        currentBid: startPrice,
      },
    });
  }

  async getAuction(id: string) {
    const auction = await this.prisma.auction.findUnique({
      where: { id },
      include: {
        bids: {
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    return auction;
  }

  async getAllAuctions() {
    return this.prisma.auction.findMany({
      include: {
        bids: {
          orderBy: { createdAt: 'desc' },
          take: 1,
        },
      },
    });
  }

  async placeBid(auctionId: string, bidderId: string, amount: number) {
    const auction = await this.prisma.auction.findUnique({
      where: { id: auctionId },
    });

    if (!auction) {
      throw new NotFoundException('Auction not found');
    }

    if (auction.status !== 'active') {
      throw new BadRequestException('Auction is not active');
    }

    if (amount <= auction.currentBid) {
      throw new BadRequestException(
        `Bid must be higher than current bid of ${auction.currentBid}`,
      );
    }

    // Create bid and update auction in a transaction
    const bid = await this.prisma.$transaction(async (tx) => {
      const newBid = await tx.bid.create({
        data: {
          auctionId,
          bidderId,
          amount,
        },
      });

      await tx.auction.update({
        where: { id: auctionId },
        data: { currentBid: amount },
      });

      return newBid;
    });

    // Emit SSE event
    this.bidEvents.emitBid({
      auctionId: bid.auctionId,
      bidderId: bid.bidderId,
      amount: bid.amount,
      timestamp: bid.createdAt,
    });

    return bid;
  }
}
