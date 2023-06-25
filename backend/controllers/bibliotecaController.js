const express = require('express');
var Biblioteca = require("../modules/biblioteca");




exports.getAllItems = async function(req, res, next) {
    try {
      const username = req.params.username;
      const biblioteca = await Biblioteca.findOne({ username: username});
      
      if (!biblioteca) {
        return res.json([]);
      }

      
      return res.json(biblioteca.itemIds);
    } catch (error) {
      console.error('Error fetching biblioteca items:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  };

  

module.exports = exports;