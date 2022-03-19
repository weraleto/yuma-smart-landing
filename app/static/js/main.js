function startAnimFrameAnimation(rect) {
  let speedX = -1;
  let positionX = 0;
  let isPaused = false;

  rect.addEventListener('mouseenter', function () {
    isPaused = true
  })
  rect.addEventListener('mouseleave', function () {
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
    if (!isPaused) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function dispatchClick() {
  const clickEvent = new Event('click')
  this.dispatchEvent(clickEvent)
}


function checkCityPhone() {
  let cityPhone = localStorage.getItem('cityPhone')
  if (cityPhone) {
    let {
      city,
      phone
    } = JSON.parse(cityPhone)
    setCityPhone(city, phone)
  }
}

function handleDropdown(event) {
  let overlay = document.getElementById('overlay')
  let el = this
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.classList.add('body-overlay')
    overlay.id = 'overlay'
    document.body.appendChild(overlay)
    overlay.addEventListener('click', dispatchClick.bind(this))
  } else {
    overlay.remove()
  }
  document.body.classList.toggle('body-scroll-lock')
  this.classList.toggle('opened')
}

function setCityPhone(city, phone) {
  localStorage.setItem('cityPhone', JSON.stringify({
    city,
    phone
  }))

  let cityPhoneEl = document.querySelector('.js-city-tel')

  elements = document.querySelector('.js-city-dropdown-items')
  cityPhoneEl.innerHTML = phone
  cityPhoneEl.setAttribute('href', 'tel:' + phone)
  Array.from(elements.children).forEach(function (it) {
    it.classList.remove('active')
    if (it.dataset['cityPhone'] == phone) {
      it.classList.add('active')
    }
  })
  document.querySelector('.dropdown__selected-title').innerHTML = city
}

function translatedCardAnimationIn(event) {
  let card = event.target
  let cardFront = card.querySelector('.translated-card__item--front')
  let cardOverlay = card.querySelector('.translated-card__item--overlay')
  cardFront.classList.remove('animation-fade-in')
  cardFront.classList.add('animation-fade-out')
  setTimeout(function () {
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
  setTimeout(function () {
    cardFront.classList.remove('animation-fade-out')
    cardFront.classList.add('animation-fade-in')
  }, 500)

}


function handleCollapsible(e) {
  let all_els = Array.from(this.children)
  let target = e.target.closest('.collapsible__item')
  all_els.forEach(function (it) {
    if (it == target) {
      return
    }
    it.classList.remove('opened')
  })
  target.classList.toggle('opened')
}


function init(event) {
  checkCityPhone()

  document.querySelectorAll('.js-collapsible').forEach(function (it) {
    it.addEventListener('click', handleCollapsible)
  })

  document.querySelectorAll('.translated-card__item').forEach(function (it) {
    it.addEventListener('mouseenter', translatedCardAnimationIn)
    it.addEventListener('mouseleave', translatedCardAnimationOut)
  })

  let marquee_el = document.querySelector('.marquee__inner')
  startAnimFrameAnimation(marquee_el);


  document.querySelectorAll('.js-city-dropdown-el').forEach(function (it) {
    it.addEventListener('click', function (event) {
      setCityPhone(this.innerHTML, this.dataset['cityPhone'])
    })
  })

  document.querySelectorAll('.js-dropdown').forEach(function (it) {
    it.addEventListener('click', handleDropdown)
  })
}

document.addEventListener("DOMContentLoaded", init);