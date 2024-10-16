import express from 'express';
import profileService from '../../../services/v1/Profile/profile.service';
import { Preference } from '../../../Models/Profile/Preferences';
import preferencesService from '../../../services/v1/Profile/profile.preferences.services';

const preferencesRouter = express.Router();

preferencesRouter.use(express.json());

preferencesRouter.get('/by-profile/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const preferences = await preferencesService.findByProfileId(profileId);
    res.status(200).send(preferences);
  } catch (error) {
    res.status(500).send(error);
  }
});

preferencesRouter.post('/', async (req, res) => {
  try {
    const preferences = req.body as Preference;
    const response = await preferencesService.add(preferences);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

preferencesRouter.put('/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const preferences = req.body as Preference;
    const response = await preferencesService.update(profileId, preferences);
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

preferencesRouter.post('/default/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const response = await preferencesService.addDefaultPreferences(profileId);
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default preferencesRouter;
