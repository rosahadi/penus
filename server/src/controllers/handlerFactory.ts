import { Model as MongooseModel, Document } from 'mongoose';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

exports.deleteOne = (Model: MongooseModel<Document>) =>
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

exports.updateOne = (Model: MongooseModel<Document>) =>
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

exports.createOne = (Model: MongooseModel<Document>) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (
  Model: MongooseModel<Document>,
  popOptions: { path: string },
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

exports.getAll = (Model: MongooseModel<Document>) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on a blog
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
