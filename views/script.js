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




function RTS() {
    list = []
    list.push({
        'type': 'title',
        'value': document.querySelector('.edit-title-input').value
    })
    list.push({
        'type': 'description',
        'value': document.querySelector('.edit-textarea').value
    })
    list.push({
        'type': 'topic',
        'value': document.getElementById('selected').innerText.toLowerCase()
    })

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
    fetch('/log', {
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
    fetch('/log/login', {
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


function enableDragSort(listClass) {
    const sortableLists = document.getElementsByClassName(listClass);
    Array.prototype.map.call(sortableLists, (list) => {
        enableDragList(list)
    });
}

function enableDragList(list) {
    Array.prototype.map.call(list.children, (item) => {
        enableDragItem(item)
    });
}

function enableDragItem(item) {
    item.setAttribute('draggable', true)
    item.ondrag = handleDrag;
    item.ondragend = handleDrop;
}

function handleDrag(item) {
    const selectedItem = item.target,
        list = selectedItem.parentNode,
        x = item.clientX;
    y = item.clientY;

    selectedItem.classList.add('drag-sort-active');
    let swapItem = document.elementFromPoint(x, y) === null ? selectedItem : document.elementFromPoint(x, y);

    if (list === swapItem.parentNode) {
        swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
        list.insertBefore(selectedItem, swapItem);
    }
}

function handleDrop(item) {
    item.target.classList.remove('drag-sort-active');
}


items = document.querySelectorAll(".element"); //Get items
artcontent = document.querySelector(".art-content"); //Get art-content
items.forEach(function(item) {
    item.addEventListener("click", function() {
        switch (item.id) {
            case 'paragraph':
                paragraph = document.createElement('li')
                paragraph.innerHTML = '<textarea id="paragraph" class="to-publish paragraph"></textarea>'
                paragraph.setAttribute('draggable', 'true')
                paragraph.setAttribute('class', 'test')
                artcontent.appendChild(paragraph)
                break;
            case 'h1':
                h1 = document.createElement('li')
                h1.innerHTML = '<textarea id="h1" class="to-publish h1"></textarea>'
                h1.setAttribute('draggable', 'true')
                h1.setAttribute('class', 'test')
                artcontent.appendChild(h1)
                break;
            case 'h2':
                h2 = document.createElement('li')
                h2.innerHTML = '<textarea id="h2" class="to-publish h2"></textarea>'
                h2.setAttribute('draggable', 'true')
                h2.setAttribute('class', 'test')
                artcontent.appendChild(h2)
                break;
            case 'h3':
                h3 = document.createElement('li')
                h3.innerHTML = '<textarea id="h3" class="to-publish h3"></textarea>'
                h3.setAttribute('draggable', 'true')
                h3.setAttribute('class', 'test')
                artcontent.appendChild(h3)
                break;
            case 'quote':
                quote = document.createElement('li')
                quote.innerHTML = '<textarea id="quote" class="to-publish quote"></textarea>'
                quote.setAttribute('draggable', 'true')
                quote.setAttribute('class', 'test')
                artcontent.appendChild(quote)
                break;
            case 'image':
                image = document.createElement('li')
                image.innerHTML = '<div class="col-img"><img class="img-td" src="./assets/noimage.png"><div class="row-upload"><input id="image" placeholder="Image url" class="to-publish quote"><button style="margin-right: 0; border-radius: 0; width: 50%;" class="edit-publish">Upload</button></div></div>'
                image.setAttribute('draggable', 'true')
                image.classList.add('img-size')
                image.classList.add('test')
                artcontent.appendChild(image)
                break;
            case 'callout':
                callout = document.createElement('li')
                callout.innerHTML = '<div class="loudspeaker"><img class="loudspeaker" src="./assets/loudspeaker.svg"></div><textarea id="callout" class="to-publish callout"></textarea>'
                callout.setAttribute('draggable', 'true')
                callout.setAttribute('class', 'test')
                artcontent.appendChild(callout)
                break;
        }
        enableDragSort('art-content')
        toggleMenu()
    });
});