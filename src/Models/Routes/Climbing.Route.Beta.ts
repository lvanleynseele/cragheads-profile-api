import { ObjectId } from 'mongoose';

export interface RouteBeta {
  _id: ObjectId;
  routeId: ObjectId;
  userId: string;
  userName: string;
  upVotes: number;
  voteIds: ObjectId[];
  message: string;
  images?: string[];
  date: Date;
}
