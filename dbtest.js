var db = require('./models');

// db.favorite.create({
//     imdbId:'blahblah',
//     title:'movie',
//     year:'1985',
//     poster:'img.245209'
//   }).then(function(fav){
//   console.log(fav.get());
// })

 // db.favorite.find().then(function(fav){
 //        db.comment.findAll()(function(comment){
 //          console.log(comment)
 //        })
 //      })

// db.comment.findAll().then(function(comm){
//   console.log(comm)
// })
db.comment.create({comment:'comment 3',favoriteId:2}).then(function(comments){
  console.log(comments)
})