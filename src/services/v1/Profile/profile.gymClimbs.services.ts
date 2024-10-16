import { ObjectId } from 'mongodb';
import { collections } from '../../utility/database.service';
import profileService from './profile.service';
import GymClimbs, { GymClimb } from '../../../Models/Climbs/GymData';

const findByClimbId = async (climbId: string | ObjectId) => {
  return (await GymClimbs.findById({
    _id: new ObjectId(climbId),
  })) as unknown as GymClimb;
};

const findByProfileId = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  const climbs: GymClimb[] = [];

  if (profile && profile.myGymClimbIds) {
    await Promise.all(
      profile.myGymClimbIds.map(async climbId => {
        const climb = await findByClimbId(climbId);
        climbs.push(climb);
      }),
    );
  }

  return climbs;
};

const findAllClimbs = async () => {
  return await GymClimbs.find({}); //collections.climbs.find({}).toArray();
};

const addClimb = async (profileId: string | ObjectId, climb: GymClimb) => {
  await GymClimbs.validate(climb);

  const result = await GymClimbs.collection.insertOne(climb);

  await profileService.addGymClimb(profileId, result.insertedId);

  return result;
};

const updateClimb = async (id: string | ObjectId, climb: GymClimb) => {
  await GymClimbs.validate(climb);

  return await GymClimbs.findByIdAndUpdate(
    { _id: new ObjectId(id) },
    { $set: climb },
  );
};

const deleteClimb = async (
  id: string | ObjectId,
  profileId: string | ObjectId,
) => {
  const result = await GymClimbs.deleteOne({ _id: new ObjectId(id) });

  await profileService.removeGymClimb(profileId, id);

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
