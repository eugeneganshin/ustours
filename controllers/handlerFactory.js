const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const APIFeatures = require('../utils/apiFeatures');

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that id.', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    // PATCH
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that id.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.getOne = (Model, populateOpt) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOpt) query = query.populate(populateOpt);

    const doc = await query;

    if (!doc) {
      return next(new AppError('No document found with that id.', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

/**
 * Filtering, sorting, field limiter and pagination for request.
 * TODO: write a documentation to specify which features a user can query the API
 */
exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    // ===================================================== //
    // only the reviews when the tour matches the id will be found
    // if there is a tour id then this object will be found
    // if there is a regular API without nested routes then all reviews will be found
    // to allow for nested GET reviews on tour (hack)
    let filter;
    console.log(req.params);
    if (req.params.tourId) filter = { tour: req.params.tourId };
    // ===================================================== //

    const features = new APIFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const doc = await features.query;
    // const doc = await features.query.explain(); // performance

    res.status(200).json({
      status: 'success',
      results: doc.length,
      data: {
        data: doc,
      },
    });
  });
