import areaService from '../Area/area.service';
import Routes, { Route } from '../../../Models/Routes/Route';
import e from 'cors';
import logger from '../../../utils/logger';
import { ObjectId } from 'mongoose';

const getRouteById = async (id: string | ObjectId) => {
  return await Routes.findById(id);
};

const routeService = {
  getRouteById,
};

export default routeService;
