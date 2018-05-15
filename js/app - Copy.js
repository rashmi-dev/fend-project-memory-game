/*
 * Create a list that holds all of your cards
 */
$(document).ready(function() {
    let cardList = [];
    let openCardList = [];
    var match = false;
    var moves = 3;
    let count = 0;
    var elementI = document.getElementsByTagName("i");
    for(var i=0;i<elementI.length;i++) {
      cardList.push(elementI[i].className);
    }
    shuffle(cardList);
   $("li.card").click(function(){
       if(moves%2!=0){
         addOpenTrue($(this));
         
         if(openCardList.length<=16){
           moves++;
           updatemoves(moves);
        }  
       }
       else{
           var exists = addOpenCardList($(this).find("i").attr("class"));
            if(exists && match){
                addOpenCardList($(this).find("i").attr("class"));
               //openCardList.add($(this).find("i").attr("class"));
           }  
           else{
               //do some ui changes shuffle
              openCardList.pop();
           }
           console.log("opencardlist"+openCardList);
       }
       
   });
  



function addOpenCardList(name) {
   
    var cardExist = false;
    if(openCardList!=null && openCardList.includes(name)) {
        openCardList.push(name);
        cardExist = true;
        match = true;
    }
    else if(openCardList==null || !openCardList.includes(name)) {
        openCardList.push(name);
        cardExist = false;
        match = false;
    }
   
    return cardExist;
   
}

function addOpenTrue(classNm) {
   
    classNm.addClass("open show");
   
    addOpenCardList(classNm.find("i").attr("class"));
 
}
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
function displayCards() {
    shuffle(cardList);
}
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
function updatemoves(moves) {
    $(".moves").text(moves);
}



