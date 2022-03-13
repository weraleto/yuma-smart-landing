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
}

document.addEventListener("DOMContentLoaded", init);