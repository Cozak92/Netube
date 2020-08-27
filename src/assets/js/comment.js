import axios from "axios";

const addCommentForm = document.getElementById('jsAddComment');
const commentList = document.getElementById('jsCommentList');
const commentNumber = document.getElementById('jsCommentNumber');
const addCommentButton = document.getElementById('jsAddCommentButton');

const removeCommentButton = document.querySelectorAll('.fa-times');

const increaseNumbet = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
}
const sendComment = async (comment) => {
    let videoId = window.location.href.split("/videos/")[1];
    videoId = videoId.replace('?','');
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method:'post', 
        data: {
            comment
        }
    });
    if (response.status === 200) {
        addComment(comment, response.data.commentId);
        
    }
}

const removeComment = async (element) => {
    let videoId = window.location.href.split("/videos/")[1];
    videoId = videoId.replace('?','');
    const response = await axios({
        url: `/api/${videoId}/comment/remove`,
        method:'post', 
        data: {
            commentId: element.id
        }
    });
    if (response.status === 200) {
        element.remove();
        commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) - 1;
    }
    else{
        console.log(error)
    }
}

const handleSubmit = (event) => {
    event.preventDefault(); //새로고침 방지
    const commentInput = addCommentForm.querySelector('input');
    const comment = commentInput.value;
    
    sendComment(comment);

    commentInput.value = "";
}

// const handleCommentButton = () => {
//     console.log(addCommentForm.submit);
//     // addCommentForm.submit();
// }
const handleRemoveComment = (event) => {
    console.log(event.path[1].id, this)
    removeComment(event.path[1]);
}

const addComment = (comment, commentId) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const i = document.createElement("i");

    li.setAttribute("id", commentId);

    div.classList.add("video__comment-box");
    i.classList.add("fas");
    i.classList.add("fa-times");
    span.innerHTML = comment;
    div.append(span);
    li.append(div);
    li.append(i);
    
    // commentList.append(li);
    commentList.prepend(li);
    li.addEventListener("click", handleRemoveComment);
    increaseNumbet();
}


const init = () => {
    addCommentForm.addEventListener("submit", handleSubmit);
    addCommentButton.addEventListener("click", handleSubmit);

    removeCommentButton.forEach((element) => {
        element.addEventListener("click", handleRemoveComment);
    });
}

if (addCommentForm) {
    init();
}