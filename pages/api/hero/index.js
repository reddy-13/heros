import dbConnect from "../../../db/dbconnect";
import Hero from "../../../models/Hero";

dbConnect();

//getall Records, post a new records

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const heros = await Hero.find({});
        res.status(200).json({ success: true, hero: heros });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    case "POST":
      try {
        const hero = await Hero.create(req.body);
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      res.status(400).json({ success: false });
      break;
  }
}
