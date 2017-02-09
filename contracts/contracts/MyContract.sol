pragma solidity ^0.4.4;



contract MyContract {

  function MyContract() {
    mapping (address => uint) bandMembers;
    address public bandWarChest
  }

  // hmmmm, how do we treat this as an array?
  function splitFunds(address bandMembers, uint amount) {
    // should this be a libray function
    //send to each member in the band
    //send to bandWarchest
  }

  //some kind of event to trigger a link in the app to d/l
  //how do we control triggering and

}
