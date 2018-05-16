$(document).ready(function() {
    /*
    * Create a list that holds all of your cards
    */
    
    let cards = [];
    let openCards = [];
    let moves = 0;
    let prevCard = null;
    let matchCard = [];
    $(".card").each(function(obj,index) {
        cards.push($(this).find("i").attr("class"));
    });
    displayCards(cards);
    
    /*
     * Display the cards on the page
     *   - shuffle the list of cards using the provided "shuffle" method below
     *   - loop through each card and create its HTML
     *   - add each card's HTML to the page
     */
    function displayCards(cards) {
        $("ul.deck").children().remove();
        shuffle(cards);
        cards.forEach(function(obj,index) {
            $('<li class="card"><i class="'+obj+'"></i></li>').appendTo("ul.deck");
        });
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
   
    $("li.card").click(function() {
        moves++;
        if(openCards.length!=-1){
            prevCard = openCards[openCards.length-1];
        }
        displayCard($(this),prevCard);
    });
    
    
    $(".restart").click(function() {
        displayCards(cards);
    });
    
    function displayCard(card,prevCard) {
        if(!card.hasClass("open show")) {
            card.addClass("open show");
            addToOpenCardList(card);
        }
        if(prevCard!=null && moves%2==0 ){
            console.log("is equal"+prevCard.children().attr("class")===card.children().attr("class"));
            if(prevCard!=null && prevCard.children().attr("class")===card.children().attr("class")){
                lockMatchngCards(prevCard,card);
            }
            else {
                hideCards(prevCard,card);
            }
        }
     }
    
        
    function hasSymbol(symbol) {
        let exists = false;
        openCards.forEach(function(obj) {
            if(obj.children().attr("class") === symbol) {
                exists = true;
            }
            else{
                exists = false; 
            }
        });
        return exists;
    }
        
        
    function addToOpenCardList(symbol) {
        if(!openCards.includes(symbol) && openCards.length<17) {
            openCards.push(symbol);
        }
    }
    
        
    function removeFromList(num) {
        for(var i=0;i<=num;i++){
           openCards.pop(); 
        }
    }
    
    
    function hideCards(prevSym,nextSym) {
        setTimeout(function(){
           prevSym.addClass("shake").removeClass("open show");
           nextSym.addClass("shake").removeClass("open show");
           removeFromList(2);
        },200);
        prevSym.removeClass("shake");
        nextSym.removeClass("shake");
    }
    
    
    function lockMatchngCards(prevObj,thisObj) {
        console.log("lockcards"+prevObj+""+thisObj);
        prevObj.removeClass("open show").addClass("match");
        thisObj.removeClass("open show").addClass("match"); 
        matchCard.push(prevObj);
        matchCard.push(thisObj)
        console.log(matchCard.length);
        if(matchCard.length==16){
            $(".container").addClass("displayNone");
            $(".center").removeClass("displayNone");
        }
    }
    
    
    function updateMoves(moves){
        if(openCards.length<=16){
            $(".moves").text(moves);
        }
        console.log(openCards.length);
    }
    
    
    function updateRating() {
        
    }
    
    
    
    
    /*#Todo
    1.Create win page after card.match
    2.creating rating according to the number of moves and matching
    3.Timer?
    4.animation to the shuffle items 
    5.resolve issue with the on click show the card button.*/
});




