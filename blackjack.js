// all the cards we could draw from
const cards = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];

// global variables needed for game
let acesMsg = "", state = "", cardList = "";
// flags for buttons to control when they are pressed
let play = false, dropFlag = false, draw = true;
// sum of player cards
let sum = 0;

const init = () => {
  // determines if ace is high or low
  let highLow = Math.random();
  state = highLow > 0.5 ? "high" : "low";
  acesMsg = state === "high" ? "ACES are high" : "ACES are low";
  let val = (state === "high") ? 11 : 1;
  cardVals.set("ACE", val);

  // sets label
  document.getElementById("aces").innerHTML = acesMsg;

  // setup other labels
  document.getElementById("drawn").innerHTML = "Your Hand: ";
  document.getElementById("sum").innerHTML = "Your Sum: ";
  document.getElementById("end").innerHTML = "";
};

const getCardValues = () => {
  // map of card values
  const cardValues = new Map();
  let val = 2;

  // set everything except the face cards
  for (let i = 0; i < cards.length - 4; i++) {
    cardValues.set(cards[i], val);
    val++;
  }

  // setting all face values to 10 except ACE (special case)
  for (let i = 9; i <= 11; i++) 
    cardValues.set(cards[i], 10);

  return cardValues;
};

// map of all the cards and their values
const cardVals = getCardValues();

// draw function which draws cards
const drawCard = () => {
  if (draw && play) {
    let randomCard = Math.floor(Math.random() * cards.length);
    let card = cards[randomCard];
    // keeping track of cards and sum
    cardList += card + " ";
    sum += cardVals.get(card);
    // setting their labels
    document.getElementById("drawn").innerHTML = "Your Hand: " + cardList;
    document.getElementById("sum").innerHTML = "Your Sum: " + sum;
    // for the player
    if (sum > 21) {
      document.getElementById("end").innerHTML = "Dealer wins, you crossed 21";
      // reset button flags
      dropFlag = true;
      play = false;
      draw = false;
    }
  }
};

// function to make all the labels blank
const resetGameLabels = () => {
  document.getElementById("dealerCards").innerHTML = "";
  document.getElementById("dealerSum").innerHTML = "";
  document.getElementById("drawn").innerHTML = "";
  document.getElementById("sum").innerHTML = "";
};

const drop = () => {
  // let the dealer play now
  if (dropFlag === false) {
    cardList = "";
    let dealerSum = 0;
    while (dealerSum <= sum) {
      let ri = Math.floor(Math.random() * cards.length);
      let dealerCard = cards[ri];
      cardList += dealerCard + " ";
      dealerSum += cardVals.get(dealerCard);
    }

    // set the labels
    document.getElementById("dealerCards").innerHTML = "Dealer Hand: " + cardList;
    document.getElementById("dealerSum").innerHTML = "Dealer Sum: " + dealerSum;

    // end game conditions
    if (dealerSum > 21) {
      document.getElementById("end").innerHTML = "You win, the dealer crossed 21";
    } else if (dealerSum < 21 && dealerSum > sum) {
      document.getElementById("end").innerHTML = "The Dealer wins, they were closer to 21";
    } else if (sum < 21 && sum > dealerSum) {
      document.getElementById("end").innerHTML = "You win, you were closer to 21";
    } else if (dealerSum === 21) {
      document.getElementById("end").innerHTML =  "The Dealer wins, they got 21";
    }
  }

  // reset button flags
  dropFlag = true;
  draw = false;
};

// function that resets all labels to black state
const resetLabels = () => {
  document.getElementById("aces").innerHTML = "";
  document.getElementById("drawn").innerHTML = "";
  document.getElementById("sum").innerHTML = "";
  document.getElementById("dealerCards").innerHTML = "";
  document.getElementById("dealerSum").innerHTML = "";
  document.getElementById("end").innerHTML = "";
};

// for the quit button
const again = () => {
  // reset all values used
  play = false;
  dropFlag = false;
  draw = true;
  sum = 0;
  cardList = "";
  resetLabels();
};

// sets up the game with init function
const setup = () => {
  if (play === false) init();

  play = true;
  draw = true;
};
