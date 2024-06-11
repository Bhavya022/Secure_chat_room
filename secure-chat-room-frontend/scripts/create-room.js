document.addEventListener('DOMContentLoaded', () => {
    const homeLink = document.getElementById('home-link');
    const createRoomForm = document.getElementById('create-room-form');

    homeLink.addEventListener('click', () => {
        window.location.href = 'dashboard.html'; // Redirect to the dashboard page
    });

    createRoomForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const roomId = document.getElementById('room-id').value;
        const primeMember = document.getElementById('prime-member').value;
        const participants = document.getElementById('participants').value.split(',').map(participant => participant.trim());
        const maxCapacity = parseInt(document.getElementById('max-capacity').value);

        try {
            // Send create room request to the server
            const response = await fetch('http://localhost:5000/api/chatrooms/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ roomId, primeMember, participants, maxCapacity })
            });

            const data = await response.json();
            console.log(data); // Handle response from the server accordingly
            alert(data.message)
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
