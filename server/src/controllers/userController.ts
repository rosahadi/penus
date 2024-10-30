import User from '../models/userModel';
import { deleteOne, getAll, getOne, updateOne } from './handlerFactory';

export const getUser = getOne(User);

export const getAllUsers = getAll(User);

// Do NOT update passwords with this, this is only for admin
export const updateUser = updateOne(User);
export const deleteUser = deleteOne(User);
//
