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
getHome()



items = document.querySelectorAll(".element");//Get items
artcontent = document.querySelector(".art-content");//Get art-content
items.forEach(function(item) {
  item.addEventListener("click", function() {
    newelement = document.createElement(`div`);//Create new element
    newelement.setAttribute(`id`, `${item.id + '-e'}`);//Set classLogo
    newelement.setAttribute(`class`, `to-publish`);//Set class
    switch (item.id) {
        case 'paragraph':
            newelement.innerHTML = `<textarea class='${item.id}' maxlength="2000" type='text' placeholder='Type a paragraph here'>`
            break;
        case 'h1':
            newelement.innerHTML = `<textarea class='${item.id}' maxlength="200" type='text' placeholder='Type a big title here'>`
            break;
        case 'h2':
            newelement.innerHTML = `<textarea class='${item.id}' maxlength="200" type='text' placeholder='Type a medium title here'>`
            break;
        case 'h3':
            newelement.innerHTML = `<textarea class='${item.id}' maxlength="200" type='text' placeholder='Type a small title here'>`
            break;
        case 'quote':
            newelement.innerHTML = `<textarea class='${item.id}' maxlength="350" type='text' placeholder='Type a quote here'>`
            break;
        case 'callout':
            newelement.innerHTML = `<img class='callout-img' src='./assets/announce.png'><textarea class='${item.id}' maxlength="400" type='text' placeholder='Type a callout here'>`
            break;
        case 'image':
            newelement.innerHTML = `<div class='rowmenu'><textarea id='toload' class='${item.id}' maxlength="500" type='text' placeholder='Type an image url here'></textarea><button class='load-img' onclick='imageload()'>Load</button></div>`
            break;
    }
    artcontent.appendChild(newelement);
    toggleMenu();
  });
});


function localcheck() {
    list = []
    document.querySelectorAll('.to-publish').forEach(item => {
        for (const child of item.children) {
            if (child.tagName === 'TEXTAREA') {value = child.value} else {
                for (const child2 of child.children) {
                    if (child2.tagName === 'TEXTAREA') {value = child2.value}
                }
            }
        }
        dico = {
            'type': `${item.id}`,
            'value': `${value}`,
        }
        
        list.push(dico)
    })
    console.log(list)
}




function imageload() {
    const img = new Image();
    img.src = document.getElementById('toload').value;
    console.log(img.src)
    if (img.complete) {
      console.log('complete')
      document.querySelector('.to-publish').style.backgroundImage = `url('${document.getElementById('toload').value}')`
      document.getElementById('toload').style.border = '1px solid #e7e7e7'
    } else {
      img.onload = () => {
        document.querySelector('.to-publish').style.backgroundImage = `url(${document.getElementById('toload').value})`
        document.getElementById('toload').style.border = '1px solid #e7e7e7'
      };
      img.onerror = () => {
        console.log('error')
        document.getElementById('toload').style.border = '1px solid red'
      };
    }
}


