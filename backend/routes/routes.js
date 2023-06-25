const express = require('express');
const router = express.Router();

const user_controller = require('../controllers/userController');
const cart_controller = require('../controllers/cartController');
const wishlist_controller = require('../controllers/wishlistController');
const biblioteca_controller = require('../controllers/bibliotecaController');


router.post('/register', user_controller.user_create);
router.post('/auth', user_controller.auth_user);
router.put('/user/image/:_id',user_controller.update_user_image);
router.put('/user/:_id',user_controller.update_user);
router.get('/dashboard', user_controller.go_to_dashboard);
router.get('/images', user_controller.get_images);
router.get('/cart/:username',cart_controller.getAllItems);
router.post('/cart/addItem/:username/:itemId',cart_controller.addItemToCart);
router.put('/cart/dellItem/:username/:itemId',cart_controller.delItem);
router.put('/cart/dellAll/:username/:itemId',cart_controller.delAll);
router.get('/wishlist/:username',wishlist_controller.getAllItems);
router.post('/wishlist/addItem/:username/:itemId',wishlist_controller.addItemToWishlist);
router.put('/wishlist/dellAll/:username/:itemId',wishlist_controller.delAll);
router.get('/biblioteca/:username',biblioteca_controller.getAllItems);
module.exports = router;