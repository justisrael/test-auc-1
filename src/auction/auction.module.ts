import { Module } from '@nestjs/common';
import { AuctionController } from './auction.controller';
import { AuctionService } from './auction.service';
import { BidEventsService } from './bid-events.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [AuctionController],
  providers: [AuctionService, BidEventsService, PrismaService],
})
export class AuctionModule {}
