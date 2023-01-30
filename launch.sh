#!/bin/bash
truffle migrate
cp build/contracts/PaperManagement.json client/src/
cd client
npm i
npm start
