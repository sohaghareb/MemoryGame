/*
 * Create a list that holds all of your cards
 */

let firstClick='';
let count=16;
let moves=0;
let children="";
let stars=2;
let htmlList=document.querySelector('.deck');
function init(){

    let array=['fa-diamond','fa-diamond','fa-paper-plane-o','fa-paper-plane-o',
          'fa-anchor','fa-anchor','fa-bolt','fa-bolt','fa-cube','fa-cube',
          'fa-leaf','fa-leaf','fa-bicycle','fa-bicycle','fa-bomb','fa-bomb'];
    array=shuffle(array);
    htmlList.innerHTML="";
    for(let i=0; i <16; ++i){
        let liElem=document.createElement('li');
        liElem.className='card';
        let iElem=document.createElement('i');
        iElem.className='fa '+array[i];
        liElem.appendChild(iElem);
        htmlList.appendChild(liElem);
    }

    firstClick='';
    count=16;
    moves=0;
    children="";
    stars=2;
    //update moves and stars
    document.querySelector('.moves').innerText=moves;
    let stars_logo = document.querySelector('.stars');
    let li_list=stars_logo.querySelectorAll('i');
    li_list.forEach(function(i){
        i.className="fa fa-star";
    });
        

}

/**Start of Events **/
htmlList.onclick= function(event){
    let target=event.target;
    if(target.className.includes('card') && target.className != 'card show open' &&  !target.classList.contains('match')){
        showCard(target);
        if(firstClick == ''){
            firstClick=target;
            --count;
        }
        else{
            //check do they have same class if yes the win else change their classes
            if(firstClick.firstElementChild.className == target.firstElementChild.className){
                match(firstClick, target);    
                count--;
                if(count == 0){
                    setTimeout(()=>{ youWin();},1000);  
                }
            }else{
                missed(firstClick, target);
                count++;
            }
            firstClick='';
            incrementMoves();
        }
        
    }
    
}

document.querySelector('.restart').onclick=function(){
    location.reload();
}

document.querySelector('.mybutton').onclick=function(){
    init();
    let score_div=document.querySelector('.score');
    score_div.classList.toggle('fadeout');
    setTimeout(() => {
        score_div.style.opacity=0;
        score_div.style.display='none';
        let container= document.querySelector('.container');
        container.style.opacity=0;
        container.style.display='flex';
        container.classList.add('fadein');
        setTimeout(() => {
            container.style.opacity=1;
            container.classList.remove('fadein');
            score_div.classList.remove('fadeout');
        }, 501);
    },501);
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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

function youWin(){ 
    document.querySelector('.container').style.display='none';
    document.querySelector('.score').style.display='block'; 
    document.querySelector('h5').textContent='With '+moves+" Moves and "+(stars+1)+" Stars.";   
}

function match(x, y){
   setTimeout(()=>{
        x.classList.toggle('open');
        x.classList.toggle('match');
        y.classList.toggle('open');
        y.classList.toggle('match');   
   },500);  
}

function missed(x, y){
    setTimeout(() => {
        x.classList.toggle('open');
        y.classList.toggle('open'); 
        x.classList.toggle('show');
        y.classList.toggle('show'); 
        x.classList.toggle('missed');
        y.classList.toggle('missed');  
    }, 500);

    setTimeout(() => {
       x.classList.remove('missed');
       y.classList.remove('missed');
       x.classList.toggle('flib');
       y.classList.toggle('flib'); 
    }, 1000);   
}

function showCard(target){
    target.classList.remove('flib');
        setTimeout(()=>
        {
            target.classList.add('show');
            target.classList.add('open');
        },100);
}

function incrementMoves(){
    moves++;
    document.querySelector('.moves').innerText=moves;
    if(moves%9 == 0 && stars >= 0){
        document.querySelectorAll('.fa-star')[stars].className='fa fa-star-o';
        --stars;
    }
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that 
 * you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
init();