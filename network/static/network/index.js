document.addEventListener('DOMContentLoaded', function () {

    // Use buttons to toggle between views

    document.querySelector('#submit').addEventListener('click', () => create_post());
    let currentUser = document.querySelector('#my_profile').innerText
    let links = document.getElementsByClassName('postMaker')
    console.log(currentUser)
    Array.from(links).forEach(element => {
        if (element.innerText == currentUser){
            element.innerText = "Me"
            element.href="personal_profile"
        }
        //element.addEventListener('click', () => user_profile(element.innerText))
        });

    // Turn buttons into EDIT if the same user created them grab them by data-index
    const editButtons = document.querySelectorAll(`[data-index=${currentUser}]`);
    console.log(editButtons)
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



//function makePost(data, attach){
//
//    let classes1 = [
//       "card",
//       "card-body",
//       "row",
//       "col-lg-3 email-aside border-lg-right",
//       "aside-content",
//       "aside-header"
//     ]
//
//    let content = [
//        data.body,
//        data.id,
//        data.like_count,
//        data.timestamp,
//        data.user_id,
//        data.username
//     ]
//
//    var elementID = document.getElementById(`name${data.id}`);
//
//    if (typeof (elementID) != 'undefined' && elementID != null) {
//
//                        elementID.remove()
//                }
//
//    let nameID = `name${email.id}`
//    let element = createElement("tr", nameID, email.read);
//    document.querySelector(attach).append(element);
//    let divId = `div${email.id}`
//    let div =
//    for (let i=0; i < classes1.length; i++) {
//
//        var divId = `${email.id}-${i}`
//
//
//
//    }
//}
//
//function createElement(ele, id, classname, att) {
//    const element = document.createElement(ele);
//    element.id = id
//    element.setAttribute('data-index', att)
//
//    if (bool == false) {
//        element.style.backgroundColor = '#E6E6E3'
//    }
//    return element
//}