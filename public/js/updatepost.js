const updatePostHandler = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#post-title').value;
    const body = document.querySelector('#post-body').value;

    const URL = document.URL;
    apiURL = `/api/post/${URL.slice(URL.lastIndexOf('/')+1)}`
    
    console.log(apiURL);

    if (title) {
        const response = await fetch(apiURL, {
            method: 'PUT',
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

document.querySelector('.update-post-form').addEventListener("submit", updatePostHandler);