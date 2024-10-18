import { ObjectId } from 'mongoose';

export interface RouteBetaVote {
  _id: ObjectId;
  betaId: ObjectId;
  userId: ObjectId;
  vote: number;
}
