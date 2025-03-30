const authenticationRole = (...allowedUsers) => {
  return (req, res, next) => {
    if (!allowedUsers.includes(req.user.role)) {
      return res
        .status(403)
        .json({
          message: "this " + req.user.role + " role has not accessed to this route",
        });
    }
    next();
  };
};

module.exports = {
  authenticationRole,
};
