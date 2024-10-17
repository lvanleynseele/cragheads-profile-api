import { ObjectId } from 'mongoose';
import { KeyMoveTypes } from '../../constants/enums';

//this object will be per route per climb
export interface OutdoorClimbData {
  _id: ObjectId;
  userId: ObjectId;
  climbId: ObjectId;
  //route specific info
  routeId: ObjectId;
  didSend: boolean;
  numberOfAttempts: number;
  percievedDifficulty?: number;
  myStyle: boolean;
  keyMoves?: KeyMoveTypes[];
  //content
  beta?: string; //convert this on submit to a new RouteBeta object, add to routeBeta collection, and store the id here
  images?: string[];
  notes?: string;
  //conditions?: string;
  date: Date;
}
