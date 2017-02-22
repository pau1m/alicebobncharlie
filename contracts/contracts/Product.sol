pragma solidity ^0.4.4;

// Phase 1.
// Simple constructor
// Passing arguments
// Emmitting messages

contract Product {

  /*struct recipient {
    int8 weight;
    address addr;
  }*/

  address[] public recipients;
  address public owner;

  event NewPayment(address indexed sender, bytes32 msg);

  // storage ??
  function Product(address[] _recipients/*, int[] weights*/) {
    owner = msg.sender;
    recipients = _recipients;
  }

  function getPayeeList() returns (address[]) {
    return recipients;
  }

  function deposit() payable {
    NewPayment(msg.sender, "someone bought our stuff 1");
    // recieve amount
  }
  // Auto-payout
  function() payable {

    // Check for payout
    NewPayment(msg.sender, "someone bought our stuff 2");



    //iterate and pay everybody --- do we have a .length
    //divide by number of members

    // fire event
  }
}
