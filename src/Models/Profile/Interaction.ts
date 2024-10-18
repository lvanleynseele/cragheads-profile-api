//unused as of now

import mongoose, { ObjectId, Schema } from 'mongoose';
import { ContentType, InteractionType } from '../../constants/enums';

export interface Interaction {
  _id: ObjectId;
  profileId: ObjectId; //profileId of the owner of whatever was interacted with
  actorId: ObjectId; //profileId of person who initiated interaction
  date: Date;
  type: InteractionType;
  contentID: ObjectId; //postId, commentId, messageId, etc.
  contentType: ContentType;
}

const InteractionSchema = new Schema<Interaction>({
  profileId: { type: Schema.Types.ObjectId, required: true, index: true },
  actorId: { type: Schema.Types.ObjectId, required: true, index: true },
  date: { type: Date, required: true },
  type: { type: String, required: true, index: true },
  contentID: { type: Schema.Types.ObjectId, required: true },
  contentType: { type: String, required: true, index: true },
});

const Interactions = mongoose.model<Interaction>(
  'Interactions',
  InteractionSchema,
);

Interactions.ensureIndexes();

export default Interactions;
