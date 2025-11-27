import { Controller, Get, Post, Body, Param, Sse } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { AuctionService } from './auction.service';
import { BidEventsService } from './bid-events.service';

@Controller()
export class AuctionController {
  constructor(
    private auctionService: AuctionService,
    private bidEvents: BidEventsService,
  ) {}

  @Post('auctions')
  async createAuction(
    @Body() body: { title: string; startPrice: number; description?: string },
  ) {
    return this.auctionService.createAuction(
      body.title,
      body.startPrice,
      body.description,
    );
  }

  @Get('auctions')
  async getAllAuctions() {
    return this.auctionService.getAllAuctions();
  }

  @Get('auctions/:id')
  async getAuction(@Param('id') id: string) {
    return this.auctionService.getAuction(id);
  }

  @Post('bids')
  async placeBid(
    @Body() body: { auctionId: string; bidderId: string; amount: number },
  ) {
    return this.auctionService.placeBid(
      body.auctionId,
      body.bidderId,
      body.amount,
    );
  }

  @Sse('bids/events')
  streamBids(): Observable<MessageEvent> {
    return this.bidEvents.getBidStream().pipe(
      map((bid) => ({
        data: bid,
      } as MessageEvent)),
    );
  }
}
