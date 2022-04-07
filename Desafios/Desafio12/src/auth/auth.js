export function auth(req, res, next) {
  if (req.session.name) {
    next();
  } else {
    res.redirect("/login");
  }
}


export function FBauth(req, res, next) {
  if (req.user.name) {
    next();
  } else {
    res.redirect("/login");
  }
}
