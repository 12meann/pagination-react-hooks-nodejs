module.exports = function pagination(model) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const totalDocuments = await model.countDocuments().exec();
    const results = {};
    //prev
    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit
      };
    }
    //next
    if (endIndex < totalDocuments) {
      results.next = {
        page: page + 1,
        limit
      };
    }
    results.totalDocuments = totalDocuments;
    try {
      results.result = await model
        .find()
        .limit(limit)
        .skip(startIndex);
      // results.result = array.slice(startIndex, endIndex);
      res.paginatedResults = results;
      next();
    } catch (error) {
      await res.json(error);
    }
  };
};
