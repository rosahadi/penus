import { Model as MongooseModel, Document } from 'mongoose';
import AppError from '../utils/appError';
import catchAsync from '../middleware/catchAsync';
import currentUser from '../utils/currentUser';

export const deleteOne = <T extends Document>(Model: MongooseModel<T>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

export const updateOne = <T extends Document>(Model: MongooseModel<T>) =>
  catchAsync(async (req, res, next) => {
    const existingDoc = await Model.findById(req.params.id);

    if (!existingDoc) {
      return next(new AppError('No document found with that ID', 404));
    }

    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const createOne = <T extends Document>(Model: MongooseModel<T>) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catchAsync(async (req, res, next) => {
    const user = await currentUser(req);

    req.body.user = user;

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getOne = <T extends Document>(
  Model: MongooseModel<T>,
  popOptions: { path: string } | null = null,
) =>
  catchAsync(async (req, res, next) => {
    let doc;

    const query = Model.findById(req.params.id);

    if (popOptions) {
      doc = await query.populate(popOptions).lean({ virtuals: true });
    } else {
      doc = await query;
    }

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

export const getAll = <T extends Document>(Model: MongooseModel<T>) =>
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  catchAsync(async (req, res, next) => {
    let filter = {};

    if (req.params.id) filter = { blog: req.params.id };

    const doc = await Model.find(filter);

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
