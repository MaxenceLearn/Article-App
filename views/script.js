array = ['Stay informed, stay quick', 'Fast facts for a fast world', 'Get the news you need, when you need it, with Quick-News', 'Stay informed and in-the-know with Quick-News: the go-to source for fast, reliable news']
document.querySelector('.intro-text').innerHTML = (array[Math.floor(Math.random() * array.length)]);

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
    getArticles()
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

function getAccount() {
    getMyArticle()
    document.querySelectorAll('.section').forEach(item => {
        item.removeAttribute('id')
    })
    document.querySelector('.account').id = 'active'
}


function getAdmin() {
   window.location.href = '/admin'
}

function getArticles() {
    document.querySelector('.articles-flow').innerHTML = ''
    document.querySelector('.articles-flow').innerHTML = '<div style="margin-top: 15px" id="center" class="loading-bar"><div class="loader"></div></div></div>'
    fetch('/article/last', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                limit: 10
            })
            
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.articles-flow').innerHTML = ''
            let index = 0
            data.forEach(item => {
                article = document.createElement('div')
                article.classList.add('flow-art-main')
                article.style.animationDuration = `${index * 0.2}s`
                article.setAttribute('onclick', `getArticle('${item._id}')`)
                article.innerHTML = `
                <div class="flow-art-main art-load">
                <img src="${item.preview}" class="home-art-img">
                <div class="row-topic">
                        <h1 class="home-art-title">${item.title}</h1>
                        <div class="topic-profile">${item.topic}</div>
                    </div>
                <p class="home-art-desc">${item.description}</p>
                </div>`
                document.querySelector('.articles-flow').appendChild(article)
                index++
            })
        })
}

document.querySelectorAll('.topics-flow') .forEach(item => {
    item.addEventListener('click', event => {
    document.querySelector('.articles-flow').innerHTML = ''
    document.querySelector('.articles-flow').innerHTML = '<div style="margin-top: 15px" id="center" class="loading-bar"><div class="loader"></div></div></div>'
        fetch('/article/last', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                limit: 10,
                topic: event.target.innerText.toLowerCase()
            })
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.articles-flow').innerHTML = ''
            let index = 0
            data.forEach(item => {
                article = document.createElement('div')
                article.classList.add('flow-art-main')
                article.style.animationDuration = `${index * 0.2}s`
                article.setAttribute('onclick', `getArticle('${item._id}')`)
                article.innerHTML = `
                <div class="flow-art-main art-load">
                <img src="${item.preview}" class="home-art-img">
                <div class="row-topic">
                        <h1 class="home-art-title">${item.title}</h1>
                        <div class="topic-profile">${item.topic}</div>
                </div>
                <p class="home-art-desc">${item.description}</p>
                </div>`
                document.querySelector('.articles-flow').appendChild(article)
                index++
            })
        })
    })
})

function toggleMenu() {
    document.querySelector('.art-content').classList.toggle('full')
    document.querySelector('.edit-elements').classList.toggle('open')
    document.querySelector('.edit-elements').classList.toggle('close')
}

function deleteUser() {
    if (confirm('Are you sure you want to delete your account? This action is irreversible and will delete all you articles.'))
    fetch('/log', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => response.json())
    .then(data => {
        localStorage.clear()
        window.location.href = '/'
    })
}


function getMyArticle() {
    document.querySelector('.profile-articles').innerHTML = '<div id="center" class="loading-bar"><div class="loader"></div></div></div>'
    fetch('/article/last', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'author': `${localStorage.getItem('id')}`
            })
        })
        .then(response => response.json())
        .then(data => {
            document.querySelector('.profile-articles').innerHTML = `<h2>My articles (${data.length}) </h2>`
            data.forEach(item => {
                document.querySelector('.profile-articles').innerHTML += `
                <div id="${item._id}" class="articles-d">
                    <img src="${item.preview}" class="thumbnail"></img>
                    <div class="articles-infos">
                    <div class="row-topic">
                        <h3>${item.title}</h3>
                        <div class="topic-profile">${item.topic}</div>
                    </div>
                        <h4>${item.description}</h4>
                    </div>
                    <div class="actions">
                        <button onclick="getArticle('${item._id}')">Open</button>
                        <button>Edit</button>
                        <button id="delete" onclick="deleteArticle('${item._id}')">Delete</button>
                    </div>
                </div>
                `
            })
        })        
}



function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article?')) 
    fetch('/article', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'id': `${id}`
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data)
            getMyArticle()
        }
    )
}


