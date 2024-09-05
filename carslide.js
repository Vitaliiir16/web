function animateCar() {
    const car = document.querySelector('.car');
    car.classList.add('animating');

    car.addEventListener('animationend', () => {
        car.classList.remove('animating');
        car.style.transform = 'translateX(-100%)';
        setTimeout(() => {
            car.style.transform = 'translateX(0)';
        }, 0);
    }, { once: true });
}
