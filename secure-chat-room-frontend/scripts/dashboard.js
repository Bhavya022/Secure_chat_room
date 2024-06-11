document.addEventListener('DOMContentLoaded', () => {
    // Event listener for the "Create Chat Room" button
    document.getElementById('create-room-button').addEventListener('click', () => {
        window.location.href = 'create-room.html'; // Redirect to the create room page
    });

    // Event listener for the "Join Chat Room" button
    document.getElementById('join-room-button').addEventListener('click', () => {
        window.location.href = 'join-room.html'; // Redirect to the join room page
    });

    // Event listener for the "Send Friend Request" button
    document.getElementById('send-friend-request-button').addEventListener('click', () => {
        window.location.href = 'send-friend-request.html'; 
    });

});
