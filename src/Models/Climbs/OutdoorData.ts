import { ObjectId } from 'mongoose';

export interface OutdoorClimbData {
  _id: ObjectId;
  userId: ObjectId;
  climbId: ObjectId;
  routeId: ObjectId;
  didSend: boolean;
  numberOfAttempts: number;
  percievedDifficulty?: number;
  myStyle: boolean;
  beta?: string; //convert this on submit to a new RouteBeta object, add to routeBeta collection, and store the id here

  //conditions?: string;
  notes?: string;
  date: Date;
}
