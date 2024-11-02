import Areas, { ClimbingArea } from '../../../Models/Area/Area';
import { ObjectId } from 'mongoose';

const findById = async (_id: string | ObjectId) => {
  return await Areas.findById(_id);
};

const areaService = {
  findById,
};

export default areaService;
