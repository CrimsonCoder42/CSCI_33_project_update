document.addEventListener('DOMContentLoaded', function () {

    // Use buttons to toggle between views

    document.querySelector('#submit').addEventListener('click', () => create_post());
//    let currentUser = document.querySelector('#my_profile').innerText
//    let links = document.getElementsByClassName('postMaker')
//    Array.from(links).forEach(element => {
//        if (element.innerText == currentUser){
//            element.innerText = "Me"
//            element.href="personal_profile"
//        }
//        //element.addEventListener('click', () => user_profile(element.innerText))
//        });
//
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
    document.querySelector('#profile-view').style.display = 'none';


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