// letters
let letters = "abcdefghijklmnopqrstuvwxyz";

// get array from letters
let lettersArray = Array.from(letters);

// select letters container
let lettersContainer = document.querySelector(".letters");

// generate letters
lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theLetter = document.createTextNode(letter);
  span.appendChild(theLetter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// object of words and categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};

// get random property
let allKeys = Object.keys(words);
//random number depend on keys length
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
//random category
let randomPropName = allKeys[randomPropNumber];
//category words
let randomPropValue = words[randomPropName];
// ramdom number depend on words
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
//the choosen word
let randomValueValue = randomPropValue[randomValueNumber];

// set category info
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// select letters guess element
let lettersGuessContainer = document.querySelector(".letters-guess");

// convert chosen word into array
let lettersAndSpace = Array.from(randomValueValue);

// create spans depend on letters
lettersAndSpace.forEach((letter) => {
  let span = document.createElement("span");

  if (letter === " ") {
    // add class to the span
    span.className = "has-space";
  }
  lettersGuessContainer.appendChild(span);
});

// select guess spans
let guessSpans = document.querySelectorAll(".letters-guess span");

// select the draw element
let theDraw = document.querySelector(".hangman-draw");

// set wrong attend
let wrongAttempts = 0;

// handle clicking on letters
document.addEventListener("click", (e) => {
  // set the choose status
  let theStatus = false;

  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");

    // get clicked letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // the choosen word
    let theChooseWord = Array.from(randomValueValue.toLowerCase());

    theChooseWord.forEach((wordLetter, wordIndex) => {
      // if the clicked letter equal to one of the choosen word letter
      if (theClickedLetter === wordLetter) {
        theStatus = true;
        //loop on all guess spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });

    if (theStatus !== true) {
      // increase the wrong attempts
      wrongAttempts++;
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      // play fail sound
      document.getElementById("fail").play();
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    } else {
      // play success sound
      document.getElementById("success").play();
    }
    if (Array.from(guessSpans).every((span) => span.innerHTML !== "")) {
      Succ();
    }
  }
});

function endGame() {
  let div = document.createElement("div");
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`
  );
  div.appendChild(divText);

  div.className = "popup";
  document.body.appendChild(div);
}

function Succ() {
  let div = document.createElement("div");
  let divText = document.createTextNode(`Good Job You Are Great.`);
  div.appendChild(divText);

  div.className = "popup";
  document.body.appendChild(div);
}
