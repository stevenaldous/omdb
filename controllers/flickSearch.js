var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');
//////////////////////////////////////////////////
/// end of helpers/plugins////////////////////////
//////////////////////////////////////////////////
//get search info
router.get("/", function(req, res){
  //take search and format
  var q = req.query.q
  var url = ('http://www.omdbapi.com/?s='+q);
  request(url, function(error, response, data){
    var parsedData = JSON.parse(data);
  res.render("flickSearch/index.ejs", {myResults: parsedData});
  });
});
// show particular movie
router.get("/:index", function(req, res){
  var q = req.params.index;
  var url = ("http://www.omdbapi.com/?i="+q+"&y=&plot=full&r=json");
  console.log(url);
  request(url, function(error, response, data){
    var parsedData = JSON.parse(data);
    res.render("flickSearch/show.ejs", {
          movieInfo: parsedData,
          //attempt to include. think if/else is needed to accomplish
    // db.favorite.find({where: {imdbId: q}}).then(function(favorite){
    //   db.comment.findAll({where:{favoriteId: favorite.id},include:[db.favorite]}).then(function(comm){
    //    res.render("flickSearch/show.ejs", {
    //       movieInfo: parsedData,
    //       myFav: favorite,
    //       myComments: comm
    //   });
    //  });
    });
  });
});

module.exports=router;