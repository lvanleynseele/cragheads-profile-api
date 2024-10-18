import { ObjectId } from 'mongoose';
import Preferences, {
  BoulderingScales,
  ClimbingScales,
  Preference,
  Units,
} from '../../../Models/Profile/Preferences';

const findByProfileId = async (profileId: string | ObjectId) => {
  try {
    const response = await Preferences.findOne({
      profileId,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

const add = async (preferences: Preference) => {
  try {
    const response = await Preferences.collection.insertOne(preferences);
    return response;
  } catch (error) {
    throw error;
  }
};

const update = async (
  profileId: string | ObjectId,
  preferences: Preference,
) => {
  try {
    const response = await Preferences.updateOne(
      { profileId },
      { $set: preferences },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const addDefaultPreferences = async (profileId: string | ObjectId) => {
  try {
    const response = await Preferences.create({
      profileId,
      ClimbingScale: ClimbingScales.French,
      BoulderScale: BoulderingScales.Hueco,
      Units: Units.Metric,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const preferencesService = {
  findByProfileId,
  add,
  update,
  addDefaultPreferences,
};

export default preferencesService;
