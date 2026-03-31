/*console.log("Hello World")
console.log("This is my first node.js program")
alert(" Mitesh is learning a new coding language")*/
/*let name = 'Mitesh';
console.log(name);
let interestRate = 0.3
interestRate=1;
console.log(interestRate);
typeof interestRate;

let person={
    name:"Mosh",
    age: 30
};
person.name= "Mitesh";
console.log(person.age)

let selectedColours = ["red", "blue"];
console.log(selectedColours.length);


let name = "Mitesh";
let n=3
while(n>0){
    console.log(name, "likes javascript");
    n--;
}
console.log("End of the loop")

const prompt = require('prompt-sync')();
const name = prompt("What's your name?");
console.log('Hi',name,"!");
let age = prompt("What is your age?");
console.log("Entered age:",age); 
const prompt = require("prompt-sync")();
let age = prompt("What is your age?");
if (age>=18){console.log("You may enter this website");}
else{
    console.log("You are too young for this website");
}
*/
const prompt = require("prompt-sync")();
let n = parseInt(prompt("What is the n value?"));
let items=[];
for(let i=0;i<n;i++){
    let input =prompt();
    items.push(Number(input));
}

console.log("Your array output: ", items);