document.getElementById('RTS').addEventListener('click', event => {
    if(confirm('Are you sure you to publish this article ?'))
    list = []
    list.push({
        'title': document.querySelector('.edit-title-input').value,
        'description': document.querySelector('.edit-textarea').value,
        'topic': document.getElementById('selected').innerText.toLowerCase(),
        'preview': document.getElementById('preview').value
    })
    content = []
    document.querySelectorAll('.to-publish').forEach(item => {
        value = item.value
        dico = {
            'type': `${item.id}`,
            'value': `${value}`,
        }

        content.push(dico)
    })
    list.push(content)
    console.log(list)
    fetch('/article', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'article': list
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(data.error || 'An error occured')
                document.getElementById('RTS').classList.remove('button--loading')
            } else {
                getArticle(data._id)
            }
        })
})




function imageload() {
    const img = new Image();
    img.src = document.getElementById('toload').value;
    if (img.complete) {
        document.querySelector('.to-publish').style.backgroundImage = `url('${document.getElementById('toload').value}')`
        document.getElementById('toload').style.border = '1px solid #e7e7e7'
    } else {
        img.onload = () => {
            document.querySelector('.to-publish').style.backgroundImage = `url(${document.getElementById('toload').value})`
            document.getElementById('toload').style.border = '1px solid #e7e7e7'
        };
        img.onerror = () => {
            document.getElementById('toload').style.border = '1px solid red'
        };
    }
}

document.querySelectorAll('.cancel').forEach(item => {
    item.addEventListener('click', () => {
        document.querySelectorAll('.log').forEach(item => {
            item.classList.remove('modal-open')
        })
    })
})


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
                document.getElementById('signup-popup').style.display = 'none'
            }
        })
})

let log = document.querySelectorAll('.open-modal');
log.forEach(item => {
    item.addEventListener('click', () => {
        const modalId = item.id.includes("signup") ? "signup-popup" :
            item.id.includes("update") ? "update-popup" : "signin-popup";
        document.getElementById(modalId).classList.add('modal-open');
    });
});

document.getElementById('update').addEventListener('click', async () => {
    try {
        document.getElementById('update').classList.add('button--loading');
        const response = await fetch('/log', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                pseudo: document.getElementById('username-tu').value,
                avatar: document.getElementById('avatar-tu').value,
            }),
        });
        const data = await response.json();
        if (data.error) {
            alert(data.error || 'An error occured');
            document.getElementById('update').classList.remove('button--loading');
        } else {
            checkLogin();
            document.getElementById('update-popup').classList.remove('modal-open');
            document.getElementById('update').classList.remove('button--loading');
        }
    } catch (err) {
        console.error(err);
        alert(err);
        document.getElementById('update').classList.remove('button--loading');
    }
});


document.getElementById('signin').addEventListener('click', () => {
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
                document.getElementById('signin').classList.remove('button--loading')
            } else {
                document.getElementById('signin-popup').style.display = 'none'
                document.querySelector('.buttons-log').style.display = 'none'
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
                    document.getElementById('account').style.display = 'block'
                    document.getElementById('edit').style.display = 'block'
                    document.querySelectorAll('.buttons-log').forEach(item => {
                        item.style.display = 'none'
                    })
                    document.querySelector(".utils").style.display = 'flex'
                    console.log(window.innerWidth)
                    if (window.innerWidth < 1200) {
                        document.getElementById('ui-home').style.display = 'flex'
                    } else {
                        console.log('ok')
                        document.getElementById('ui-sidebar').style.display = 'flex'
                    }
                    document.querySelectorAll('.user-name').forEach(item => {
                        item.innerHTML = `${data.pseudo}`
                    })
                    localStorage.setItem('user', data.pseudo)
                    localStorage.setItem('avatar', data.avatar)
                    localStorage.setItem('id', data.id)
                    document.getElementById('profile-image').src = data.avatar
                    document.querySelector('.profile-username').innerHTML = `${data.pseudo}`
                    document.getElementById('username-tu').value = data.pseudo
                    document.querySelector('.profil-username-infos').innerHTML = `${data.role} @${data.pseudo.toLowerCase()}`
                    if (data.role === 'admin') {
                        document.getElementById('admin').style.display = 'flex'
                    }
                }
            }
        })
}

