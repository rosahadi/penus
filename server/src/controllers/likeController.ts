import LikedBlog from '../models/likedBlogsModel';
import * as factory from './handlerFactory';

export const getAllLikes = factory.getAll(LikedBlog);
export const createLike = factory.createOne(LikedBlog);
export const deleteLike = factory.deleteOne(LikedBlog);
