
import Review from '../models/Review.js';

export async function addReview (req, res, next) {
  let review = req.body;
  try {
    review = await Review.create({ ...review });
    return res.status(200).json(review);
  } catch (err) {
    return res.json(err)  ;
  }
};
