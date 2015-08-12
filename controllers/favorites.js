var express = require('express');
var router = express.Router();
var request = require('request');
var db = require('../models');


//GET /favorites - favorites home page
router.get('/', function(req, res){
  db.favorite.findAll().then(function(fav){
    res.render('favorites/index', {myFavs:fav});
  });
});
//POST /favorites - create favorites and add to DB
router.post('/', function(req, res){
  db.favorite.findOrCreate({where: {imdbId: req.body.imdbID}, defaults: {
    title:req.body.Title,
    year:req.body.Year,
    poster: req.body.Poster
  }}).spread(function(){
    res.redirect('/favorites')
  });
});

//GET-favorites/:id/comments - get comments for fav
router.get('/:id/comments', function(req, res){
  var id = req.params.id
  db.favorite.find({where: {id: id}}).then(function(favorite){
    db.comment.findAll({where:{
      favoriteId: id},
      include:[db.favorite]
    }).then(function(comm){
     res.render('./comments/index', {
        myFav: favorite,
        myComments: comm
      });
    });
  });
});
//POST-favorites/:id/comments - create new comment
router.post('/:id/comments', function(req, res){
  var id = req.params.id
  var newComment = req.body.commField
  db.comment.create({comment: newComment, favoriteId:id}).then(function(comments){
    res.redirect('/favorites/'+comments.favoriteId+'/comments')
  });
});
//delete
router.delete('/:id', function(req,res){
  db.favorite.destroy({where:{id:req.params.id}}).then(function(){
    res.redirect('/favorites')
  });
});

//GET /favorites/:id/tag/new - add a new tag
router.get('/:id/tags/new', function(req, res){
  res.render('tags/new', {favoriteId: req.params.id});
});

//GET /favotites/tags - get all tags
router.get('/tags', function(req, res){
  db.tag.findAll().then(function(tag){
    res.render('tags/index', {tags:tag})
  })
})


//POST/   -create new tag
router.post('/:id/tags/new', function(req, res){
  var favId = req.params.id;
  var tag = req.body.newtag
  // console.log(favId);
  // console.log(tag);
  db.favorite.findById(favId).then(function(fav){
    db.tag.findOrCreate({where: {tag: tag}})
    .spread(function(tag, created){
      fav.addTag(tag).then(function(){
        res.redirect('/favorites')
      });
    });
  });
});

module.exports=router;