import express from 'express';
import { Profile } from '../../../Models/Profile/Profile';
import bookmarkedRouter from './profile.bookmarked.router';
import friendsRouter from './profile.friends.router';
import profileService from '../../../services/v1/Profile/profile.service';
import climbsRouter from './profile.climbs.router';
import postsRouter from './profile.posts.router';
import preferencesRouter from './profile.preferences.router';
import gymClimbsRouter from './profile.gymClimbs.router';

const profileRouter = express.Router();

profileRouter.use(express.json());

profileRouter.use('/bookmarked', bookmarkedRouter);
profileRouter.use('/friends', friendsRouter);

profileRouter.use('/climbs', climbsRouter);
profileRouter.use('/gym-climbs', gymClimbsRouter);
profileRouter.use('/posts', postsRouter);

profileRouter.use('/preferences', preferencesRouter);

profileRouter.get('/by-id/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = await profileService.findProfileById(profileId);

    res.status(200).send(profile);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.get('/', async (req, res) => {
  try {
    const profiles = await profileService.findAllProfiles();
    res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.get('/search/:query', async (req, res) => {
  try {
    const query = req.params.query;
    const profiles = await profileService.search(query);
    res.status(200).send(profiles);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.post('/', async (req, res) => {
  try {
    const profile = req.body as Profile;
    const response = await profileService.add(profile);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.put('/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const profile = req.body as Profile;
    const response = await profileService.update(profileId, profile);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.delete('/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const response = await profileService.remove(profileId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.post('/profile-pic/:id/:key', async (req, res) => {
  try {
    const profileId = req.params.id;
    const photoKey = req.params.key;
    const response = await profileService.addProfilePhoto(profileId, photoKey);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.get('/profile-pic/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const response = await profileService.getProfilePicById(profileId);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

profileRouter.get('/check-username/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const taken = await profileService.checkUsernameTaken(username);

    res.status(200).send(taken);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default profileRouter;
