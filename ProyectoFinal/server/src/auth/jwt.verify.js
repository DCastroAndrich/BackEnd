import jwt from "jsonwebtoken";
import config from "../utils/config.js";

const PRIVATE_KEY = config.jwt.PRIVATE_KEY;

export function verifyToken(req, res, next) {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, PRIVATE_KEY, (err, user) => {
      if (err) {
        res.status(403).json("Invalid token!!");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("You are not authenticated!");
  }
}

export function verifyTokenAndAuth(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!!");
    }
  });
}

export function verifyTokenAndAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json("You're not allowed to do that!!");
    }
  });
}

/* 

export function generateToken(user) {
  const token = jwt.sign({ data: user }, PRIVATE_KEY, { expiresIn: "2h" });
  return token;
}

export function auth(req, res, next) {
  const authHeader =
    req.headers["authorization"] || req.headers["Authorization"] || "";

  if (!authHeader) {
    return res.status(401).json({
      error: "Authorization required",
      message: "Authorization token missing",
    });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      error: "Authorization required",
      message: "Invalid token format",
    });
  }
  try {
    req.user = jwt.verify(token, PRIVATE_KEY);
  } catch (error) {
    return res
      .status(403)
      .json({ error: "Invalid token", message: "Access level not allowed" });
  }
  next();
}
 */
