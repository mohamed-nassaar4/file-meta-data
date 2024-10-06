var express = require('express');
var cors = require('cors');
require('dotenv').config()
const multer=require('multer');
const upload = multer({ dest: 'uploads/' })

var app = express();
app.use(express.json());

// Include express.urlencoded() middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse',upload.single('upfile'),async(req,res)=>{
  try{
console.log(req.file)
res.json({"name":req.file.originalname,"type":req.file.mimetype,"size":req.file.size})
  }catch(e){
    console.log(e)
    res.json({error:e.message})
  }
})


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
