
import Review from '../models/Review.js';

export async function addReview(req, res, next) {
  let review = req.body;
  let { id } = req.params
  try {
    let newReview = await Review.create({ ...review, id_product: id });
    return res.status(200).json(newReview);
  } catch (err) {
    return res.json(err);
  }
};

export async function getReview(req, res) {
  let { id } = req.params
  try {
    let reviews = await Review.findAll({ where: { id_product: id } })
    if (reviews) {
      return res.json({
        message: 'Reviews found',
        data: reviews
      })
    }
  } catch (err) {
    console.log(err)
    res.status(500).json({
      message: 'Something goes Wrong',
      data: {}

    })

  }



}