import express from 'express';
import bookmarkedService from '../../../services/v1/Profile/profile.bookmarked.service';

const bookmarkedRouter = express.Router();

bookmarkedRouter.use(express.json());

bookmarkedRouter.get('/areas/by-profile/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const bookmarkedAreas = await bookmarkedService.getAreasByProfile(
      profileId,
    );

    res.status(200).send(bookmarkedAreas);
  } catch (error) {
    res.status(500).send(error);
  }
});

bookmarkedRouter.get('/routes/by-profile/:id', async (req, res) => {
  try {
    const profileId = req.params.id;
    const bookmarkedRoutes = await bookmarkedService.getRoutesByProfile(
      profileId,
    );

    res.status(200).send(bookmarkedRoutes);
  } catch (error) {
    res.status(500).send(error);
  }
});

bookmarkedRouter.post('/areas/:profileId/:areaId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const areaId = req.params.areaId;

    const result = await bookmarkedService.addBookmarkedArea(profileId, areaId);

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

bookmarkedRouter.post('/routes/:profileId/:routeId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const routeId = req.params.routeId;

    const result = await bookmarkedService.addBookmarkedRoute(
      profileId,
      routeId,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

bookmarkedRouter.delete('/areas/:profileId/:areaId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const areaId = req.params.areaId;

    const result = await bookmarkedService.removeBookmarkedArea(
      profileId,
      areaId,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

bookmarkedRouter.delete('/routes/:profileId/:routeId', async (req, res) => {
  try {
    const profileId = req.params.profileId;
    const routeId = req.params.routeId;

    const result = await bookmarkedService.removeBookmarkedRoute(
      profileId,
      routeId,
    );

    res.status(200).send(result);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default bookmarkedRouter;
