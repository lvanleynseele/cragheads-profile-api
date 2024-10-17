import { ObjectId } from 'mongodb';
import { collections } from '../../utility/database.service';
import areaService from '../Area/area.service';
import Routes, { Route } from '../../../Models/Routes/Route';
import e from 'cors';
import logger from '../../../utils/logger';

const getRouteById = async (id: string | ObjectId) => {
  return await Routes.findById(id);
};

const getRoutesByArea = async (areaId: string | ObjectId) => {
  const area = await areaService.findById(areaId);

  const routes: Route[] = [];
  if (area.routeIds) {
    await Promise.all(
      area.routeIds.map(async routeId => {
        const route = await getRouteById(routeId);
        if (route) routes.push(route);
        else logger.error({ error: 'Route not found', routeId: routeId });
      }),
    );
  }
  return routes;
};

const routeService = {
  getRouteById,
  getRoutesByArea,
};

export default routeService;
