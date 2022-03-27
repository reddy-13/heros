import dbConnect from "../../../db/dbconnect";
import Hero from "../../../models/Hero";

dbConnect();

// get unique record, edit delete

export default async function handler(req, res) {
  const {
    query: { id },
    method,
  } = req;
  switch (method) {
    case "GET":
      try {
        const hero = await Hero.findById(id);
        if (!hero) {
          res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "PUT":
      try {
        const hero = await Hero.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!hero) {
          res.status(400).json({ success: false, error: error });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;
    case "DELETE":
      try {
        const hero = await Hero.deleteOne({ _id: id });
        if (!hero) {
          res.status(400).json({ success: false, error: error });
        }
        res.status(200).json({ success: true, hero: hero });
      } catch (error) {
        res.status(400).json({ success: false, error: error });
      }
      break;

    default:
      res.status(400).json({ success: false, error: "exit " });
      break;
  }
}
