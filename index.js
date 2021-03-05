
const port = 3001;
var express = require('express')
var cors = require('cors')
var app = express()
const path = require("path");


const multer = require("multer");
var fs = require('fs');

// function to encode file data to base64 encoded string
function base64_encode(file) {
    // read binary data
    var bitmap = fs.readFileSync(file);
    // convert binary data to base64 encoded string
    return new Buffer(bitmap).toString('base64');
}
let listeAnnoces =[]

const storage = multer.diskStorage({
   destination: "./public",
   filename: function(req, file, cb){
      cb(null,"IMAGE-" + Date.now() + path.extname(file.originalname));
   }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

app.use(cors())


bodyParser = require('body-parser')
app.use(bodyParser.json())
let a=[];
app.post('/deposer-une-annonce', upload.single('image'), (req, res, next) => {
  try {
    console.log(req.body);
  listeAnnoces.push(req.body)

  res.json(req.body)
  } catch (error) {
      console.error(error);
  }
});

app.get('/liste-annonces', (req, res, next) => {

  res.json({data:listeAnnoces})
  
});



app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`)
});