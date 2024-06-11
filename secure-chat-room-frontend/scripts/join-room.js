document.addEventListener('DOMContentLoaded', () => {
    const joinRoomForm = document.getElementById('join-room-form');
    const usernameDisplay = document.getElementById('username');

    // Retrieve the username from local storage or a global state
    const username = localStorage.getItem('username') || 'User';
    usernameDisplay.textContent = username;

    joinRoomForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const roomId = document.getElementById('roomId').value;
        const userId = document.getElementById('userId').value;

        // Check if userId is entered correctly
        if (!userId) {
            alert('Please enter your User ID.');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/JoinRoom/join', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, userId })
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                alert('Joined room successfully');
                // Redirect to the chat room or another page as necessary
                window.location.href = 'dashboard.html';
            } else {
                alert(`Failed to join room: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Logout function
    const logoutButton = document.getElementById('logout');
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId');
        // Redirect to the login page or handle logout
        window.location.href = 'index.html';
    });
});
