require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()
const port = 5000
const url = process.env.MONGODB_URL

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded())

let test = [];

// get reference to database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {
  console.log("Connection Successful!");
})

const schema = mongoose.Schema

const NavigationSchema = schema({
  Place: String,
  xcoord: Number,
  ycoord: { type: Number, default: 0 },
  zcoord: Number,
  Description: { type: String, default: "" }
});

const NavigationModel = mongoose.model("NavigationModel", NavigationSchema);

//const nav1 = new NavigationModel({ Place: "CSL1", xcoord: 32.5, ycoord: 42.6, zcoord: 87.9, Description: 'Lab 1' });

app.get('/', function (req, res) {
  res.send({ 'message': "error" });
});


app.post('/place', function (req, res) {
  const newData = new NavigationModel({
    Place: req.body.place,
    xcoord: req.body.xcoord,
    ycoord: req.body.ycoord,
    zcoord: req.body.zcoord,
    Description: req.body.desc
  });
  newData.save((err) => {
    if (err) res.send({ "message": "error" })
    else res.send(newData);
  });
});

app.get('/place/:id', function (req, res) {
  NavigationModel.find({ _id: req.params.id }, (err, coordinates) => {
    if (err) res.send({ "message": "error" })
    else res.send(coordinates);
  })
})

app.get('/places', function (req, res) {
  NavigationModel.find((err, places) => {
    if (err) res.send([])
    else res.send(places);
  })
})

app.listen(port, async () => {
  mongoose.connect(url);
  console.log(`Application listening on port ${port}`)
})