document.getElementById('logout').addEventListener('click', () => {
    fetch('/log/logout')
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.log(data.error)
            } else {
                window.location.reload()
            }
        })
})


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
                paragraph.innerHTML = '<textarea id="paragraph" maxlength="2000" placeholder="Write a paragraph up to 2000 characters" class="to-publish paragraph"></textarea>'
                paragraph.setAttribute('draggable', 'true')
                paragraph.setAttribute('class', 'contain')
                artcontent.appendChild(paragraph)
                break;
            case 'h1':
                h1 = document.createElement('li')
                h1.innerHTML = '<textarea id="h1" maxlength="120" placeholder="Write a big title up to 120 characters" class="to-publish h1"></textarea>'
                h1.setAttribute('draggable', 'true')
                h1.setAttribute('class', 'contain')
                artcontent.appendChild(h1)
                break;
            case 'h2':
                h2 = document.createElement('li')
                h2.innerHTML = '<textarea id="h2"  maxlength="120" placeholder="Write a medium title up to 120 characters" class="to-publish h2"></textarea>'
                h2.setAttribute('draggable', 'true')
                h2.setAttribute('class', 'contain')
                artcontent.appendChild(h2)
                break;
            case 'h3':
                h3 = document.createElement('li')
                h3.innerHTML = '<textarea id="h3" maxlength="120" placeholder="Write a little title up to 120 characters" class="to-publish h3"></textarea>'
                h3.setAttribute('draggable', 'true')
                h3.setAttribute('class', 'contain')
                artcontent.appendChild(h3)
                break;
            case 'quote':
                quote = document.createElement('li')
                quote.innerHTML = '<textarea id="quote" maxlength="250" placeholder="Write a quote up to 250 characters" class="to-publish quote"></textarea>'
                quote.setAttribute('draggable', 'true')
                quote.setAttribute('class', 'contain')
                artcontent.appendChild(quote)
                break;
            case 'image':
                image = document.createElement('li')
                image.innerHTML = '<div class="col-img"><img class="img-td" src="./assets/noimage.png"><div class="row-upload"><input maxlength="500" placeholder="Image Url" id="image" placeholder="Image url" class="to-publish image"><button style="margin-right: 0; border-radius: 0; width: 50%;" class="edit-publish">Upload</button></div></div>'
                image.setAttribute('draggable', 'true')
                image.classList.add('img-size')
                image.classList.add('contain')
                artcontent.appendChild(image)
                break;
            case 'callout':
                callout = document.createElement('li')
                callout.innerHTML = '<div class="loudspeaker"><img class="loudspeaker" src="./assets/loudspeaker.svg"></div><textarea  maxlength="500" placeholder="Write a callout up to 500 characters" id="callout" class="to-publish callout"></textarea>'
                callout.setAttribute('draggable', 'true')
                callout.setAttribute('class', 'contain')
                artcontent.appendChild(callout)
                break;
            case 'youtube':
                youtube = document.createElement('li')
                youtube.innerHTML = '<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/37gEog2VEkg" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></div>'
                youtube.setAttribute('draggable', 'true')
                youtube.setAttribute('class', 'contain')
                youtube.classList.add('video-size')
                artcontent.appendChild(youtube)
                break;
        }
        enableDragSort('art-content')
        toggleMenu()
    });
});

function getArticle(id) {
    document.querySelector('.for-you').innerHTML = ''
    document.querySelector('.for-you').innerHTML = '<div style="margin-top: 20px;" id="center" class="loading-bar"><div class="loader"></div></div></div>'
    getReading()
    document.querySelector('.art-main').innerHTML = '<div id="center" class="loading-bar"><div class="loader"></div></div></div>'
    let article_main = document.querySelector('.art-main')
    fetch('/article/last', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            'id': `${id}`
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            getHome()
        } else {
            if (window.innerWidth >= 1200) {
                getReadingStuff(data[0].topic)
            }
            let article_image = document.createElement('img')
            article_image.classList.add('art-image')
            article_image.setAttribute('src', `${data[0].preview}`)
            let imageLoaded = new Promise((resolve, reject) => {
                article_image.onload = resolve;
                article_image.onerror = reject;
            });
            imageLoaded.then(() => {
                document.querySelector('.art-main').innerHTML = ''
                let article_title = document.createElement('h1')
                article_title.classList.add('art-title')
                article_title.innerHTML = `${data[0].title}`
                article_main.appendChild(article_title)
                article_main.appendChild(article_image)
                data[0].content.forEach(function(item) {
                    let article_content = document.createElement('div')
                    article_content.classList.add(`${item.type}`)
                    article_main.appendChild(article_content)
                    switch (item.type) {
                        case 'paragraph':
                            let paragraph = document.createElement('p')
                            paragraph.innerHTML = `${item.value}`
                            article_content.appendChild(paragraph)
                            break;
                        case 'h1':
                            let h1 = document.createElement('h1')
                            h1.innerHTML = `${item.value}`
                            article_content.appendChild(h1)
                            break;
                        case 'h2':
                            let h2 = document.createElement('h2')
                            h2.innerHTML = `${item.value}`
                            article_content.appendChild(h2)
                            break;
                        case 'h3':
                            let h3 = document.createElement('h3')
                            h3.innerHTML = `${item.value}`
                            article_content.appendChild(h3)
                            break;
                        case 'quote':
                            let quote = document.createElement('blockquote')
                            quote.innerHTML = `"${item.value}"`
                            article_content.appendChild(quote)
                            break;
                        case 'image':
                            let image = document.createElement('img')
                            image.setAttribute('src', `${item.value}`)
                            article_content.appendChild(image)
                            break;
                        case 'callout':
                            article_content.innerHTML = `<div style="min-width: 78px" class="loudspeaker"><img style="width: 35px" class="loudspeaker" src="./assets/loudspeaker.svg"></div><p class="call-out-text">${item.value}</p>`
                            article_main.appendChild(article_content)
                            break;       
                    }
                })
            })
            fetch('/getinfos/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': data[0].author
                })
            })
            .then(response => response.json())
            .then(data => {
                let author = document.createElement('div')
                author.classList.add('author')
                author.innerHTML = `<img class="author-img" src="${data.avatar}"><p class="author-name">${data.pseudo} (${data.role})</p>`
                article_main.appendChild(author)
            })
        }
    })
}

