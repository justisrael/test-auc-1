import { Injectable } from '@nestjs/common';
import { Subject } from 'rxjs';

export interface BidEvent {
  auctionId: string;
  bidderId: string;
  amount: number;
  timestamp: Date;
}

@Injectable()
export class BidEventsService {
  private bidSubject = new Subject<BidEvent>();

  getBidStream() {
    return this.bidSubject.asObservable();
  }

  emitBid(event: BidEvent) {
    this.bidSubject.next(event);
  }
}
