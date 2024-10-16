import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface GymClimbData {
  _id: ObjectId;
  userId: ObjectId;
  climbId: ObjectId;
  didBoulder: boolean;
  hardestBoulderGrade?: number;
  didLead: boolean;
  hardestLeadGrade?: number;
  didTopRope: boolean;
  hardestTopRopeGrade?: number;
  notes?: string;
  startTime: string;
  endTime: string;
  date: Date;
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
    didBoulder: {
      type: Boolean,
      required: true,
      index: true,
    },
    hardestBoulderGrade: {
      type: Number,
      required: false,
      default: 0,
      index: true,
    },
    didLead: {
      type: Boolean,
      required: true,
      index: true,
    },
    hardestLeadGrade: {
      type: Number,
      required: false,
      default: 0,
      index: true,
    },
    didTopRope: {
      type: Boolean,
      required: true,
      index: true,
    },
    hardestTopRopeGrade: {
      type: Number,
      required: false,
      default: 0,
      index: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now, index: true, required: false },
  },
  {
    timestamps: true,
  },
);

GymClimbDataSchema.plugin(mongooseAggregatePaginate);

const GymClimbs = mongoose.model<GymClimbData>('GymClimb', GymClimbDataSchema);

export default GymClimbs;
