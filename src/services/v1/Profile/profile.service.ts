import { ObjectId } from 'mongoose';
import Profiles, { Profile } from '../../../Models/Profile/Profile';
import preferencesService from './profile.preferences.services';

const findById = async (
  profileId: string | ObjectId,
): Promise<Profile | null> => {
  try {
    return await Profiles.findById(profileId);
  } catch (error) {
    throw error;
  }
};

const findAllProfiles = async () => {
  try {
    return await Profiles.find({});
  } catch (error) {
    throw error;
  }
};

const add = async (profile: Profile) => {
  try {
    await Profiles.validate(profile);
    const response = await Profiles.create(profile);
    await preferencesService.addDefaultPreferences(response._id);
    return response;
  } catch (error) {
    throw error;
  }
};

const update = async (profileId: string | ObjectId, profile: Profile) => {
  try {
    await Profiles.validate(profile);

    const response = await Profiles.updateOne(
      { _id: profileId },
      { $set: profile },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const remove = async (_id: string | ObjectId) => {
  try {
    const response = await Profiles.deleteOne({
      _id,
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const search = async (query: string) => {
  const profiles = await Profiles.find({
    $text: {
      $search: query,
      $caseSensitive: false,
    },
  });

  return profiles;
};

const addProfilePhoto = async (profileId: string | ObjectId, key: string) => {
  const response = await Profiles.updateOne(
    { _id: profileId },
    { $set: { photo: key } },
  );

  return response;
};

const getProfilePicById = async (profileId: string | ObjectId) => {
  const profile = await findById(profileId);
  if (profile) {
    return profile.photo;
  }
};

const checkUsernameTaken = async (userName: string) => {
  const profile = await Profiles.find({
    $text: {
      $search: userName,
      $caseSensitive: false,
    },
  });

  let taken = false;

  profile.find((profile: Profile) => {
    if (profile.username.toLowerCase() === userName.toLowerCase()) {
      taken = true;
    }
  });

  return taken;
};

const profileService = {
  findById,
  findAllProfiles,
  add,
  update,
  remove,
  search,
  addProfilePhoto,
  getProfilePicById,
  checkUsernameTaken,
};

export default profileService;
