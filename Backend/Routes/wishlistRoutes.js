const wishlistControllers = require('../Controllers/wishlistControllers');
const { authoriseJwt } = require('../utilities/authorisation');

const router = require('express').Router()

//add to wishlist
router.post('/add_wishlist',authoriseJwt,wishlistControllers.addWishList)

//remove from wishlist
router.delete('/remove_wishlist',authoriseJwt,wishlistControllers.remove_product)




module.exports = router;