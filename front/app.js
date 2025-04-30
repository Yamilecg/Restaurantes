document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('reservaModal');
    const closeModal = document.querySelector('.close');
    const reservarBtns = document.querySelectorAll('.reservar-btn');

    reservarBtns.forEach((btn) => {
        btn.classList.remove('hidden');
        btn.addEventListener('click', () => {
            modal.style.display = 'block';   
        });
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';  
    });

    // Cerrar modal si se hace clic fuera de él
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
