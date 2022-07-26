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
    //document.querySelector('#post-view').style.display = 'block';
    document.querySelector('#profile_view').style.display = 'block';
    let card = document.getElementsByClassName('card')

    Array.from(card).forEach(element => {
         console.log(element)
        console.log(element.dataset.name)

        });

   console.log(name)
//
//    fetch(`profile/${name}`)
//        .then(response => response.json())
//        .then(data => {
//
//            console.log(data)
//        });
}

