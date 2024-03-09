function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Send login credentials to server
    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Redirect to success page
            window.location.href = '/success';
        } else {
            alert('Invalid username or password');
        }
    })
    .catch(error => console.error('Error:', error));
}
