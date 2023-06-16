var rating = 0;

let star1 = document.getElementById("star1");
let star2 = document.getElementById("star2");
let star3 = document.getElementById("star3");
let star4 = document.getElementById("star4");
let star5 = document.getElementById("star5");
function animateRating1() {
	star1.classList.add("hover");
	star2.classList.remove("hover");
	star3.classList.remove("hover");
	star4.classList.remove("hover");
	star5.classList.remove("hover");
}
function animateRating2() {
	star1.classList.add("hover");
	star2.classList.add("hover");
	star3.classList.remove("hover");
	star4.classList.remove("hover");
	star5.classList.remove("hover");
}
function animateRating3() {
	star1.classList.add("hover");
	star2.classList.add("hover");
	star3.classList.add("hover");
	star4.classList.remove("hover");
	star5.classList.remove("hover");
}
function animateRating4() {
	star1.classList.add("hover");
	star2.classList.add("hover");
	star3.classList.add("hover");
	star4.classList.add("hover");
	star5.classList.remove("hover");
}
function animateRating5() {
	star1.classList.add("hover");
	star2.classList.add("hover");
	star3.classList.add("hover");
	star4.classList.add("hover");
	star5.classList.add("hover");
}

function clearRating() {
	star1.classList.remove("hover");
	star2.classList.remove("hover");
	star3.classList.remove("hover");
	star4.classList.remove("hover");
	star5.classList.remove("hover");
}

function clearChecked() {
	star1.classList.remove("checked");
	star2.classList.remove("checked");
	star3.classList.remove("checked");
	star4.classList.remove("checked");
	star5.classList.remove("checked");
}


function displayRating(rating) {

	clearChecked();

	if (rating > 0) {
		star1.classList.add("checked");
	}
	if (rating > 1) {
		star2.classList.add("checked");
	}
	if (rating > 2) {
		star3.classList.add("checked");
	}
	if (rating > 3) {
		star4.classList.add("checked");
	}
	if (rating > 4) {
		star5.classList.add("checked");
	}
}

function setRating(given_rating) {

	rating = given_rating;

	displayRating(rating);

}