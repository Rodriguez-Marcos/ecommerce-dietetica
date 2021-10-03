
import Review from '../models/Review.js';

export async function addReview (req, res, next) {
  let review = req.body;
  try {
    review = await Review.create({ ...review });
    return res.json(review).status(200);
  } catch (err) {
    res.json(err);
    return console.log(err);
  }
};
