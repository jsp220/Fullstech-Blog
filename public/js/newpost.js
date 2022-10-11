const newPostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;

    if (title) {
        const response = await fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({title, body}),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    } 
}

document.querySelector('.new-post-form').addEventListener("submit", newPostHandler);