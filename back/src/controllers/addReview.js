
import Review from '../models/Review.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js'
import Product_Order from '../models/Product_Order.js'


export async function addReview(req, res, next) {
  const id_client = req.id
  let review = req.body;
  let { id } = req.params
  try {

    let newReview = await Review.create({ ...review, id_product: id, id_client: id_client });
    return res.status(200).json(newReview);
  } catch (err) {
    return res.json(err);
  }
};
export async function allowReview(req, res, next) {
  const id_client = req.id;
  let { id } = req.params
  try {
    let orders = await Order.findAll({ where: { id_client: id_client } })
    let ordersId = orders.map(order => order.dataValues.id)
    let client_product = await Product_Order.findAll({ where: { id_product: id, id_order: ordersId } })
    let client_review = await Review.findAll({ where: { id_product: id, id_client: id_client } })

    if (client_product.length !== 0 && client_review.length === 0) {
      return res.send(true)
    } else return res.send(false)
  } catch (err) {
    return res.json(err);
  }
}

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