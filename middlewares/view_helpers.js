function viewHelpers(req, res, next) {
    res.locals.isLoggedIn = () => {
      return req.session.userId
    }
    next();
}

module.exports = viewHelpers;