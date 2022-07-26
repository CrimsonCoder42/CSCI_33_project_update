document.addEventListener('DOMContentLoaded', function () {

    // Use buttons to toggle between views

    document.querySelector('#submit').addEventListener('click', () => create_post());
    let currentUser = document.querySelector('#my_profile').innerText
    let links = document.getElementsByClassName('postMaker')

    Array.from(links).forEach(element => {
        element.addEventListener('click', () => user_profile(element.dataset.name))
        if (element.innerText == currentUser){
            element.innerText = "Me"

        }

        });

    // Turn buttons into EDIT if the same user created them grab them by data-index
    const editButtons = document.querySelectorAll(`[data-index=${currentUser}]`);

    Array.from(editButtons).forEach(element => {

        element.className = "btn btn-warning"
        element.innerText = "Edit"
        //element.addEventListener('click', () => user_profile(element.innerText))
        });

//    let likes = document.getElementsByClassName('btn btn-success')
//    Array.from(likes).forEach(element => {
//        element.addEventListener('click', () => like_button(element.id))
//        });

    feed_page()

});

function feed_page() {

    // Show compose view and hide other views
    document.querySelector('#index_view').style.display = 'block';
    //document.querySelector('#post-view').style.display = 'block';
    document.querySelector('#profile_view').style.display = 'none';


    document.querySelector('#compose-body').value = '';

}


function create_post() {

let postBody = document.querySelector('#compose-body').value

    fetch('post', {
            method: 'POST',
            body: JSON.stringify({
                body: document.querySelector('#compose-body').value
            })
        })
        .then(response => response.json())
        .then(result => {
                console.log("done")
        });
}


function user_profile(name) {
    document.querySelector('#index_view').style.display = 'none';
    document.querySelector('#profile_view').style.display = 'block';

    let card = document.querySelectorAll(`[data-type="post"]`)

    Array.from(card).forEach(element => {
         console.log(element)
         let postName = element.dataset.name
         if (postName == name) {
            element.className = "hide"
            }
        });

    let username = document.querySelector('#username')
    let userBio = document.querySelector('#userBio')
    let followers = document.querySelector('#followers')
    let following = document.querySelector('#following')
    let tbody = document.querySelector('#connect')

    fetch(`personal_profile/${name}`)
        .then(response => response.json())
        .then(info => {

        console.log(info)
            let data = info.profile_info
            username.innerText = data.username
            userBio.innerText = data.user_bio
            followers.innerText = data.followers_count
            following.innerText = data.following_count

            console.log(info.personal_posts)
            create_posts(info.personal_posts, tbody)
        });
}


//Will make a full card with all information just needs data and where first element should attach
function create_posts(data, attach){

    data.forEach(element => {
         console.log(element)

         let classes=["card-body", "row", "col-lg-3", "aside-content", "aside-header"]
         let date = element.timestamp.slice(0,10)
         let time = element.timestamp.slice(11,18)
         let tr = createElement('tr', `tr${element.id}`, 'className')
         attach.appendChild(tr)
         let div= createElement('div', `div0${element.id}`, "card")
         document.querySelector(`#tr${element.id}`).appendChild(div)

         for(let i = 0; i < classes.length; i++) {
            let num = i + 1
            let div= createElement('div', `div${num}${element.id}`, classes[i])
            document.querySelector(`#div${i}${element.id}`).appendChild(div)
         }

            let a = createElement('a', `#a${element.id}${element.user_id}`, "postMaker")
            a.href ="#"
            a.innerText = element.username
            document.querySelector(`#div5${element.id}`).appendChild(a)
            let div6 = createElement('div', `#div6${element.id}`, "date")
            div6.innerText = `${date} ${time}`
            document.querySelector(`#div5${element.id}`).append(div6)
            let div7 = createElement('div', `#div7${element.id}`, "email-body-div")
            document.querySelector(`#div2${element.id}`).append(div7)
            let textarea= createElement("textarea", `#text7${element.id}`, "form-control")
            textarea.disabled = true
            textarea.style.backgroundColor = "white";
            textarea.value = element.body
            div7.appendChild(textarea)
            let div8 = createElement('div', `#div8${element.id}`, "email-attachments")
            div7.append(div8)
            let currentUser = document.querySelector('#my_profile').innerText
            let button = createElement("button", `#btn${element.id}`, "btn btn-success")
            button.innerText = `Like: ${element.like_count}`
            if (element.username == currentUser) {
                button.className = "btn btn-warning"
                button.innerText = "Edit"
            }
            div8.appendChild(button)
            let break2 = document.createElement('br')
            tr.append(break2)

        });


}

function post_display(data){






}


function createElement(ele, id, classname) {
    const element = document.createElement(ele);
    element.id = id
    element.className = classname

    return element
}


