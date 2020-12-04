let imgFront = document.querySelectorAll('.front-card');
const cards = document.querySelectorAll('.card')
let counter = 0;
let firstClick = true
let cardPair = []

let key = '020d921e01bcc08823ec27215c7b82d2';
let searchText = 'beer'
const url = `https://api.flickr.com/services/rest/?api_key=${key}&method=flickr.photos.search&text=${searchText}&per_page=12&page=100&format=json&nojsoncallback=1`

fetch(url).then(
	function (r) {
		return r.json();
	}
).then(
	function (data) {
		showImg(data);
		play()
	}
).catch(
	function (error) {
		console.log(error)
	}
)

function showImg(data) {
	let urls = [];
	for (let i = 0; i < data.photos.photo.length; i++) {
		let serverId = data.photos.photo[i].server
		let id = data.photos.photo[i].id
		let secret = data.photos.photo[i].secret

		let url = `https://live.staticflickr.com/${serverId}/${id}_${secret}_w.jpg`
		urls[i] = url;
	}

	let k = 0;
	for (let j = 0; j < imgFront.length; j++) {

		imgFront[j].src = urls[k];
		k++;

		if(k >= (imgFront.length/2)) {
			k = 0;
		}
		
	}
}

function flip() {
	this.classList.toggle('flip-card')
}

function play() {
	shuffle()
	cards.forEach(card => card.addEventListener('click', flip));


	cards.forEach((card) => {
		card.state = 'unclicked'

	})



	for (let i = 0; i < cards.length; i++) {
		cards[i].addEventListener('click', () => {
			if (firstClick) {
				time()
				firstClick = false
			}		

			if (cards[i].state == 'unclicked') {
				cards[i].style.transform = 'rotateY(180deg)'
				cards[i].state = 'clicked'
				counter++
				cardPair.push(cards[i])
				check()
			} else if (cards[i].state == 'clicked') {
				cards[i].style.transform = 'rotateY(0deg)'
				cards[i].state = 'unclicked'
				counter--
				cardPair = []
			}

		})
	}
}
function check() {
	if (counter == 2) {
		if (cardPair[0].querySelector('img').src == cardPair[1].querySelector('img').src) {
			matched()

		} else {
			unmatched(cardPair[0], cardPair[1])
		}
	}
}

function matched() {
	cardPair[0].state = 'blocked'
	cardPair[1].state = 'blocked'
	counter = 0
	cardPair = []
	let score = docuement.querySelector('hämta score id från html').innerHTML
	score++
	document.querySelector('Score från html').innerHTML = score
}

function unmatched(x, y) {
	setTimeout(() => {
		x.style.transform = 'rotateY(0deg)'
		y.style.transform = 'rotateY(0deg)'
	}, 750)
	cardPair[0].state = 'unclicked'
	cardPair[1].state = 'unclicked'
	counter = 0
	cardPair = []
}


function time() {
	let secs = 0
	let mins = 0
	let SS
	let MM
	setInterval(() => {
		secs++
		if (secs == 60) {
			secs = 0;
			mins++
		}
		secs < 10 ? SS = `0${secs}` : SS = `${secs}`
		mins < 10 ? MM = `0${mins}` : SS = `${mins}`

		document.querySelectorAll('Lägg in iD för time').innerHTML = `${MM}:${SS}`

	}, 1000);
}

function shuffle() {
	let srcs = [];
	for (let i = 0; i < imgFront.length; i++) {
		srcs.push(imgFront[i].src); 
	}

	for (let j = srcs.length - 1; j > 0; j--) {
		let k = Math.floor(Math.random() * (j+1))
		let temp = srcs[j]
		srcs[j] = srcs[k]
		srcs[k] = temp
	}

	for (let l = 0; l < imgFront.length; l++) {
		console.log(srcs[l]);
		imgFront[l].src = srcs[l]

	}


}