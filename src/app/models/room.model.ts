import { Guest } from './guest.model';
import { Vote } from './vote.model';

export interface Room {
  id: string;
  name: string;
  guests: Guest[];
  votes: Map<Guest['id'], Vote>;

  createdAt: Date;
  updatedAt: Date;
}
