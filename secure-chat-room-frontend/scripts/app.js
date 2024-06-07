document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    // Event listener for login form submission
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value;
        const password = document.getElementById('login-password').value;
      console.log(userId,password)
        try {
            // Send login request to the server
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, password })
            });

            const data = await response.json();
            console.log(data); 
            if (response.ok) {
                window.location.href = 'dashboard.html'; 
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Event listener for register form submission
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('userId').value;
        const deviceIdId = document.getElementById('deviceId').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const availCoins = document.getElementById('availCoins').value;

        try {
            // Send register request to the server
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, userId, password, phone, availCoins })
            });

            const data = await response.json();
            console.log(data); // Handle response from the server accordingly
            if(data){
                alert(data.message)
            } 
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
