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
// db.comment.create({comment:'comment 3',favoriteId:2}).then(function(comments){
//   console.log(comments)
// })
// db.tag.create({tag:"black"}).then(function(tag){
//   console.log(tag.get());
// });
// db.favorite.findById(2).then(function(fav){
//   db.tag.findOrCreate({where: {tag: "black"}})
//   .spread(function(tag, created){
//     fav.addTag(tag).then(function(){
//       console.log(fav.get());
//       console.log('====================');
//       console.log(tag.get());
//       console.log('====================');
//     });
//   });
// });
db.comment.findAll().then(function(fav){
  console.log(fav.get());
});
// db.favoritesTags.findAll({where: {tagId: 1}}).then(function(glue){
//   console.log(glue.get());
// });

// db.tag.find({where: {id: 1}}).then(function(tag){
//   console.log(tag.get());
// });
// db.tag.findById(1).then(function(tag){
//   console.log(tag.get());
// });