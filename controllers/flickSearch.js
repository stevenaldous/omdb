var express = require('express');
var router = express.Router();
var request = require('request');
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
  var url = ("http://www.omdbapi.com/?i="+q);
  console.log(url);
  request(url, function(error, response, data){
    var parsedData = JSON.parse(data);
    res.render("flickSearch/show.ejs", {movieInfo: parsedData});
  });
});

module.exports=router;