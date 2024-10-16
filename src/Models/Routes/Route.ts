import { ObjectId } from 'mongodb';
import { ClimbingTypes } from '../../constants/enums';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

export interface ClimbingRoute {
  _id: ObjectId;
  name: string;
  description: string;
  accessDescription: string;
  difficulty: number;
  images: string[];
  reviewIds?: ObjectId[];
  betaIds?: ObjectId[];
  type: ClimbingTypes;
  angle?: number; // angle of slope on the wall
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
}

export const RouteSchema = new Schema<ClimbingRoute>({
  _id: {
    type: Schema.Types.ObjectId,
    ref: 'Climb',
  },
  name: {
    type: String,
    required: true,
    trim: true,
    index: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  accessDescription: {
    type: String,
    required: true,
    trim: true,
  },
  difficulty: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: false,
  },
  reviewIds: {
    type: [Schema.Types.ObjectId],
    ref: 'RouteReview',
    required: false,
  },
  betaIds: {
    type: [Schema.Types.ObjectId],
    ref: 'RouteBeta',
    required: false,
  },
  type: {
    type: String,
    enum: Object.values(ClimbingTypes),
    required: true,
    index: true,
  },
  address: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: true,
    index: true,
  },
  state: {
    type: String,
    required: false,
    index: true,
  },
  country: {
    type: String,
    required: true,
    index: true,
  },
  latitude: {
    type: Number,
    required: false,
  },
  longitude: {
    type: Number,
    required: false,
  },
});

RouteSchema.plugin(mongooseAggregatePaginate);

const Routes = mongoose.model('Route', RouteSchema);

export default Routes;
