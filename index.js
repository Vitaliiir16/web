document.addEventListener('DOMContentLoaded', () => {
    displayTrees();
    calculateTotalPrice();
});

function greet(name, callback) {
    console.log('Hello ' + name);
    callback();
  }
  function sayGoodbye() {
    console.log('Goodbye!');
  }
  greet('John', sayGoodbye);

  const person = {
    name: 'Vitalii',
    age: 18,
    sex: 'Male',
    country: 'Ukr',
    city: 'Lviv'
};


const { name, age, ...rest } = person;

console.log(name);
console.log(age);
console.log(rest);