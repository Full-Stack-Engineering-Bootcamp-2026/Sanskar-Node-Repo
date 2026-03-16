//1]Variables and template literals
const userName = "Sanskar";
const age = 23;
const hobby = "Gaming";
console.log(`Hi, I'm ${userName}, I'm ${age} years old and I love ${hobby}`);

// 2]Arrow Functions
const square = (n) => n * n;
const isEven = (n) => n % 2 == 0;
console.log(square(10)); //100
console.log(isEven(5)); //false

// 3]Arrays
const fruits = ["Grapes", "Mango", "Watermelon", "Orange", "Apple"];
const [fruit1,fruit2] = fruits; //Grapes,Mango
console.log(fruit2);

console.log(fruits.map(fruit => fruit.toUpperCase()));
console.log(fruits.filter(fruit => fruit.length > 5));

// 4]Objects
const student = {
    name: "Student 1",
    age: 23,
    year: 4,
};
console.log(student.name); //Student 1
console.log(student.age); //23
console.log(student.year); //4