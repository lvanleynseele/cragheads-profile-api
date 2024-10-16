import express from 'express';
import gymClimbsService from '../../../services/v1/Profile/profile.gymClimbs.services';
import { GymClimb } from '../../../Models/Climbs/GymData';

const gymClimbsRouter = express.Router();
gymClimbsRouter.use(express.json());

gymClimbsRouter.get('/by-profile/:profileId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const climbs = await gymClimbsService.findByProfileId(profileId);

    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymClimbsRouter.get('/by-id/:climbId', async (req, res) => {
  try {
    const climbId = req.params.climbId;
    const climb = await gymClimbsService.findByClimbId(climbId);

    res.status(200).send(climb);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymClimbsRouter.get('/', async (req, res) => {
  try {
    const climbs = await gymClimbsService.findAllClimbs();
    res.status(200).send(climbs);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymClimbsRouter.post('/:profileId', async (req, res) => {
  try {
    const climb: GymClimb = { ...req.body };
    const result = await gymClimbsService.addClimb(req.params.profileId, climb);

    res.status(201).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymClimbsRouter.put('/:climbId', async (req, res) => {
  try {
    const climb = req.body;
    const result = await gymClimbsService.updateClimb(
      req.params.climbId,
      climb,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

gymClimbsRouter.delete('/:climbId/:profileId', async (req, res) => {
  try {
    const result = await gymClimbsService.deleteClimb(
      req.params.climbId,
      req.params.profileId,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default gymClimbsRouter;
