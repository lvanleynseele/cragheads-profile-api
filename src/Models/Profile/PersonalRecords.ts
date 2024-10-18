import mongoose, { ObjectId, Schema } from 'mongoose';
import { ClimbingTypes } from '../../constants/enums';

export interface PersonalRecords {
  _id: ObjectId;
  userId: ObjectId;
  type: ClimbingTypes;
  VMax: number;
  VMaxRouteId: ObjectId;
  VMaxDate: Date;
  VMaxClimbId: ObjectId;
  //boulder recent record, last 8 weeks
  VMaxRecent: number;
  VMaxRecentRouteId: ObjectId;
  VMaxRecentDate: Date;
  VMaxRecentClimbId: ObjectId;
}

const PersonalRecordsSchema = new Schema<PersonalRecords>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    index: true,
  },
  type: {
    type: String,
    required: true,
    enum: Object.values(ClimbingTypes),
  },
  VMax: {
    type: Number,
    required: true,
  },
  VMaxRouteId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  VMaxDate: {
    type: Date,
    required: true,
  },
  VMaxClimbId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  VMaxRecent: {
    type: Number,
    required: true,
  },
  VMaxRecentRouteId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  VMaxRecentDate: {
    type: Date,
    required: true,
  },
  VMaxRecentClimbId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

const PersonalRecords = mongoose.model<PersonalRecords>(
  'PersonalRecords',
  PersonalRecordsSchema,
);

PersonalRecords.ensureIndexes();

export default PersonalRecords;
