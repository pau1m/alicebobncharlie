brew tap ethereum/ethereum
brew install ethereum
geth --fast --cache=2048 --jitvm
geth --rpc

npm install
node index.js
