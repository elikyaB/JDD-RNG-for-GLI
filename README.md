# Jogo Do Dado PRNG for GLI
## Dependencies
- node v16.17.0
- npm v9.8.1

## Description
The client seed, which is unique to us, is paired with a server seed utilizing SHA-256, both using hex string encoding. The crash point for each game is then created from the hash of the two seeds, before being chunked into bits and operated on to return an integer, the maximum allowable one being 10000. This returned integer is divided by 100 to achieve the maximum winning crashpoint of 100.

## Documentation
- [Node Crypto](https://nodejs.org/api/crypto.html)
- [Open SSL's implementation of SHA256](https://www.openssl.org/docs/man1.1.1/man3/SHA256.html)

## Getting Started
Download the repo, then run `npm run start`.