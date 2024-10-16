import { ObjectId } from 'mongodb';
import { Roles } from '../../constants/roles';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface Profile {
  _id: ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  dateOfBirth: Date;
  role: Roles;
  photo?: string;
  friendIds: ObjectId[];
  //bookmarked areas and climbs
  myRouteIds: ObjectId[];
  myAreaIds: ObjectId[];
  myClimbIds: ObjectId[];
  myGymClimbIds: ObjectId[];
  postIds: ObjectId[];
  date: Date;
}

export const ProfileSchema = new Schema<Profile>({
  _id: ObjectId,
  firstName: {
    type: String,
    required: true,
    index: true,
  },
  lastName: {
    type: String,
    required: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    index: true,
  },
  dateOfBirth: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    required: false,
    enum: Object.values(Roles),
    default: Roles.USER,
  },
  photo: {
    type: String,
    required: false,
  },
  friendIds: {
    type: [ObjectId],
    required: false,
    default: [],
    index: true,
  },
  myRouteIds: {
    type: [ObjectId],
    required: false,
    default: [],
  },
  myAreaIds: {
    type: [ObjectId],
    required: false,
    default: [],
  },
  myClimbIds: {
    type: [ObjectId],
    required: false,
    default: [],
    index: true,
  },
  myGymClimbIds: {
    type: [ObjectId],
    required: false,
    default: [],
    index: true,
  },

  postIds: {
    type: [ObjectId],
    required: false,
    default: [],
    index: true,
  },
  date: { type: Date, default: Date.now },
});

// ProfileSchema.index({
//   username: 'text',
//   email: 'text',
//   firstname: 'text',
//   lastname: 'text',
// });

ProfileSchema.plugin(mongooseAggregatePaginate);

const Profiles = mongoose.model<Profile>('Profile', ProfileSchema);

export default Profiles;
