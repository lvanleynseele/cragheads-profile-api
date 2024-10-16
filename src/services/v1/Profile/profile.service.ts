import { ObjectId } from 'mongodb';
import Profiles, { Profile } from '../../../Models/Profile/Profile';
import preferencesService from './profile.preferences.services';

const findProfileById = async (
  profileId: string | ObjectId,
): Promise<Profile | null> => {
  try {
    const profile = (await Profiles.findById(
      new ObjectId(profileId),
    )) as unknown as Profile;

    return profile;
  } catch (error) {
    throw error;
  }
};

const findAllProfiles = async () => {
  try {
    const profiles = await Profiles.find({});
    Profiles.updateOne(
      { _id: new ObjectId('6695974b199db0e05f2f9375') },
      {
        $pull: { myClimbIds: new ObjectId('670f112f4bb009a80c8bab28') } as any,
      },
    );
    return profiles;
  } catch (error) {
    throw error;
  }
};

const add = async (profile: Profile) => {
  try {
    await Profiles.validate(profile);
    const response = await Profiles.collection.insertOne(profile);
    await preferencesService.addDefaultPreferences(response.insertedId);
    return response;
  } catch (error) {
    throw error;
  }
};

const update = async (profileId: string | ObjectId, profile: Profile) => {
  try {
    await Profiles.validate(profile);

    const response = await Profiles.updateOne(
      { _id: new ObjectId(profileId) },
      { $set: profile },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const remove = async (profileId: string | ObjectId) => {
  try {
    const response = await Profiles.deleteOne({
      _id: new ObjectId(profileId),
    });

    return response;
  } catch (error) {
    throw error;
  }
};

const addClimb = async (
  profileId: string | ObjectId,
  climbId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: new ObjectId(profileId) },
      { $addToSet: { myClimbIds: new ObjectId(climbId) } },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const removeClimb = async (
  profileId: string | ObjectId,
  climbId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: new ObjectId(profileId) },
      { $pull: { myClimbIds: new ObjectId(climbId) } as any },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const addGymClimb = async (
  profileId: string | ObjectId,
  climbId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: new ObjectId(profileId) },
      { $addToSet: { myGymClimbIds: new ObjectId(climbId) } },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const removeGymClimb = async (
  profileId: string | ObjectId,
  climbId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: new ObjectId(profileId) },
      { $pull: { myGymClimbIds: new ObjectId(climbId) } as any },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const addPost = async (
  profileId: string | ObjectId,
  postId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: new ObjectId(profileId) },
      { $addToSet: { postIds: new ObjectId(postId) } },
    );

    return response;
  } catch (error) {
    throw error;
  }
};

const removePost = async (
  profileId: string | ObjectId,
  postId: string | ObjectId,
) => {
  try {
    const response = await Profiles.updateOne(
      { _id: new ObjectId(profileId) },
      { $pull: { postIds: new ObjectId(postId) } as any },
    );

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
    { _id: new ObjectId(profileId) },
    { $set: { photo: key } },
  );

  return response;
};

const getProfilePicById = async (profileId: string | ObjectId) => {
  const profile = await findProfileById(profileId);
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
  findProfileById,
  findAllProfiles,
  add,
  update,
  remove,
  addClimb,
  removeClimb,
  addGymClimb,
  removeGymClimb,
  addPost,
  removePost,
  search,
  addProfilePhoto,
  getProfilePicById,
  checkUsernameTaken,
};

export default profileService;
