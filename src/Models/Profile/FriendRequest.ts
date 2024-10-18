import mongoose, { ObjectId, Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface FriendRequest {
  _id: ObjectId;
  senderId: ObjectId;
  receiverId: ObjectId;
  status: FriendRequestStatus;
  date: Date;
}

export enum FriendRequestStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

const FriendRequestSchema = new Schema<FriendRequest>(
  {
    _id: Schema.Types.ObjectId,
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      index: true,
      required: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'Profile',
      index: true,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FriendRequestStatus),
      required: true,
    },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);

FriendRequestSchema.plugin(mongooseAggregatePaginate);

const FriendRequests = mongoose.model<FriendRequest>(
  'FriendRequest',
  FriendRequestSchema,
);

export default FriendRequests;
