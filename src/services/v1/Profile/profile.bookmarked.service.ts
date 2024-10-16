import { ObjectId } from 'mongodb';
import { collections } from '../../utility/database.service';
import { ClimbingArea } from '../../../Models/Area/Area';
import areaService from '../Area/area.service';
import routeService from '../Routes/routes.service';
import profileService from './profile.service';
import { ClimbingRoute } from '../../../Models/Routes/Route';

const getAreasByProfile = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  if (profile && profile.myAreaIds) {
    const bookmarkedAreas: ClimbingArea[] = [];

    if (profile.myAreaIds) {
      await Promise.all(
        profile.myAreaIds.map(async areaId => {
          const area = await areaService.findById(areaId);
          bookmarkedAreas.push(area);
        }),
      );
    }
    return bookmarkedAreas;
  }
};

const getRoutesByProfile = async (profileId: string | ObjectId) => {
  const profile = await profileService.findProfileById(profileId);

  if (profile && profile.myRouteIds) {
    const bookmarkedRoutes: ClimbingRoute[] = [];

    if (profile.myRouteIds) {
      await Promise.all(
        profile.myRouteIds.map(async routeId => {
          const route = await routeService.getRouteById(routeId);
          bookmarkedRoutes.push(route);
        }),
      );
    }

    return bookmarkedRoutes;
  }
};

const addBookmarkedArea = async (
  profileId: string | ObjectId,
  areaId: string | ObjectId,
) => {
  const result = await collections.profiles.updateOne(
    { _id: new ObjectId(profileId) },
    { $addToSet: { myAreaIds: new ObjectId(areaId) } },
  );

  return result;
};

const addBookmarkedRoute = async (
  profileId: string | ObjectId,
  routeId: string | ObjectId,
) => {
  const result = await collections.profiles.updateOne(
    { _id: new ObjectId(profileId) },
    { $addToSet: { myRouteIds: new ObjectId(routeId) } },
  );

  return result;
};

const removeBookmarkedArea = async (
  profileId: string | ObjectId,
  areaId: string | ObjectId,
) => {
  const result = await collections.profiles.updateOne(
    { _id: new ObjectId(profileId) },
    { $pull: { myAreaIds: new ObjectId(areaId) } as any },
  );

  return result;
};

const removeBookmarkedRoute = async (
  profileId: string | ObjectId,
  routeId: string | ObjectId,
) => {
  const result = await collections.profiles.updateOne(
    { _id: new ObjectId(profileId) },
    { $pull: { myRouteIds: new ObjectId(routeId) } as any },
  );

  return result;
};

const bookmarkedService = {
  getAreasByProfile,
  getRoutesByProfile,
  addBookmarkedArea,
  addBookmarkedRoute,
  removeBookmarkedArea,
  removeBookmarkedRoute,
};

export default bookmarkedService;
