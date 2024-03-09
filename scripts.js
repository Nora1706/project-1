function login() {
    const username = document.getElementById('usernameInput').value;
    const password = document.getElementById('passwordInput').value;
    console.log(username, password, "hiiiiiii");

    // Send login credentials to server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: username, password: password })
    })
    .then(response => {
        if (response.ok) {
            // Redirect to success page or do something else
            console.log("success");
            window.location.href = '/dashboard.html';
        } else {
            // Handle non-200 status code
            alert('Invalid username or password');
        }
    })
    .catch(error => console.error('Error:', error));
}
