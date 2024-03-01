import { jogoDoDadoRNG } from "./rng.js";

let numberOfTests = 25000000
let resultArray = []

for (let i=0; i<numberOfTests; i++) {
  resultArray.push(jogoDoDadoRNG())
}

console.log(resultArray)