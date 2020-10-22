let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
let apiKey = ',us&units=metric&APPID=0eb60b07facbe4b46f0f98162cfb008e';

let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

//MAIN
document.getElementById('generate').addEventListener('click', performAction);

function performAction(){
  let newJournal = document.getElementById('zip').value;
  let feelings =  document.getElementById('feelings').value;

  getWeather(baseURL, newJournal, apiKey)
  .then( function (data) {
    postData('/addWeather', {location: data.name, temprature: data.main.temp, icon: data.weather[0].icon, feelings: feelings})
    updateUI()
  })

  
};


//DATA SYNC
const getWeather = async (baseURL, zip, key)=>{
   const weatherRes = await fetch(baseURL+zip+key);
  try {
    const weatherData = await weatherRes.json();
    return weatherData;
  } catch(error) {
    console.log('error:', error);
  }
};

const postData = async ( url = '', data = {})=>{
  const response = await fetch(url, {
  method: 'POST', 
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
  }, 
  body: JSON.stringify(data), 
});

  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  }catch(error) {
    console.log('error:', error);
  }
}

// updateUI
let situation = `linear-gradient(to right, #2bc0e4, #eaecc6)`;
const updateUI = async () => {
  const request = await fetch('/all');
  try{
    //Journal Color
    const allData = await request.json();
    if (allData[0].icon == '04d' | '04n' | '09d' | '09n') {
      situation = 'linear-gradient(to right, #be93c5, #7bc6cc)';
    }else if(allData[0].icon == '10d' | '10n' | '11d' | '11n') {
      situation = 'linear-gradient(to right, #4ecdc4, #556270)';
    }else if(allData[0].icon == '13d' | '13n' | '50d' | '50n') {
      situation = 'linear-gradient(to right, #e8cbc0, #636fa4)';
    }else if(allData[0].icon == '01d' | '01n') {
      situation = 'linear-gradient(to right, #9cecfb, #65c7f7, #0052d4)';
    };

    //UI
    document.getElementById('icon').innerHTML = '<img src=\"http://openweathermap.org/img/wn/' + allData[0].icon + '@4x.png\">';
    document.getElementById('date').textContent = newDate;
    document.getElementById('temp').innerHTML = allData[0].temprature + '°C ';
    document.getElementById('content').innerHTML = allData[0].feelings;
    document.getElementById('generate').style.backgroundImage = situation;
    document.getElementById('weather').style.backgroundImage = situation;
    document.getElementById('body').style.backgroundImage = situation;

  }catch(error){
    console.log("error", error);
  }
}

