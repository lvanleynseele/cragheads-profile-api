import { ObjectId } from 'mongodb';
import Climbs, { Climb } from '../../../Models/Climbs/Climb';
import { collections } from '../../utility/database.service';
import profileService from './profile.service';

const findByClimbId = async (climbId: string | ObjectId) => {
  return (await Climbs.findById({
    _id: new ObjectId(climbId),
  })) as unknown as Climb;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  const climbs: Climb[] = [];

  if (profile && profile.myClimbIds) {
    await Promise.all(
      profile.myClimbIds.map(async climbId => {
        const climb = await findByClimbId(climbId);
        climbs.push(climb);
      }),
    );
  }

  return climbs;
};

const findAllClimbs = async () => {
  return await Climbs.find({}); //collections.climbs.find({}).toArray();
};

const addClimb = async (profileId: string | ObjectId, climb: Climb) => {
  await Climbs.validate(climb);

  const result = await Climbs.collection.insertOne(climb);

  if (profileId !== '') {
    await profileService.addClimb(profileId, result.insertedId);
  }

  return result;
};

const updateClimb = async (id: string | ObjectId, climb: Climb) => {
  await Climbs.validate(climb);

  return await Climbs.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    { $set: climb },
  );
};

const deleteClimb = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
) => {
  const result = await Climbs.deleteOne({ _id: new ObjectId(id) });

  await profileService.removeClimb(profileId, id);

  return result;
};

const climbsService = {
  findByClimbId,
  findByProfileId,
  addClimb,
  updateClimb,
  deleteClimb,
  findAllClimbs,
};

export default climbsService;
