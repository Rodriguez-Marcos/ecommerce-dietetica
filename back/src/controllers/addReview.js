
import Review from '../models/Review.js';

export async function addReview (req, res, next) {
  let review = req.body;
  let {id} = req.params
  try {
    let newReview = await Review.create({ ...review,id_product:id });
    return res.status(200).json(newReview);
  } catch (err) {
    return res.json(err)  ;
  }
};
