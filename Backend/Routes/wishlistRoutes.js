const wishlistControllers = require('../Controllers/wishlistControllers');
const { authoriseJwt } = require('../utilities/authorisation');

const router = require('express').Router()

//add to wishlist
router.post('/add_wishlist',authoriseJwt,wishlistControllers.addWishList)

//remove from wishlist
router.delete('/remove_wishlist/:userId/:productId',authoriseJwt,wishlistControllers.remove_product)

//get wishlist
router.get('/get_wishlist/:userId',authoriseJwt,wishlistControllers.getWishList)

//get wishlist
router.get('/get_wishlist_count/:userId',authoriseJwt,wishlistControllers.getWishlistCount)




module.exports = router;