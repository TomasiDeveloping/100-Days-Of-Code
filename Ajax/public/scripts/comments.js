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
    const response = await fetch(`/posts/${postId}/comments`);
    const responseData = await response.json();

    const commentListElement = createCommentsList(responseData);
    commentsSectionElement.innerHTML = '';
    commentsSectionElement.appendChild(commentListElement);
}

function saveComment(event) {
    event.preventDefault();
    const postId = commentsFormElement.dataset.postid;

    const entredTitle = commentTitleElement.value;
    const entredText = commentTextElement.value; 

    const comment = {title: entredTitle, text: entredText};

    fetch(`/posts/${postId}/comments`, {
        method: 'POST',
        body: JSON.stringify(comment),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

loadCommentsBtnElement.addEventListener('click', fetschCommentsForPost);
commentsFormElement.addEventListener('submit', saveComment);