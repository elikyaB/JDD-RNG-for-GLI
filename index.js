import { jogoDoDadoRNG } from "./rng.js";

let numberOfTests = 250000

let startDate = Date.now()
let buckets = {
  "a": 0,
  "b": 0,
  "c": 0,
  "d": 0,
  "e": 0,
  "f": 0
}
for (let i=0; i<numberOfTests; i++) {
  const result = jogoDoDadoRNG()
  if (result == 100) {buckets["a"]++}
  else if (result < 200) {buckets["b"]++}
  else if (result < 1000) {buckets["c"]++}  
  else if (result < 5000) {buckets["d"]++}
  else if (result < 10000) {buckets["e"]++}
  else {buckets["f"]++}
}

for (let k of Object.keys(buckets)) {
  buckets[k] = buckets[k]/numberOfTests*100
}

console.log(buckets)
console.log(Date.now()-startDate)
