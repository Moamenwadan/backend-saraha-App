const isAuthorized = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new Error("un Authorized", { cause: 401 }));
    return next();
  };
};
export default isAuthorized;
