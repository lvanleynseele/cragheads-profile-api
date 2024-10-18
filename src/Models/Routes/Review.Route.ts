import { ObjectId } from 'mongoose';

export interface RouteReview {
  _id: ObjectId;
  routeId: string;
  userId: string;
  userName: string;
  rating: number;
  review: string;
  date: Date;
}
