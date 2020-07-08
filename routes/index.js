const express = require('express');
const router = express.Router();
const Product = require('./admin/products/models/Product');

/* GET home page. */
const paginate = (req, res, next) => {
	const perPage = 6;
	const page = req.params.pageNumber;

	Product.find()
	.skip(perPage * (page - 1))
	.limit(perPage)
	.populate('category')
	.exec((err, products) => {
		if(err) return next(err);
		Product.countDocuments().exec((err, count) => {
			if(err) return next(err);
			return res.render('main/home-products', {
				products,
				pages: Math.ceil(count/perPage),
				page: Number(page)
			});
		});
	});
}

router.get('/', function(req, res, next) {
	if(req.user) {
		return paginate(req, res, next);
	}

	const items = [
		[
			{
				image: "/images/products/random-products/coco-oil.jpg",
				title: "Coco Oil",
				body: "Some quick example text to build on the card title and make up the bulk of the card's content."
			}, {
				image: "/images/products/earrings.jpg",
				title: "White Earrings",
				body: "Flats elegant pointed toe design cut-out sides luxe leather lining versatile shoe. Everyday wear or night on the town."
			}, {
				image: "/images/products/random-products/remote.jpg",
				title: "Playstation",
				body: "Bodycon skirts bright success colours punchy palette pleated must-have new season."
			}
		], [
			{
				image: "/images/products/oxford.jpg",
				title: "Oxford Shoes",
				body: "Some quick example text to build on the card title and make up the bulk of the card's content."
			}, {
				image: "/images/products/random-products/shampoo.jpg",
				title: "Bamboo Moisture",
				body: "Flats elegant pointed toe design cut-out sides luxe leather lining versatile shoe. Everyday wear or night on the town."
			}, {
				image: "/images/products/random-products/jams.jpg",
				title: "Tasty Jams",
				body: "Bodycon skirts bright success colours punchy palette pleated must-have new season."
			}
		], [
			{
				image: "/images/products/random-products/oculus.jpg",
				title: "Oculus",
				body: "Some quick example text to build on the card title and make up the bulk of the card's content."
			}, {
				image: "/images/products/random-products/facewipes.jpg",
				title: "Face Wipes",
				body: "Flats elegant pointed toe design cut-out sides luxe leather lining versatile shoe. Everyday wear or night on the town."
			}, {
				image: "/images/products/random-products/earbuds.jpg",
				title: "Ear Buds",
				body: "Bodycon skirts bright success colours punchy palette pleated must-have new season."
			}
		]
	]

	return res.render('main/home', {items});
});

router.get('/page/:pageNumber', (req, res, next) => {
	return paginate(req, res, next);
});

router.get('/logout',(req,res)=>{
  req.logout();

  req.session.destroy()
  return res.redirect('/api/users/login')
})
module.exports = router;
