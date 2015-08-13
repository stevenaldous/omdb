var express = require('express');
var router = express.Router();
var db = require('../models');

//GET /tags - get all tags
router.get('/', function(req, res){
  db.tag.findAll([{include: [db.favorite]}]).then(function(tags){
    tags.sort(function(a, b){
      var aFav = a.favorites.length;
      var bFav = b.favorites.length;
      if(aFav>bFav){

      }
    })
    res.render('tags/index', {tags:tags})
  })
})

module.exports=router;