const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000
const url = ''

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded())

let test = [];

connect();

mongoose.connect(url);
 
// get reference to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
 
db.once('open', function() {
    console.log("Connection Successful!");
    })

const schema = mongoose.Schema

const NavigationSchema = schema({
  Place: String,
  xcoord: Number,
  ycoord: { type: Number, default: 0 },
  zcoord: Number,
  Description: {type: String, default: ""}
});

const NavigationModel = mongoose.model("NavigationModel", NavigationSchema);

//const nav1 = new NavigationModel({ Place: "CSL1", xcoord: 32.5, ycoord: 42.6, zcoord: 87.9, Description: 'Lab 1' });

app.get('/', function(req, res) {
  console.log('Inside Home Login');
  res.writeHead(200, {
    'Content-Type': 'application/json',
  });
  console.log('Data : ', JSON.stringify(test));
  res.end(JSON.stringify(test));
});


app.post('/place', function(req, res) {
  const newData = new NavigationModel({
    Place: req.body.place,
    xcoord: req.body.xcoord,
    ycoord: req.body.ycoord,
    zcoord: req.body.zcoord,
    Description: req.body.desc
  });
  newData.save((err) => {
    if (err) return handleError(err);
    else console.log('Saved!')
   });
  console.log(req.body);
  test.push(newData);
}); 

app.get('/place/:id', function(req,res){
  //console.log(req.body.place)
  NavigationModel.find({_id: req.params.id}, (err,coordinates) => {
    if (err) return handleError(err);
    res.send(coordinates);
  })
  res.send({'message' : 'invalid id'})
})

app.get('/places', function(req,res){
  NavigationModel.find((err,places) => {
    if (err) return handleError(err);
    res.send(places);
  })
})


async function connect() { 
  try {
    await mongoose.connect(url);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

app.listen(port, () => {
  console.log(`Application listening on port ${port}`)
})