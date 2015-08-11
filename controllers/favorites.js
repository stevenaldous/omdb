var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');
//////////////////////////////////////////////////
/// end of helpers/plugins////////////////////////
//////////////////////////////////////////////////

//GET /favorites - favorites home page
router.get('/', function(req, res){
  db.favorite.findAll().then(function(fav){
    res.render('favorites/index', {myFavs:fav});
  });
});
//POST /favorites - create favorites and add to DB
router.post('/', function(req, res){
  db.favorite.create({
    imdbId: req.body.imdbID,
    title:req.body.Title,
    year:req.body.Year,
    poster: req.body.Poster
  }).then(function(){
    res.redirect('/favorites')
  });
});

//GET-favorites/:id/comments - get comments for fav
router.get('/:id/comments', function(req, res){
  var id = req.params.id
  db.favorite.find({where: {id: id}}).then(function(favorite){
    db.comment.findAll({where:{favoriteId: id}, include:[db.favorite]}).then(function(comm){
     res.render('./comments/index', {
        myFav: favorite,
        myComments: comm
      });
    });
  });
});
//POST-favorites/:id/comments - create new comment
router.post('/:id/comments', function(req, res){
  var id = req.body.id
  var newComment = req.body.commField
  db.comment.create({comment: newComment, favoriteId:id}).then(function(comments){
    res.redirect('/favorites/'+comments.favoriteId+'/comments')
  });
});

module.exports=router;