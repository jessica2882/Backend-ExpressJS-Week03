export default function checkToken(req, res, next) {
  const token = req.query.token;
  const VALID_TOKEN = "xyz123";

  if (!token || token !== VALID_TOKEN) {
    return res.status(400).json({ error: "400 Bad requese" });
  }

  next();
}
