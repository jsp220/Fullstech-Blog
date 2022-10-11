const newCommentHandler = async (event) => {
    event.preventDefault();

    const body = document.querySelector('#comment-body').value;

    const URL = document.URL;

    if (body) {
        const response = await fetch('../api/comment', {
            method: 'POST',
            body: JSON.stringify({ body, postId: URL.slice(URL.lastIndexOf('/')+1)}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    } 
}

document.querySelector('.new-comment-form').addEventListener("submit", newCommentHandler);