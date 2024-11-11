import * as factory from './handlerFactory';
import Comment from '../models/commentModel';

export const getAllComments = factory.getAll(Comment);
export const getComment = factory.getOne(Comment);
export const createComment = factory.createOne(Comment);
export const updateComment = factory.updateOne(Comment);
export const deleteComment = factory.deleteOne(Comment);
