document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userId = document.getElementById('userId').value;
        const password = document.getElementById('login-password').value;
      console.log(userId,password)
        try {
            
            const response = await fetch('https://secure-chat-room-backend.onrender.com/api/auth/login', {
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

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const userId = document.getElementById('myUserId').value;
        //console.log(userId)
        const deviceId = document.getElementById('deviceId').value;
        const name = document.getElementById('name').value;
        const password = document.getElementById('password').value;
        const phone = document.getElementById('phone').value;
        const availCoins = document.getElementById('availCoins').value;
           //console.log(userId,deviceId,name,password,phone,availCoins)
        try {
            console.log(userId,deviceId,name,password,phone,availCoins)
            // Send register request to the server
            const response = await fetch('https://secure-chat-room-backend.onrender.com/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({userId,deviceId,name,password,phone,availCoins})
            });

            const data = await response.json();
            console.log(data); 
            if(data){
                alert(data.message)
            } 
        } catch (error) {
            console.error('Error:', error);
        }
    });
});
