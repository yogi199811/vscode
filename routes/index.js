var express = require('express');
var router = express.Router();
var fs = require("fs")
var namefile = "uploads"
// var dir = "temp"


/* GET home page. */
router.get('/', function (req, res) {
  fs.readdir(`./${namefile}`, { withFileTypes: true }, function (err, files) {


    var arr = []
    files.forEach(function (val) {
      arr.push({ name: val.name, isFolder: val.isDirectory() })
    })


    res.render('index', { files: arr, namefile: namefile });
    console.log(arr)
  })
});


router.get('/file/:filename', function (req, res) {
  fs.readdir(`./${namefile}`, { withFileTypes: true }, function (err, files) {
    fs.readFile(`./${namefile}/${req.params.filename}`,"utf8",function(err,data){
      
      var arr = []
      files.forEach(function (val) {
        arr.push({ name: val.name, isFolder: val.isDirectory() })
      })
      res.render('file', { files: arr, namefile: namefile, filename: req.params.filename , data: data });
    })  
  })
});







router.get('/delete/:something/:check', function (req, res) {
  if(req.params.check === 1){
    
    fs.unlink(`./${namefile}/${req.params.something}`, function (err, data) {
  
      res.redirect("/");
    })
  }
  else{
    fs.rm(`./${namefile}/${req.params.something}`,{force:true,recursive:true} , function (err, data) {
  
      res.redirect("/");
    })
  }
});

router.get('/createfile', function (req, res) {
  fs.writeFile(`./${namefile}/${req.query.yogi}`, "", function (err, data) {

    res.redirect("/");
  })
});


router.get('/createfolder', function (req, res) {
  fs.mkdir(`./${namefile}/${req.query.folder}`, function (err, data) {

    res.redirect("/");
  })
});




router.post('/save/:filename', function (req, res){
  fs.writeFile(`./${namefile}/${req.params.filename}`, req.body.filedata ,function(err,data){
    res.redirect("back")
  })

});








module.exports = router;







