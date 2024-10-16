import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Climb {
  _id: ObjectId;
  userId: ObjectId;
  areaId: ObjectId;
  startTime: string;
  endTime: string;
  date: Date;
}

export const ClimbSchema = new Schema<Climb>(
  {
    _id: Schema.Types.ObjectId,
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      index: true,
      required: true,
    },
    areaId: {
      type: Schema.Types.ObjectId,
      ref: 'Area',
      index: true,
      required: true,
    },
    startTime: {
      type: String,
      required: true,
    },
    endTime: {
      type: String,
      required: true,
    },
    date: { type: Date, default: Date.now, index: true, required: true },
  },
  {
    timestamps: true,
  },
);

ClimbSchema.plugin(mongooseAggregatePaginate);

const Climbs = mongoose.model<Climb>('Climb', ClimbSchema);

export default Climbs;
