import { collections } from '../../utility/database.service';
import Areas, { ClimbingArea } from '../../../Models/Area/Area';
import { ObjectId } from 'mongoose';

const findById = async (_id: string | ObjectId) => {
  return await Areas.findById(_id);
};

const getByLocation = async (lat: string, long: string, radius: string) => {
  const areas = await collections.areas
    .find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(long), parseFloat(lat)],
          },
          $maxDistance: parseInt(radius),
        },
      },
    })
    .toArray();
  return areas;
};

const areaService = {
  findById,
  getByLocation,
};

export default areaService;
