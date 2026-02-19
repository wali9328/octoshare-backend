export default function devAuth(req, res, next) {
  req.user = { id: "DEV_USER_ID" }; // replace with actual user ID
  next();
}