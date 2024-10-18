import Profiles, { Profile } from '../../../Models/Profile/Profile';
import profileService from './profile.service';
import FriendRequests from '../../../Models/Profile/FriendRequest';
import { ObjectId } from 'mongoose';

const getByProfile = async (profileId: string | ObjectId) => {
  try {
    const profile = await profileService.findById(profileId);
    const friends: Profile[] = [];
    if (profile !== null) {
      if (profile.friendIds) {
        await Promise.all(
          profile.friendIds.map(async friendId => {
            const friend = await profileService.findById(friendId);
            if (friend) friends.push(friend);
          }),
        );
      }
    }

    return friends;
  } catch (error) {
    throw error;
  }
};

//should this be follow/accept model?
const addFriend = async (
  profileId: string | ObjectId,
  friendId: string | ObjectId,
) => {
  Profiles.updateOne(
    { _id: profileId },
    { $addToSet: { friendIds: friendId } },
  );

  await Profiles.updateOne(
    { _id: friendId },
    { $addToSet: { friendIds: profileId } },
  );
};

const removeFriend = async (
  profileId: string | ObjectId,
  friendId: string | ObjectId,
) => {
  await Profiles.updateOne(
    { _id: profileId },
    { $pull: { friendIds: friendId } as any },
  );

  await Profiles.updateOne(
    { _id: friendId },
    { $pull: { friendIds: profileId } as any },
  );
};

const isFriend = async (
  profileId: string | ObjectId,
  friendId: string | ObjectId,
) => {
  const profile = await Profiles.findOne({
    _id: profileId,
    friendIds: friendId,
  });

  return profile !== null;
};

const findAllFriendRequests = async () => {
  const requests = await FriendRequests.find({});
  return requests;
};

const sendFriendRequest = async (
  profileId: string | ObjectId,
  friendId: string | ObjectId,
) => {
  //check if already friends
  const alreadyFriends = await isFriend(profileId, friendId);
  if (alreadyFriends) {
    console.log('Already friends');
    throw new Error('Already friends');
  }

  return await FriendRequests.create({
    senderId: profileId,
    receiverId: friendId,
    status: 'PENDING',
    date: new Date(),
  });
};

const acceptFriendRequest = async (requestId: string | ObjectId) => {
  const request = await FriendRequests.findById(requestId);

  if (request) {
    await FriendRequests.updateOne(
      { _id: requestId },
      { $set: { status: 'ACCEPTED' } },
    );

    await addFriend(request.senderId, request.receiverId);
  }
};

const rejectFriendRequest = async (requestId: string | ObjectId) => {
  const request = await FriendRequests.findOne({
    _id: requestId,
  });

  if (request) {
    await FriendRequests.updateOne(
      { _id: requestId },
      { $set: { status: 'REJECTED' } },
    );
  }
};

const findFriendRequestByProfile = async (profileId: string | ObjectId) => {
  const requests = await FriendRequests.find({
    receiverId: profileId,
    status: 'PENDING',
  });

  return requests;
};

const friendsService = {
  getByProfile,
  addFriend,
  removeFriend,
  isFriend,
  findAllFriendRequests,
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  findFriendRequestByProfile,
};

export default friendsService;
