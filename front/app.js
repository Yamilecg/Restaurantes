document.addEventListener('DOMContentLoaded', () => {
    const authModal = document.getElementById('authModal');
    const reservaModal = document.getElementById('reservaModal');
    const authBtn = document.getElementById('authBtn');
    const reservasLink = document.querySelector('.reservas-link');
    const closeBtns = document.querySelectorAll('.close');
    const reservarBtns = document.querySelectorAll('.reservar-btn');
    const reservaForm = document.getElementById('reservaForm');
    const loginForm = document.getElementById('loginForm');
    const registroLink = document.getElementById('registroLink');
    const registroForm = document.getElementById('registroForm');

    // Verificar si el usuario está autenticado
    const token = localStorage.getItem('token');

    // Mostrar/ocultar elementos según el estado de autenticación
    if (token) {
        reservarBtns.forEach(btn => btn.classList.remove('hidden'));
        reservasLink.classList.remove('hidden');
        authBtn.textContent = 'Cerrar Sesión';
    }

    // Abrir modal de autenticación
    authBtn.addEventListener('click', () => {
        if (token) {
            // Cerrar sesión
            localStorage.removeItem('token');
            localStorage.removeItem('nombreUsuario');
            localStorage.removeItem('contactoUsuario');
            window.location.reload(); // Recargar la página
        } else {
            authModal.style.display = 'flex';
        }
    });

    // Cerrar modales al hacer clic en la "X"
    closeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            authModal.style.display = 'none';
            reservaModal.style.display = 'none';
        });
    });

    // Cerrar modales al hacer clic fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target === authModal || e.target === reservaModal) {
            authModal.style.display = 'none';
            reservaModal.style.display = 'none';
        }
    });

    // Mostrar formulario de registro
    registroLink.addEventListener('click', (e) => {
        e.preventDefault();
        registroForm.classList.remove('hidden');
    });

    // Manejar inicio de sesión
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('token', data.token); // Guardar el token
                localStorage.setItem('nombreUsuario', data.nombre); // Guardar el nombre del usuario
                localStorage.setItem('contactoUsuario', data.contacto); // Guardar el contacto del usuario
                window.location.reload(); // Recargar la página
            } else {
                alert('Error al iniciar sesión');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Manejar registro
    registroForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('emailRegistro').value;
        const password = document.getElementById('passwordRegistro').value;

        try {
            const response = await fetch('http://localhost:3000/registro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, email, password })
            });

            if (response.ok) {
                alert('Registro exitoso. Inicia sesión.');
                registroForm.classList.add('hidden');
            } else {
                alert('Error al registrarse');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });

    // Abrir modal de reservas
    reservarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            reservaModal.style.display = 'flex';
        });
    });

    // Manejar el envío del formulario de reservas
    reservaForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const reserva = {
            fecha: document.getElementById('fecha').value,
            hora: document.getElementById('hora').value,
            numPersonas: document.getElementById('numPersonas').value,
            nombreCliente: localStorage.getItem('nombreUsuario'), // Obtener el nombre del usuario autenticado
            contacto: localStorage.getItem('contactoUsuario') // Obtener el contacto del usuario autenticado
        };

        try {
            const response = await fetch('http://localhost:3000/reservas', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}` // Enviar el token de autenticación
                },
                body: JSON.stringify(reserva)
            });

            if (response.ok) {
                alert('Reserva confirmada exitosamente');
                reservaModal.style.display = 'none';
                reservaForm.reset();
            } else {
                alert('Error al confirmar la reserva');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    });
});