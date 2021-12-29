const { response } = require("express");

const loadCommentsBtnElement = document.getElementById('load-comments-btn');
const commentsSectionElement = document.getElementById('comments');
const commentsFormElement = document.querySelector('#comments-form form');
const commentTitleElement = document.getElementById('title');
const commentTextElement = document.getElementById('text');

function createCommentsList(comments) {
    const commentListElement = document.createElement('ol');

    for (const comment of comments) {
        const commentElement = document.createElement('li');
        commentElement.innerHTML = `
        <article class="comment-item">
        <h2>${comment.title}</h2>
        <p>${comment.text}</p>
        </article>
        `;

        commentListElement.appendChild(commentElement);
    }

    return commentListElement;
}

async function fetschCommentsForPost() {
    const postId = loadCommentsBtnElement.dataset.postid;
    try {
        const response = await fetch(`/posts/${postId}/comments`);

        if (!response.ok) {
            alert('Fetching comments failed!');
            return;
        }
    
        const responseData = await response.json();
    
        if (responseData && responseData.length > 0) {
            
        const commentListElement = createCommentsList(responseData);
        commentsSectionElement.innerHTML = '';
        commentsSectionElement.appendChild(commentListElement);
        } else {
            commentsSectionElement.firstElementChild.textContent = 'We could not find any comments. Maybe add one?';
        }
    } catch(error) {
        alert('Getting comments failed!');
    }

}

async function saveComment(event) {
    event.preventDefault();
    const postId = commentsFormElement.dataset.postid;

    const entredTitle = commentTitleElement.value;
    const entredText = commentTextElement.value; 

    const comment = {title: entredTitle, text: entredText};

    try {
        const respone = await fetch(`/posts/${postId}/comments`, {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        });
    
        if (response.ok) {
            fetschCommentsForPost();
        } else {
            alert('Could not send comment!');
        }
    } catch (error) {
        alert('Could not send request - maybe try it later');
    }

}

loadCommentsBtnElement.addEventListener('click', fetschCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);