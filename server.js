const projectData = [];

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const cors = require('cors');
app.use(cors());

app.use(express.static('website'));

const port = 8080;
const server = app.listen(port, () => {
    console.log(`you are runining with ${port} port.`)
});


//GET
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log('GET request to the homepage');
});

//POST
app.post('/addWeather', (req, res) =>{

  newJournal = {
    location: req.body.location,
    temprature: req.body.temprature,
    icon: req.body.icon,
    feelings: req.body.feelings
  }
  projectData.unshift(newJournal)
  console.log('POST request to the homepage')
  console.log(req.body)
});

