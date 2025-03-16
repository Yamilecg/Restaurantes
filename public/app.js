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
    const usuarioAutenticado = localStorage.getItem('usuarioAutenticado');

    // Mostrar/ocultar elementos según el estado de autenticación
    if (usuarioAutenticado) {
        reservarBtns.forEach(btn => btn.classList.remove('hidden'));
        reservasLink.classList.remove('hidden'); 
        authBtn.textContent = 'Cerrar Sesión';
    }

    // Abrir modal de autenticación
    authBtn.addEventListener('click', () => {
        if (usuarioAutenticado) {
            // Cerrar sesión
            localStorage.removeItem('usuarioAutenticado');
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

    // Simular inicio de sesión
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('usuarioAutenticado', 'true');
        window.location.reload(); // Recargar la página
    });

    // Simular registro
    registroForm.addEventListener('submit', (e) => {
        e.preventDefault();
        localStorage.setItem('usuarioAutenticado', 'true');
        window.location.reload(); // Recargar la página
    });

    // Abrir modal de reservas
    reservarBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            reservaModal.style.display = 'flex';
        });
    });

    // Manejar el envío del formulario de reservas
    reservaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fecha = document.getElementById('fecha').value;
        const hora = document.getElementById('hora').value;
        const numPersonas = document.getElementById('numPersonas').value;

        alert(`Reserva confirmada para ${fecha} a las ${hora} para ${numPersonas} personas.`);
        reservaModal.style.display = 'none';
        reservaForm.reset();
    });
});