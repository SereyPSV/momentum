//-------------------------------------------//

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  const time = document.querySelector('.time');
  time.textContent = currentTime;
  showDate();
  showGreeting();
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'};
    const currentDate = date.toLocaleDateString('ru-Ru', options);
    const dateLocal = document.querySelector('.date');
    dateLocal.textContent = currentDate;
}

function getTimeOfDayRu() {
  const date = new Date();
  const hours = date.getHours();
  if ( 0 <= hours && hours < 6 ) { return 'Доброй ночи' };
  if ( 6 <= hours && hours < 12 ) { return 'Доброе утро' };
  if ( 12 <= hours && hours < 18 ) { return 'Добрый день' };
  if ( 18 <= hours && hours < 24 ) { return 'Добрый вечер' };
}

function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  if ( 0 <= hours && hours < 6 ) { return 'night' };
  if ( 6 <= hours && hours < 12 ) { return 'morning' };
  if ( 12 <= hours && hours < 18 ) { return 'day' };
  if ( 18 <= hours && hours < 24 ) { return 'evening' };
}

function showGreeting() {
  const timeOfDay = getTimeOfDayRu();
  const greeting = document.querySelector('.greeting');
  greeting.textContent = `${timeOfDay}, `;
}

//---------------------------------------------------------//

function setLocalStorage() {
  const name = document.querySelector('.name');
  localStorage.setItem('name', name.value);
  const city = document.querySelector('.city');
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  const name = document.querySelector('.name');
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  
  const city = document.querySelector('.city');
  if(localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getLocalStorage);

//---------------------------------------------------------//

let randomNum = Math.round(Math.random() * 19 + 1).toString().padStart(2, "0");

function setBg() {
  const bgNum = randomNum;
  const timeOfDay = getTimeOfDay();
  const backgroundImage = 'https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/' + timeOfDay + '/' + bgNum + '.jpg';
  const body = document.querySelector('body');
  body.style.backgroundImage = `url(${backgroundImage})`;
}
setBg()


function getSlideNext() {
  randomNum = (randomNum * 1 + 1).toString().padStart(2, "0");
  if (randomNum === '21') { randomNum = '01'} 
  setBg()
}

function SlideNext() {
  const slideNext = document.querySelector('.slide-next');
  slideNext.addEventListener('click', () => {
    getSlideNext()
  });
}
SlideNext()

function getSlidePrev() {
  randomNum = (randomNum * 1 - 1).toString().padStart(2, "0");
  if (randomNum === '00') { randomNum = '20'} 
  setBg()
}

function SlidePrev() {
  const slideNext = document.querySelector('.slide-prev');
  slideNext.addEventListener('click', () => {
    getSlidePrev()
  });
}
SlidePrev()
 
//--------------------------------------------------//

async function getWeather() {
  const city = localStorage.getItem('city');
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&appid=5aafed1baf3d266c18640359f6e9c6d5&units=metric`;
  const res = await fetch(url);
  const data = await res.json();

  const weatherIcon = document.querySelector('.weather-icon');
  const temperature = document.querySelector('.temperature');
  const weatherDescription = document.querySelector('.weather-description');
  const wind = document.querySelector('.wind');
  const humidity = document.querySelector('.humidity');

  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp}°C`;
  weatherDescription.textContent = data.weather[0].description;
  wind.textContent = `Ветер: ${data.wind.speed} м/с`;
  humidity.textContent = `Влажность: ${data.main.humidity} %`;
}
getWeather()

//------------------------------------------------------//

async function getQuotes() {  
  const url = 'https://type.fit/api/quotes';
  const quotes = await fetch(url);
  const data = await quotes.json(); 
  const newQuotes = data[Math.round(Math.random() * 1642 + 1)];
  
  const quote = document.querySelector('.quote');
  const author = document.querySelector('.author');
  quote.textContent = `"${newQuotes.text}"`;
  author.textContent = `${newQuotes.author}`;
}
getQuotes();

function changeQuote() {
  const quoteRandom = document.querySelector('.change-quote');
  quoteRandom.addEventListener('click', () => {
    getQuotes();
  });
}
changeQuote();

//-----------------------------------------------------//
let isPlay = false;
let playNum = 0;

const playBtn = document.querySelector('.play');
// const pauseBtn = document.querySelector('.pause');
const audio = new Audio();
playBtn.addEventListener('click', playAudio);


function playAudio() {
  audio.src = playList[playNum].src;
  audio.currentTime = 0;
  if (isPlay === true) {
    audio.pause();
    isPlay = false;
    playBtn.classList.toggle('pause');
  } else {
    audio.play();
    isPlay = true;
    playBtn.classList.toggle('pause');
  }
}

const playNextBtn = document.querySelector('.play-next');
playNextBtn.addEventListener('click', playNext);
function playNext() {
  playNum = playNum + 1;
  if (playNum > playList.length - 1) {playNum = 0};
  audio.src = playList[playNum].src;
  audio.play();
  isPlay = true;
  playBtn.classList.add('pause');
}

const playPrevBtn = document.querySelector('.play-prev');
playPrevBtn.addEventListener('click', playPrev);
function playPrev() {
  playNum = playNum - 1;
  if (playNum < 0) {playNum = playList.length - 1};
  audio.src = playList[playNum].src;
  audio.play();
  isPlay = true;
  playBtn.classList.add('pause');
}

const playList = [
  {      
    title: 'Aqua Caelestis',
    src: './assets/sounds/Aqua Caelestis.mp3',
    duration: '00:58'
  },  
  {      
    title: 'River Flows In You',
    src: './assets/sounds/River Flows In You.mp3',
    duration: '03:50'
  },
  {      
    title: 'Summer Wind',
    src: './assets/sounds/Summer Wind.mp3',
    duration: '01:50'
  },
  {      
    title: 'Ennio Morricone',
    src: './assets/sounds/Ennio Morricone.mp3',
    duration: '01:37'
  }
]

//---Создаем элемент <li></li> с классом .play-item в родительском элементе <ul></ul> с классом .play-list---//
for(let i = 0; i < playList.length; i++) {
  let melodyItem = "playList";
  const playListContainer = document.querySelector('.play-list');
  const li = document.createElement('li');
  li.classList.add('play-item');
  
  li.textContent = playList[i].title;
  playListContainer.append(li);
}
//---Создаем элемент <li></li> с классом .play-item в родительском элементе <ul></ul> с классом .play-list---//