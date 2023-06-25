const express = require('express');
const router = express.Router();
var Cart = require("../modules/cart");
var Item = require("../modules/item");
const { body, validationResult } = require("express-validator");
var async = require("async");
const fs = require('fs');


exports.getAllItems = async function(req, res, next) {
    try {
      const username = req.params.username;
      const cart = await Cart.findOne({ username: username});
      
      if (!cart) {
        return res.json([]);
      }

      return res.json(cart.itemIds);
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  exports.addItemToCart = async function (req,res,next){
    const username = req.body.username;
    const cart = await Cart.findOne({ username: username});

    if(!cart){
      var itemIds =[];
      itemIds.push(req.body.itemId);
      newCart = Cart({
        username: username,
        itemIds: itemIds
      })
      await newCart.save();
    }
    else{
      cart.itemIds.push(req.body.itemId);
      await cart.save();
    }

    res.status(200).json({ message: 'Item added to cart successfully' });
    
  }

  exports.delItem = async function (req,res,next){
    const username = req.body.username;
    const cart = await Cart.findOne({ username: username});

    if(!cart){
      res.status(200).json({ message: 'Cart not found' });
    }
    else{
      const index = cart.itemIds.indexOf(req.body.itemId);
      if (index !== -1) {
        cart.itemIds.splice(index, 1);
      }
      await cart.save();
      res.status(200).json({ message: 'Item deleted successfully' });
    }
  }

  exports.delAll = async function (req, res, next) {
    const username = req.body.username;
    const itemId = req.body.itemId;
  
    const result = await Cart.findOneAndUpdate(
      { username: username, itemIds: itemId },
      { $pull: { itemIds: itemId } },
      { new: true, useFindAndModify: false }
    );
  
    if (!result) {
      res.status(200).json({ message: 'Cart not found' });
    } else {
      res.status(200).json({ message: 'Item deleted successfully' });
    }
  };
  

module.exports = exports;