import { jogoDoDadoRNG } from "./rng.js";

let numberOfTests = 100000
let resultArray = []

for (let i=0; i<numberOfTests; i++) {
  resultArray.push(jogoDoDadoRNG())
}

console.log(resultArray)