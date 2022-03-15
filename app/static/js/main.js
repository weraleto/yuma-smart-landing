function startAnimFrameAnimation(rect) {
  let speedX = -1;
  let positionX = 0;
  let isPaused = false;

  rect.addEventListener('mouseenter', function(){
    isPaused = true
  })
  rect.addEventListener('mouseleave', function(){
    isPaused = false
    window.requestAnimationFrame(step);
  })

  function step() {
    if (Math.abs(positionX) > rect.firstElementChild.offsetWidth) {

      positionX += (rect.firstElementChild.offsetWidth + 70)
      rect.appendChild(rect.firstElementChild.cloneNode(true))
      rect.firstElementChild.remove()
    }

    positionX = positionX + speedX;
    rect.style.left = positionX + 'px';
    if (!isPaused){
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function translatedCardAnimationIn(event) {
  let card = event.target
  let cardFront = card.querySelector('.translated-card__item--front')
  let cardOverlay = card.querySelector('.translated-card__item--overlay')
  cardFront.classList.remove('animation-fade-in')
  cardFront.classList.add('animation-fade-out')
  setTimeout(function(){
    cardOverlay.classList.remove('animation-fade-out')
    cardOverlay.classList.add('animation-fade-in')
  }, 500)
}
function translatedCardAnimationOut(event) {
  let card = event.target
  let cardFront = card.querySelector('.translated-card__item--front')
  let cardOverlay = card.querySelector('.translated-card__item--overlay')
  cardOverlay.classList.remove('animation-fade-in')
  cardOverlay.classList.add('animation-fade-out')
  setTimeout(function(){
    cardFront.classList.remove('animation-fade-out')
    cardFront.classList.add('animation-fade-in')
  }, 500)
  
}


function handleCollapsible(event){
    let all_els = Array.from(this.children)
    let target = event.target.closest('.collapsible__item')
    all_els.forEach(function(it){
        if (it == target) {
            return
        } 
        it.classList.remove('opened')
    })
    target.classList.toggle('opened')  
    
}


function init(event){
    let collapsible = document.querySelectorAll('.js-collapsible')
    collapsible.forEach(function(it){
        it.addEventListener('click', handleCollapsible)
    })

    let translatedCard = document.querySelectorAll('.translated-card__item')
    translatedCard.forEach(function(it){
        it.addEventListener('mouseenter', translatedCardAnimationIn)
        it.addEventListener('mouseleave', translatedCardAnimationOut)
    })

    let marquee_el = document.querySelector('.marquee__inner')
    startAnimFrameAnimation(marquee_el);   
}

document.addEventListener("DOMContentLoaded", init);