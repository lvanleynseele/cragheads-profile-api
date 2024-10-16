import { ObjectId } from 'mongodb';
import Posts from '../../../Models/Posts/Post';
import Profiles from '../../../Models/Profile/Profile';
import { collections } from '../../utility/database.service';

const getPostById = async (postId: ObjectId | string) => {
  try {
    const response = await Posts.aggregate([
      {
        $match: {
          _id: new ObjectId(postId),
        },
      },
      {
        $addFields: {
          formattedUserId: {
            $toObjectId: '$userId',
          },
        },
      },
      {
        $lookup: {
          from: 'profiles',
          localField: 'formattedUserId',
          foreignField: '_id',
          as: 'user',
        },
      },
      // {
      //   $lookup: {
      //     from: 'areas',
      //     localField: 'areaId',
      //     foreignField: '_id',
      //     as: 'area',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'routes',
      //     localField: 'routeIds',
      //     foreignField: '_id',
      //     as: 'routes',
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'profiles',
      //     localField: 'friendIds',
      //     foreignField: '_id',
      //     as: 'friends',
      //   },
      // },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'likes',
          localField: '_id',
          foreignField: 'postId',
          as: 'likes',
        },
      },
      // {
      //   $project: {
      //     _id: 1,
      //     userId: 1,
      //     username: 1,
      //     areaId: 1,
      //     routeIds: 1,
      //     friendIds: 1,
      //     likes: 1,
      //     likeIds: 1,
      //     commentIds: 1,
      //     caption: 1,
      //     rating: 1,
      //     images: 1,
      //     date: 1,
      //     user: {
      //       _id: 1,
      //       username: 1,
      //       email: 1,
      //       date: 1,
      //     },
      //     area: {
      //       _id: 1,
      //       name: 1,
      //       location: 1,
      //       date: 1,
      //     },
      //     routes: {
      //       _id: 1,
      //       name: 1,
      //       grade: 1,
      //       location: 1,
      //       date: 1,
      //     },
      //     friends: {
      //       _id: 1,
      //       username: 1,
      //       email: 1,
      //       date: 1,
      //     },
      //     comments: {
      //       _id: 1,
      //       userId: 1,
      //       postId: 1,
      //       comment: 1,
      //       date: 1,
      //     },
      //     // likes: {
      //     //   _id: 1,
      //     //   userId: null,
      //     // },
      //   },
      // },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const getPostsForUser = async (profileId: ObjectId | string) => {
  try {
    const response = await Profiles.aggregate([
      {
        $match: {
          _id: new ObjectId(profileId),
        },
      },
      // {
      //   $unwind: '$friendIds',
      // },
      // {
      //   $addFields: {
      //     friendId: {
      //       $toObjectId: '$friendIds',
      //     },
      //   },
      // },
      // {
      //   $lookup: {
      //     from: 'posts',
      //     localField: 'friendId',
      //     foreignField: 'userId',
      //     as: 'posts',
      //   },
      // },
      {
        $addFields: {
          userId: {
            $toObjectId: '$_id',
          },
        },
      },
      {
        $lookup: {
          from: 'posts',
          localField: 'userId',
          foreignField: 'userId',
          as: 'userPosts',
        },
      },
    ]);

    return response;
  } catch (error) {
    throw error;
  }
};

const feedPostsService = {
  getPostById,
  getPostsForUser,
};

export default feedPostsService;

// const posts = await Posts.aggregate([
//   {
//     $match: {
//       userId: new ObjectId(profileId),
//     },
//   },
//   {
//     $lookup: {
//       from: 'users',
//       localField: 'userId',
//       foreignField: '_id',
//       as: 'user',
//     },
//   },
//   {
//     $lookup: {
//       from: 'areas',
//       localField: 'areaId',
//       foreignField: '_id',
//       as: 'area',
//     },
//   },
//   {
//     $lookup: {
//       from: 'routes',
//       localField: 'routeIds',
//       foreignField: '_id',
//       as: 'routes',
//     },
//   },
//   {
//     $lookup: {
//       from: 'profiles',
//       localField: 'friendIds',
//       foreignField: '_id',
//       as: 'friends',
//     },
//   },
//   {
//     $lookup: {
//       from: 'comments',
//       localField: 'commentIds',
//       foreignField: '_id',
//       as: 'comments',
//     },
//   },
//   {
//     $lookup: {
//       from: 'likes',
//       localField: 'likeIds',
//       foreignField: '_id',
//       as: 'likes',
//     },
//   },
//   {
//     $project: {
//       _id: 1,
//       userId: 1,
//       username: 1,
//       areaId: 1,
//       routeIds: 1,
//       friendIds: 1,
//       likes: 1,
//       likeIds: 1,
//       commentIds: 1,
//       caption: 1,
//       rating: 1,
//       images: 1,
//       date: 1,
//       user: {
//         _id: 1,
//         username: 1,
//         email: 1,
//         date: 1,
//       },
//       area: {
//         _id: 1,
//         name: 1,
//         location: 1,
//         date: 1,
//       },
//       routes: {
//         _id: 1,
//         name: 1,
//         grade: 1,
//         location: 1,
//         date: 1,
//       },
//       friends: {
//         _id: 1,
//         username: 1,
//         email: 1,
//         date: 1,
//       },
//       comments: {
//         _id: 1,
//         userId: 1,
//         postId: 1,
//         comment: 1,
//         date: 1,
//       },
//       likes: {
//         _id: 1,
//         userId: 1,
//         postId: 1,
//         date: 1,
//       },
//     },
//   },
// ])
