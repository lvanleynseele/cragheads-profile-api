import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import {
  ClimbingTypes,
  GymHoldTypes,
  KeyMoveTypes,
} from '../../constants/enums';

export interface GymClimbData {
  _id: ObjectId;
  userId: ObjectId;
  climbId: ObjectId;
  //route specific info
  type: ClimbingTypes;
  didSend: boolean;
  numberOfAttempts: number;
  difficulty: number;
  percievedDifficulty?: number;
  keyHolds?: GymHoldTypes[];
  keyMoves?: KeyMoveTypes[];
  //content
  beta?: string; //not a route beta, maybe should just be notes
  images?: string[];
  notes?: string;
}

export const GymClimbDataSchema = new Schema<GymClimbData>(
  {
    _id: Schema.Types.ObjectId,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    climbId: {
      type: Schema.Types.ObjectId,
      ref: 'Climb',
      index: true,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(ClimbingTypes),
      required: true,
    },
    didSend: {
      type: Boolean,
      required: true,
    },
    numberOfAttempts: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    percievedDifficulty: {
      type: Number,
      required: false,
      default: null,
    },
    keyHolds: {
      type: [String],
      enum: Object.values(GymHoldTypes),
      required: false,
      default: [],
    },
    keyMoves: {
      type: [String],
      enum: Object.values(KeyMoveTypes),
      required: false,
      default: [],
    },
    beta: {
      type: String,
      required: false,
    },
    images: {
      type: [String],
      required: false,
    },
    notes: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
);

GymClimbDataSchema.plugin(mongooseAggregatePaginate);

const GymClimbs = mongoose.model<GymClimbData>('GymClimb', GymClimbDataSchema);

export default GymClimbs;
