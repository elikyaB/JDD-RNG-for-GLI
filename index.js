import { jogoDoDadoRNG } from "./rng.js";

let numberOfTests = 2500000

let startDate = Date.now()
let buckets = {
  "1": 0,
  "<2": 0,
  "<10": 0,
  "<20": 0,
  "<30": 0,
  "<40": 0,
  "<50": 0,
  "<60": 0,
  "<70": 0,
  "<80": 0,
  "<90": 0,
  "<100": 0,
  "100": 0
}
for (let i=0; i<numberOfTests; i++) {
  const result = jogoDoDadoRNG()
  if (result == 1) {buckets["1"]++}
  else if (result < 2) {buckets["<2"]++}
  else if (result < 10) {buckets["<10"]++}  
  else if (result < 20) {buckets["<20"]++}
  else if (result < 30) {buckets["<30"]++}  
  else if (result < 40) {buckets["<40"]++}
  else if (result < 50) {buckets["<50"]++}  
  else if (result < 60) {buckets["<60"]++}
  else if (result < 70) {buckets["<70"]++}  
  else if (result < 80) {buckets["<80"]++}
  else if (result < 90) {buckets["<90"]++}  
  else if (result < 100) {buckets["<100"]++}
  else {buckets["100"]++}
}

for (let k of Object.keys(buckets)) {
  buckets[k] = buckets[k]/numberOfTests*100
}

console.log(buckets)
console.log(Date.now()-startDate)
