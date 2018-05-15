$(document).ready(function() {
    /*
    * Create a list that holds all of your cards
    */
    
    let cards = [];
    let openCards = [];
    let moves = 0;
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
    //function onClick() {
        $(".card").click(function() {
            moves++;
            updateMoves(moves);
            displayCard($(this));
            var cardSymbNm  = $(this).find("i").attr("class");
            var prevSym = openCards[openCards.length-1];
            if(openCards=="") {
                addToList($(this));
            }
            else if(openCards[openCards.length-1]===cardSymbNm){
                lockMatchngCards($(this));
                addToList($(this)); 
            }
            else {
                removeFromList(); 
                hideCards(prevSym,$(this));
            }
            
        });
    //}

    
    function displayCard(card) {
        if(!card.hasClass("open show")) {
            card.addClass("open show");
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
        
        
    function addToList(symbol) {
        if(!openCards.includes(symbol)) {
            openCards.push(symbol);
        }
    }
    
        
    function removeFromList(symbol) {
        openCards.pop();
    }
    
    
    function hideCards(prevSym,nextSym) {
        var splitPrev = prevSym.split(" ");
        var splitNext = nextSym.split(" ");
        console.log("hide cards"+splitPrev[1]+""+splitNext[1]);
        
        setTimeout(function() {
             $("."+splitNext[1]).parent("li.card").removeClass("open show").addClass("mismatch shake");
             $("."+splitPrev[1]).parent("li.card").removeClass("open show").addClass("mismatch shake");
         },100);
            
        
    }
    
    
    function lockMatchngCards(symbol) {
        //slipt the class name to get fa-"*" instead of fa fa-"*"
        var splitSymbol = symbol.split(" ");
        
        //iterate through each card symbol ,find its parent and add "match" class to it.
        $("i."+splitSymbol[1]).each(function(obj,i) {
            $(this).parent("li.card").addClass("match").removeClass("open show");
            openCards.push(splitSymbol[1]);
        });
        
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




