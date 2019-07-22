import * as jwt from "jwt-then";
import config from "../config/config";
const verifyToken = async (req, res, next): Promise<any> => {
  console.log(req.headers.authorization);
  const token: string = req.headers.authorization.split(" ")[1];
  console.log(token);
  if (!token) {
    return res.status(403).send({ auth: false, message: "No token provided." });
  }

  try {
    // verifies secret and checks exp
    const decoded = await jwt.verify(token, config.JWT_ENCRYPTION);
    console.log(decoded);
    req.email = (<any>decoded).email;
    console.log(req.email);
    next();
  } catch (err) {
    res.status(401).send({ auth: false, message: err });
  }
};

export default verifyToken;
