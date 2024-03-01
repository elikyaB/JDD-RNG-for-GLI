# Jogo Do Dado PRNG for GLI
## Dependencies
- node v16.17.0
- npm v9.8.1

## Getting Started
Clone the repo, then use `npm run start` to run a sample number of games. 

Feel free to change the `numberOfTests` variable in `index.js` for benchmarking purposes, but leave `rng.js` untouched to preserve accuracy with our setup.

## Crash Game Description
Crash games work by keeping the generated crash point hidden from the players and allowing them to choose what number they think will be equal to lower than the upcoming crash point. If they guess successfully, their earnings are multiplied by what they guessed. Players are allowed to choose any decimal to the hundredth place between 1.01 and 100.00, since 1.00 is the house's hold rate and the lowest starting point for the game.

## PRNG Implementation
The client seed, which is unique to us, is paired with a fresh server seed utilizing SHA-256, both using hex string encoding. The crash point for each game is then created from the hash of the two seeds, before being chunked into bits and operated on to return an integer, the maximum allowable one being 10000. This returned integer is divided by 100 to achieve the maximum winning crash point of 100.00. There is a mod parameter which controls the frequency with which a crashpoint of 1.00 is returned, which serves as the house hold rate.

## Documentation
- [Node Crypto](https://nodejs.org/api/crypto.html)
- [Open SSL's implementation of SHA256](https://www.openssl.org/docs/man1.1.1/man3/SHA256.html)