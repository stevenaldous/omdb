var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');


//get search info
router.get("/", function(req, res){
  var q = req.query.q.toLowerCase();
  var url = ('http://www.omdbapi.com/?s='+q);
  request(url, function(error, response, data){
    var parsedData = JSON.parse(data);
  res.render("flickSearch/index.ejs", {myResults: parsedData});
  });
});
// show particular movie - along with comments and tags
router.get("/:index", function(req, res){
  var q = req.params.index;
  var url = ("http://www.omdbapi.com/?i="+q+"&y=&plot=full&tomatoes=true&r=json");
  var tags = [];
  var comments = []
  var isFav
  db.favorite.find({where: {imdbId: q}, include: [db.tag]}).then(function(favorite){
    if(favorite){
      isFav = true;
      if(favorite.tags){
        favorite.tags.map(function(tag){
          tags.push(tag)
        });
      };
      db.comment.findAll({where: {favoriteId: favorite.id}}).then(function(comm){
        comm.map(function(comment){
          comments.push(comment)
        });
      });
    }else{
      isFav = false;
    }
  }).then(function(){
      request(url, function(error, response, data){
      var parsedData = JSON.parse(data);
      res.render("flickSearch/show", {
        movieInfo: parsedData,
        tags:tags,
        comments:comments,
        isFav:isFav
      });
    });
  });
});

module.exports=router;