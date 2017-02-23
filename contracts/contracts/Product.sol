pragma solidity ^0.4.4;

// Phase 1.
// Simple constructor
// Emmitting messages / Events
// Discuss scoping
// payable keyword
// core properties available eg msg.sender, msg.value

// Phase 2.
// Constructor passing values
// Passing arguments
// modifiers
// getter and setters
// incorporating web3 for testing


//phaseX / notes
//throw
//should we deal with events in first or second part
//use of return values in payment
//@todo contract front end a button
//web3 bundled and minified
//use testnet to deploy cutting and pasting
//Add app via ipfs

contract Product {

  // The payee and manager of the contract
  address public owner;

  // Define a new event we can emit in a function.
  event NewPayment(address indexed sender, bytes32 msg);

  // Constructor.
  function Product() {

    // Assign the contract creator as owner of the contract
    owner = msg.sender;
  }

  function deposit() payable {
    if (owner.send(msg.value)) {
      NewPayment(msg.sender, "Fire event.");
    } else {
      throw;
    }
  }

  function() payable {
    if (owner.send(msg.value)) {
      NewPayment(msg.sender, "Ooh, where did that come from.");
    } else {
      throw;
    }
  }

}