function getHomeArticles(topic) {
    fetch('/article/last', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'limit': 3,
            'topic': `${topic}`
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.articles').innerHTML = ''
        data.forEach(function(article, index) {
            index += 1
            let articleDiv = document.createElement('div')
            articleDiv.classList.add('home-art-main')
            articleDiv.setAttribute('onclick', `getArticle('${article._id}')`)
            articleDiv.style.animationDuration = `${index * 0.5}s`
            articleDiv.innerHTML = `
            <img src="${article.preview}"Logo" class="home-art-img">
            <h1 class="home-art-title">${article.title}</h1>
            <p class="home-art-desc">${article.description}</p>`
            document.querySelector('.articles').appendChild(articleDiv)
        })
    })

}

const searchInput = document.getElementById("search-input");
const debouncedUpdateArticles = debounce(updateArticles, 500);

searchInput.addEventListener("keyup", function(){
    let searchValue = searchInput.value;
    debouncedUpdateArticles(searchValue);
});


function updateArticles(searchValue) {
    document.querySelector('.articles-flow').innerHTML = ''
    document.querySelector('.articles-flow').innerHTML = '<div style="margin-top: 15px" id="center" class="loading-bar"><div class="loader"></div></div></div>'
    fetch('/article/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'search': `${searchValue}`,
            'limit': 20
        })
    })
    .then(response => response.json())
    .then(data => {
        document.querySelector('.articles-flow').innerHTML = ''
        let index = 0
        data.forEach(item => {
            article = document.createElement('div')
            article.classList.add('flow-art-main')
            article.style.animationDuration = `${index * 0.2}s`
            article.setAttribute('onclick', `getArticle('${item._id}')`)
            article.innerHTML = `
            <div class="flow-art-main art-load">
            <img src="${item.preview}" class="home-art-img">
            <div class="row-topic">
                    <h1 class="home-art-title">${item.title}</h1>
                    <div class="topic-profile">${item.topic}</div>
            </div>
            <p class="home-art-desc">${item.description}</p>
            </div>`
            document.querySelector('.articles-flow').appendChild(article)
            index++
        })
    })
}



function debounce(func, delay) {
    let debounceTimer;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => func.apply(context, args), delay);
    }
}


function getReadingStuff(topic) {
    fetch('/article/last', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'topic': `${topic}`,
            'limit': 2
        })
    })
    .then(response => response.json())
    .then(data => {   
        document.querySelector('.for-you').innerHTML = ''
        data.forEach(function(article) {
            let articleFy = document.createElement('div')
            articleFy.classList.add('more-main')
            articleFy.setAttribute('onclick', `getArticle('${article._id}')`)
            articleFy.innerHTML = `
                    <img src="${article.preview}" class="more-img">
                    <h1 class="more-title">${article.title}</h1>
                    <p class="more-desc">${article.description}</p>`
            document.querySelector('.for-you').appendChild(articleFy)
        })
    })
}


document.querySelector('.topics').addEventListener('click', function(e) {
   getHomeArticles(e.target.innerHTML.toLowerCase())
})

function init() {
    element = document.querySelector('.infos-prog')
    getHome()
    document.querySelector('.selector').style.top = `${window.scrollY + document.getElementById(`home`).getBoundingClientRect().top- 10.5}px`
    document.querySelector('.selector').style.left = `${document.getElementById(`home`).getBoundingClientRect().left - 23.5}px`
    document.getElementById(`home`).style.filter = 'invert(100%)'
    checkLogin()
    getHomeArticles()
    element.innerHTML = 'Page is loading...'
}



init()

const url = new URL(window.location.href);
const id = url.searchParams.get("a");


window.addEventListener('load', function () {
    document.querySelector('.introduction').classList.add('loadingend')
    document.querySelector('.blur').classList.add('loadingend')
    setTimeout(function() {
        document.querySelector('.blur').style.display = 'none'
        document.querySelector('.introduction').style.display = 'none'
    }, 1500)
    if (id) {
        getArticle(id);
        getReading();  
    }    
})