import express from 'express';
import { collections } from '../../../services/utility/database.service';
import { ObjectId } from 'mongodb';
import { Profile } from '../../../Models/Profile/Profile';
import friendsService from '../../../services/v1/Profile/profile.friends.service';

const friendsRouter = express.Router();

friendsRouter.use(express.json());

friendsRouter.get('/by-profile/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const friends = await friendsService.getByProfile(profileId);
    res.status(200).send(friends);
  } catch (error) {
    res.status(500).send(error);
  }
});

friendsRouter.post('/:profileId/:friendId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const friendId = req.params.friendId;
    await friendsService.addFriend(profileId, friendId);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

friendsRouter.delete('/:profileId/:friendId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const friendId = req.params.friendId;
    await friendsService.removeFriend(profileId, friendId);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

friendsRouter.get('/is-friend/:profileId/:friendId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const friendId = req.params.friendId;
    const isFriend = await friendsService.isFriend(profileId, friendId);
    res.status(200).send(isFriend);
  } catch (error) {
    res.status(500).send(error);
  }
});

friendsRouter.get('/requests', async (req, res) => {
  try {
    const requests = await friendsService.findAllFriendRequests();
    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

//send friend request
//add authorization
friendsRouter.post('/request/:profileId/:friendId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const friendId = req.params.friendId;
    const response = await friendsService.sendFriendRequest(
      profileId,
      friendId,
    );
    res.status(200).send(response);
  } catch (error) {
    if (error === 'Already friends') {
      res.status(400).send(error);
    }

    res.status(500).send(error);
  }
});

//accept friend request
//need to add authorization
friendsRouter.put('/request/accept/:requestId', async (req, res) => {
  try {
    const requestId = req.params.requestId;
    await friendsService.acceptFriendRequest(requestId);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

friendsRouter.put('/request/reject/:requestId', async (req, res) => {
  try {
    const requestId = req.params.requestId;
    await friendsService.rejectFriendRequest(requestId);
    res.status(200).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

friendsRouter.get('/request/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const requests = await friendsService.findFriendRequestByProfile(profileId);
    res.status(200).send(requests);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default friendsRouter;
