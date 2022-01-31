const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie')

populateUI();

let ticketPrice = parseInt(movieSelect.value);


//Save movie data to local storage
function setMovieData(movieIndex, moviePrice){
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMovieProce', moviePrice);
    
}

//Update the selected number of seats and update the total price
function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;

    const seatsIndex = [...selectedSeats].map(function(seat){
        return [...seats].indexOf(seat);
    });
    console.log(seatsIndex);

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

    count.innerHTML = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}

//Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

    if (selectedSeats !== null && selectedSeats.length > 0){
        seats.forEach( function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');

    if(selectedMovieIndex !== null){
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change',function(e){
    ticketPrice = parseInt(e.target.value);
    updateSelectedCount();

setMovieData(e.target.selectedIndex,e.target.value);
})




//Seat selection 'click' event listener
container.addEventListener('click', function(e){
   
    if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');

        updateSelectedCount();

        // console.log(e.target);
    }
})

//intial count and total
updateSelectedCount()