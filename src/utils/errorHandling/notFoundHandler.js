const notFoundHandler = (req, res, next) => {
  next(new Error("not found this API"));
};
export default notFoundHandler;
