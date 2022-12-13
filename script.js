document.querySelectorAll('.button').forEach(item => {    
    item.addEventListener('click', event => {
        document.querySelectorAll('.button').forEach(item => {
            item.style.filter = 'invert(0%)'
        })
        document.querySelector('.selector').style.top = `${window.scrollY + document.getElementById(`${event.target.id}`).getBoundingClientRect().top- 10.5}px`
        document.querySelector('.selector').style.left = `${document.getElementById(`${event.target.id}`).getBoundingClientRect().left - 23.5}px`
        document.getElementById(`${event.target.id}`).style.filter = 'invert(100%)'
    })
  })


  document.querySelectorAll('.topic').forEach(item => {    
    item.addEventListener('click', event => {
        document.querySelectorAll('.topic').forEach(item => {
            item.style.border = '1px solid rgb(231, 231, 231)'
            item.style.backgroundColor = 'white'
        })
        event.target.style.backgroundColor = 'rgb(231, 231, 231)'
        event.target.style.border = '1px solid rgb(0, 0, 0)'
    })
  })


function getHome() {
    document.getElementById('home').click()
    document.querySelectorAll('.section').forEach(item => {
        item.removeAttribute('id')
    })
    document.querySelector('.home').id = 'active'
}

function getFlow() {
    document.getElementById('flow').click()
    document.querySelectorAll('.section').forEach(item => {
        item.removeAttribute('id')
    })
    document.querySelector('.flow').id = 'active'
}

function getReading() {
    document.getElementById('read').click()
    document.querySelectorAll('.section').forEach(item => {
        item.removeAttribute('id')
    })
    document.querySelector('.read').id = 'active'
}

function getEdit() {
    document.getElementById('edit').click()
    document.querySelectorAll('.section').forEach(item => {
        item.removeAttribute('id')
    })
    document.querySelector('.edit').id = 'active'
}


function toggleMenu() {
    document.querySelector('.art-content').classList.toggle('full')
    document.querySelector('.edit-elements').classList.toggle('open')
    document.querySelector('.edit-elements').classList.toggle('close')
}

document.querySelector('.selector').style.top = `${window.scrollY + document.getElementById(`home`).getBoundingClientRect().top- 10.5}px`
document.querySelector('.selector').style.left = `${document.getElementById(`home`).getBoundingClientRect().left - 23.5}px`
document.getElementById(`home`).style.filter = 'invert(100%)'
getEdit()



items = document.querySelectorAll(".element");//Get items
artcontent = document.querySelector(".art-content");//Get art-content
items.forEach(function(item) {
  item.addEventListener("click", function() {
    newelement = document.createElement(`div`);//Create new element
    newelement.setAttribute(`id`, `${item.id}`);//Set class
    newelement.setAttribute(`class`, `to-publish`);//Set class
    newelement.innerHTML = `<textarea id='${item.id}'></textarea>`
    artcontent.appendChild(newelement);
    toggleMenu();
  });
});


function localcheck() {
    list = []
    document.querySelectorAll('.to-publish').forEach(item => {
        dico = {}
        dico['type'] = item.id
        dico[`${item.id}`] = 'test'
        list.push(dico)
    })
    console.log(list)
}


