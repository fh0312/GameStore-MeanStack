const express = require('express');
const router = express.Router();
var Wishlist = require("../modules/wishlist");
const { body, validationResult } = require("express-validator");



exports.getAllItems = async function(req, res, next) {
    try {
      const username = req.params.username;
      const wishlist = await Wishlist.findOne({ username: username});
      
      if (!wishlist) {
        return res.json([]);
      }

      return res.json(wishlist.itemIds);
    } catch (error) {
      console.error('Error fetching wishlist items:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.addItemToWishlist = async function (req,res,next){
    const username = req.body.username;
    const wishlist = await Wishlist.findOne({ username: username});

    if(!wishlist){
      var itemIds =[];
      itemIds.push(req.body.itemId);
      newWishlist = Wishlist({
        username: username,
        itemIds: itemIds
      })
      await newWishlist.save();
    }
    else{
      wishlist.itemIds.push(req.body.itemId);
      await wishlist.save();
    }

    res.status(200).json({ message: 'Item added to wishlist successfully' });
    
  }

  exports.delAll = async function (req,res,next){
    const username = req.body.username;
    const wishlist = await Wishlist.findOne({ username: username});

    if(!wishlist){
      res.status(200).json({ message: 'Wishlist not found' });
    }
    else{
      var indexs = wishlist.itemIds.filter(id => id === req.body.itemId);
      while (indexs.length>0) {
        const index = wishlist.itemIds.indexOf(req.body.itemId);
        if (index !== -1) {
          wishlist.itemIds.splice(index, 1);
        }
        indexs = wishlist.itemIds.filter(id => id === req.body.itemId);
      }
      await wishlist.save();
      res.status(200).json({ message: 'Item deleted successfully' });
    }
  }
  

module.exports = exports;