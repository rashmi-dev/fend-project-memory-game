    $(function () {
        let cards = [];
        let openCards = [];
        let clickedCards = [];
        let moves = 0;
        let prevCard = null;
        let matchCard = [];
        let num_stars = 0;
        let interval = null;
        
        
        /*
        * Create a list that holds all of your cards
        */
        $(".card").each(function(obj,index) {
            cards.push($(this).find("i").attr("class"));
        });
        
        
        /*display cards and call shuffle inside it */
        displayCards(cards);  
        /* display timer function and start the timer */
        displayTimer();
        /* display rating initial rating is 3 */
        displayRating(3);
        
        
        /* on card click function */
        $("li.card").click(function() {
            /* increase moves only if the card is not already open or matched */
           if(!$(this).hasClass("open show") && !$(this).hasClass("match")){
                moves++;
            }
            updateMoves(moves);
            updateRating();
            if(openCards.length != -1){
                prevCard = openCards[openCards.length - 1];
            }
           if(!$(this).hasClass("match") || !prevCard.hasClass("match")) {
               displayCard($(this),prevCard);
           }
        });
        
        
        /* disable double click on the cards */
        $("li.card").dblclick(function(e){
            return false;
        });
        
        
        /* on replay button click on the winner page it resets the game and starts the timer */
        $(".replay,.restart").click( function() {
            resetMoves();
            replay();
        });
        
        
        function replay() {
            $(".container").removeClass("displayNone");
            $(".winner-page").addClass("displayNone");
            displayCards(cards);

            $("li.card").click(function() {
                if(!$(this).hasClass("open show") && !$(this).hasClass("match")){
                    moves++;
                }
                else if($(this).hasClass("match")){
                    return false;
                }
                updateMoves(moves);
                updateRating();
                if(openCards.length != -1){
                    prevCard = openCards[openCards.length - 1];
                }
                displayCard($(this),prevCard);
             });
         }
        
        
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
        
        
        //Timer function from stackoverflow.com
        function displayTimer(clear) {
            var timer2 = "5:00";
            interval = setInterval(function() {
                var timer = timer2.split(':');
                //by parsing integer, I avoid all extra string processing
                var minutes = parseInt(timer[0], 10);
                var seconds = parseInt(timer[1], 10);
                --seconds;
                minutes = (seconds < 0) ? --minutes : minutes;
                seconds = (seconds < 0) ? 59 : seconds;
                seconds = (seconds < 10) ? '0' + seconds : seconds;
                //minutes = (minutes < 10) ?  minutes : minutes;
                $('.timer').html(minutes + ':' + seconds);
                if (minutes < 0) clearInterval(interval);
                //check if both minutes and seconds are 0
                if ((seconds <= 0) && (minutes <= 0)) clearInterval(interval);
                timer2 = minutes + ':' + seconds;
                 var time = $(".timer").text().split(":");
                //when timer is equal to zero display alert to restart the game!
                if((time[0] == 0)&&(time[1] == 00)){
                    $("#myModal").removeClass("displayNone");
                }
                else{
                    $("#myModal").addClass("displayNone");
                }
            }, 1000);
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
        $("#restart").click(function() {
            $("#myModal").addClass("displayNone");
             resetMoves();
             replay();
        });
        
        
        function displayCard(card,prevCard) {
            /* add cards to openCard array only if it has not been already added before */
            if(!card.hasClass("open show") || !card.hasClass("match")) {
                card.addClass("open show");
                addToOpenCardList(card);
            }
            if(prevCard != null && moves % 2 == 0){
                if((prevCard != null) && (!checkForSameCard(card,prevCard)) && (prevCard.children().attr("class") ===   card.children().attr("class"))){
                   lockMatchngCards(prevCard,card);
                }
                else {
                    hideCards(prevCard,card);
                }
            }
         }
        
        
        function checkForSameCard(card,prevCard) {
            let prevCardPos = prevCard.position();
            let cardPos = card.position();
            if(prevCardPos.left == cardPos.left && prevCardPos.top == cardPos.top){
                return true;
            }
            return false;
        }
        
        
        function addToOpenCardList(symbol) {
            if(!openCards.includes(symbol) && openCards.length < 17) {
                openCards.push(symbol);
            }
        }
        
        
        function removeFromList(num) {
            for(var i = 0;i <= num;i++){
               openCards.pop(); 
            }
        }


        function hideCards(prevSym,nextSym) {
            setTimeout(function(){
                if(!prevSym.hasClass("match") && !nextSym.hasClass("match"))
               prevSym.addClass("shake").removeClass("open show");
               nextSym.addClass("shake").removeClass("open show");
               removeFromList(2);
            },200);
            prevSym.removeClass("shake");
            nextSym.removeClass("shake");
        }
        
        
        function lockMatchngCards(prevObj,thisObj) {
            prevObj.removeClass("open show").addClass("match");
            thisObj.removeClass("open show").addClass("match"); 
            matchCard.push(prevObj);
            matchCard.push(thisObj)
            
            if(matchCard.length === 16){
                updateRating();
                let countDown = $(".timer").text().split(":");
                let min = 5 - parseInt(countDown[0]);
                let sec = 60 - parseInt(countDown[1]);
                $(".container").addClass("displayNone");
                $(".winner-page").removeClass("displayNone");
                $("#moves-info").text("With "+moves+" moves and "+num_stars+" stars. Time taken to win the game is "+min+":"+sec);
                clearInterval(interval);
            }
        }
        
        
        function updateMoves(moves) {
           if(openCards.length <= 16) {
                $(".moves").text(moves);
            }
        }
        
        
        function updateRating() {
            if ((moves <= 16 && moves >= 10) && matchCard.length <= 8) {
                displayRating(3);
                num_stars = 3;
            }   
            else if ((moves <= 32 && moves > 10) && (matchCard.length >= 8 && matchCard.length <= 14)){
                displayRating(4);   
                num_stars = 4;
            }
            else if ((moves <= 32 && moves > 10) && matchCard.length == 16) {
                displayRating(5);
                num_stars = 5;
            }
            else if ((moves >= 48 && moves < 56) && matchCard.length >=  10){
                displayRating(2);
                num_stars = 2;
            }
            else if ((moves >= 56 && moves <= 70) && matchCard.length >= 10){
                displayRating(2);
                num_stars = 2;
            }
            else if (moves > 70 && matchCard.length >= 12){
                displayRating(1);
                num_stars = 1;
            }  
        }
        
        
        function resetMoves() {
            moves=0;
            openCards.splice(0, openCards.length);
            matchCard.splice(0, matchCard.length);
            $(".moves").text(moves);
            displayRating(3);
            clearInterval(interval);
            displayTimer();
        }
        
        
        function displayRating(num) {
            $(".stars li").remove();
            if(matchCard.length <= 0 && $(".stars li").length == 0){
                for(var i = 0;i < 3;i++) {
                    $("<li><i class='fa fa-star fa-lg'></i></li>").appendTo(".stars");
                }   
            }
            var numLi = $(".stars li").length;
            if(num > numLi){
               var rem = num - numLi;
               for(var i = 0;i < rem;i++) {
                $("<li><i class='fa fa-star fa-lg'></i></li>").appendTo(".stars");
             }  
            }
            else if(num < numLi){
                var rem = numLi - num;
                for(var i = 0;i < rem;i++) {
                    $("li").eq(i).remove();
                }
            }
        }
    });
        