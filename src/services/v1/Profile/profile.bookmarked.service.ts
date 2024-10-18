import { ClimbingArea } from '../../../Models/Area/Area';
import areaService from '../Area/area.service';
import routeService from '../Routes/routes.service';
import profileService from './profile.service';
import { Route } from '../../../Models/Routes/Route';
import logger from '../../../utils/logger';
import { ObjectId } from 'mongoose';
import Profiles from '../../../Models/Profile/Profile';

const getAreasByProfile = async (profileId: string | ObjectId) => {
  const profile = await profileService.findById(profileId.toString());

  if (profile && profile.myAreaIds) {
    const bookmarkedAreas: ClimbingArea[] = [];

    if (profile.myAreaIds) {
      await Promise.all(
        profile.myAreaIds.map(async areaId => {
          const area = await areaService.findById(areaId);
          if (area) {
            bookmarkedAreas.push(area);
          } else {
            logger.error({ error: 'Area not found', areaId: areaId });
          }
        }),
      );
    }
    return bookmarkedAreas;
  }
};

const getRoutesByProfile = async (profileId: string | ObjectId) => {
  const profile = await profileService.findById(profileId.toString());

  if (profile && profile.myRouteIds) {
    const bookmarkedRoutes: Route[] = [];

    if (profile.myRouteIds) {
      await Promise.all(
        profile.myRouteIds.map(async routeId => {
          const route = await routeService.getRouteById(routeId);
          if (route) {
            bookmarkedRoutes.push(route);
          } else {
            logger.error({ error: 'Route not found', routeId: routeId });
          }
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
  const result = await Profiles.updateOne(
    { _id: profileId },
    { $addToSet: { myAreaIds: areaId } },
  );

  return result;
};

const addBookmarkedRoute = async (
  profileId: string | ObjectId,
  routeId: string | ObjectId,
) => {
  const result = await Profiles.updateOne(
    { _id: profileId },
    { $addToSet: { myRouteIds: routeId } },
  );

  return result;
};

const removeBookmarkedArea = async (
  profileId: string | ObjectId,
  areaId: string | ObjectId,
) => {
  const result = await Profiles.updateOne(
    { _id: profileId },
    { $pull: { myAreaIds: areaId } as any },
  );

  return result;
};

const removeBookmarkedRoute = async (
  profileId: string | ObjectId,
  routeId: string | ObjectId,
) => {
  const result = await Profiles.updateOne(
    { _id: profileId },
    { $pull: { myRouteIds: routeId } as any },
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
