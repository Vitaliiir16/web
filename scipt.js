function carSlide() {
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

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("burger").addEventListener("click", function () {
        document.querySelector(".header").classList.toggle("open");
    });
});

const combineFunctions = (...funcs) => {
    return (x) => {
        let result = x;
        
        // Проходимо функції у прямому порядку
        for (let func of funcs) {
            result = func(result);
        }
        
        return result; // Повертаємо фінальний результат
    };
};

// Тестові приклади
console.log(combineFunctions(x => x + 5)(3));  // Очікуваний результат: 8
console.log(combineFunctions(x => x + x, x => x - 1, x => x !== 0)(5));  // Очікуваний результат: true
console.log(combineFunctions(x => x + x, x => x - 1, x => -x, x => 'Hello, ' + x)(5));  // Очікуваний результат: "Hello, -9"

