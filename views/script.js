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
            item.id = ''
        })
        event.target.style.backgroundColor = 'rgb(231, 231, 231)'
        event.target.style.border = '1px solid rgb(0, 0, 0)'
        event.target.id = 'selected'
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
    newelement = document.createElement(`textarea`);//Create new element
    newelement.setAttribute('draggable', 'true');//Set draggable
    newelement.setAttribute(`id`, `${item.id}`);//Set classLogo
    newelement.setAttribute(`class`, `${item.id}`);//Set class
    newelement.classList.add('to-publish');//Add class to-publish
    artcontent.appendChild(newelement);
    toggleMenu();
  });
});


function RTS() {
    list = []
    list.push({'type': 'title', 'value': document.querySelector('.edit-title-input').value})
    list.push({'type': 'description', 'value': document.querySelector('.edit-textarea').value})
    list.push({'type': 'topic', 'value': document.getElementById('selected').innerText.toLowerCase()})
    
    document.querySelectorAll('.to-publish').forEach(item => {
        value = item.value
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

document.getElementById('signup').addEventListener('click', () => {
    fetch('/log',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'pseudo': document.getElementById('pseudo').value,
                'password': document.getElementById('password').value,
                'avatar': document.getElementById('avatar').value
            })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Some informations are missing not unique or incorrect')
        } else {
            console.log(data)
            document.getElementById('signup-popup').style.display = 'none'
        }
    })
})

let log = document.querySelectorAll('.sign')
log.forEach(item => {
    item.addEventListener('click', () => {
        document.getElementById('signup-popup').style.display = 'none'
        document.getElementById('signin-popup').style.display = 'none'
        if (item.id === 'signup-button') {
            document.getElementById('signup-popup').style.display = 'flex'
        } else {
            document.getElementById('signin-popup').style.display = 'flex'
        }
    })
})

document.getElementById('signin').addEventListener('click', () => {
    console.log('signin')
    fetch('/log/login',
    {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'pseudo': document.getElementById('pseudo-s').value,
                'password': document.getElementById('password-s').value
            })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            alert('Some informations are missing not unique or incorrect')
        } else {
            document.getElementById('signin-popup').style.display = 'none'
            document.querySelector('.buttons-log').style.display = 'none'
            document.querySelector('.user-infos').style.display = 'flex'
            checkLogin()
        }
    })
})

function checkLogin() {
    fetch('/getinfos')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.log(data.error)
        } else {
            if (data.logged === false) {
                console.log('not logged')
            } else {
                document.querySelector('.buttons-log').style.display = 'none'
                document.querySelector('.user-infos').style.display = 'flex'
                document.getElementById('user-name').innerHTML = `${data.pseudo}`
                document.querySelector('.user-img').src = `${data.avatar}`
            }
        }
    })
}
checkLogin()

const container = document.querySelector('.art-content');

// Add the draggable attribute and the dragstart, dragenter, dragover, and dragleave event listeners to the to-publish elements
container.addEventListener('mousedown', e => {
  if (e.target.matches('.to-publish')) {
    const elem = e.target;
    elem.setAttribute('draggable', true);
    elem.addEventListener('dragstart', e => {
      // Set the data that will be transferred during the drag
      e.dataTransfer.setData('text/plain', null);

      // Add the 'dragging' class to the element being dragged
      // This can be used to apply styles to the element while it is being dragged
      elem.classList.add('dragging');
    });
    elem.addEventListener('dragenter', e => {
      // Prevent the default behavior
      e.preventDefault();

      // Add the 'over' class to the container
      // This can be used to apply styles to the container while an element is being dragged over it
      container.classList.add('over');
    });
    elem.addEventListener('dragover', e => {
      // Prevent the default behavior
      e.preventDefault();
    });
    elem.addEventListener('dragleave', e => {
      // Remove the 'over' class from the container
      container.classList.remove('over');
    });
  }
});

// Add the drop event listener to the container
container.addEventListener('drop', e => {
  // Prevent the default behavior
  e.preventDefault();

  // Get the element being dragged
  const elem = document.querySelector('.dragging');

  // Get the target element (the element under the dragged element)
  const target = e.target;

  // Exchange the positions of the element being dragged and the target element
  container.insertBefore(elem, target);
  container.insertBefore(target, elem);

  // Remove the 'dragging' and 'over' classes
  elem.classList.remove('dragging');
  container.classList.remove('over');
});

