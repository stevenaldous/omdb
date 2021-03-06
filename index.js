var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var ejsLayouts = require('express-ejs-layouts');
var methodOverride = require('method-override');
//used for link_to
require('express-helpers')(app);
//use layout page
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
//static pages
app.use(express.static(__dirname + '/public'));

app.use(ejsLayouts)
app.use("/flickSearch", require('./controllers/flickSearch.js'));
app.use("/favorites", require('./controllers/favorites.js'));
//////////////////////////////////////////////////
/// end of helpers/plugins////////////////////////
//////////////////////////////////////////////////
//home page
app.get("/", function(req, res){
  res.render('main/index.ejs');
})
// listen to this port when serving app locally
app.listen(process.env.PORT || 3000,function(){
  console.log("You're listening to the smooth sounds of port 3000")
});