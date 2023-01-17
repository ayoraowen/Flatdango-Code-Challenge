// Your code here
filmMenu = document.getElementById("films")
let buyTicketBtn=document.getElementById('buy-ticket')
let ticketNumber=document.getElementById('ticket-num')
let movieTitle = document.getElementById('title')
function renderFirstFilm(firstFilmData){
  
  movieTitle.dataset.id=firstFilmData.id
  let id=firstFilmData.id
  ticketNumber.dataset.id=firstFilmData.capacity
  let movieRunTime=document.getElementById('runtime')
  let movieInfo=document.getElementById('film-info')
  let movieShowTime=document.getElementById('showtime')
  
  let moviePoster=document.getElementById('poster')

  movieTitle.textContent=firstFilmData.title
  movieRunTime.textContent=firstFilmData.runtime
  movieInfo.textContent=firstFilmData.description
  movieShowTime.textContent=firstFilmData.showtime
  ticketNumber.textContent=firstFilmData.capacity-firstFilmData.tickets_sold
  moviePoster.src=firstFilmData.poster
  
  
  
}


buyTicketBtn.addEventListener('click',updateServerTicketsLeft)//()=>{
    
    //if(ticketNumber.textContent>0){
    //   debugger;
     
      //updateServerTicketsLeft(movieTitle.dataset.id)
      
      //firstFilmData.tickets_sold=ticketNumber.textContent+1
      //updateServerTicketsLeft(firstFilmData)
   // }//,{once: true}
    //console.log(firstFilmData)
    
  
  //)//}//)


function updateServerTicketsLeft(){
  ticketNumber.textContent-=1
  let y=ticketNumber.dataset.id-ticketNumber.textContent
  console.log(movieTitle.dataset.id)
  
  fetch(`https://my-json-server.typicode.com/ayoraowen/flatdango-code-challenge/films/${movieTitle.dataset.id}`,{
    method:'PATCH',
    headers:{
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'tickets_sold': `${y}`
    })
  })
  .then(res => res.json())
  .then(film =>console.log(film))
}

function renderFilmsList(filmList){
  filmList.forEach(film => {
    let filmMenuEntry = document.createElement('li')
    filmMenuEntry.addEventListener('click',(e) => {
      getFirstFilmData(e.target.dataset.id)
      })
    filmMenuEntry.textContent = film
    filmMenuEntry.dataset.id = filmList.indexOf(film) + 1
    filmMenu.appendChild(filmMenuEntry)
})

}

function initialize() {
  //const filmList = filmData.array.map(films => films.title)
  getAllFilmData()
  getFirstFilmData()
  
    
}

function getFirstFilmData(id=1){
  fetch(`https://my-json-server.typicode.com/ayoraowen/flatdango-code-challenge/films/${id}`)
  .then(res => res.json())
  .then(firstFilmData => {
    renderFirstFilm(firstFilmData)
  })
}

function getAllFilmData(){
    fetch('https://my-json-server.typicode.com/ayoraowen/flatdango-code-challenge/films')
    .then(res => res.json())
    .then(filmData => {
      const filmArrayList=filmData.map(films => films.title)
      renderFilmsList(filmArrayList)
    })
}

initialize()