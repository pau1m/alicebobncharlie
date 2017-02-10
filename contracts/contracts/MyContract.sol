pragma solidity ^0.4.4;
/// @title bandPaid
/// @author p0mm3r

//import mortal so we can kill
//@todo fire event
//@todo forward transaction to an intial wallet
//@todo terminate contract
//@? how do we iterate over members of the array to send?

//am i thinking about this back to front. Not about contract be called
//but the sender creating a contract?

contract MyContract {

  address public owner;
//  address public member;
//  mapping (address => uint) members;

  // + msg component?
  event LogDepositMade(address accountAddress, uint amount);

  function MyContract() {
    owner = msg.sender;
  //  members = ?
  }

  /*function splitFunds(uint divideBy, uint amount) returns (uint) {
    return (amount / divideBy);
    //maybe should be less so we can keep somestuff back for the contract to manage itself.
  }*/

  function deposit() payable {
        if (msg.value > 0) {
            if (!owner.send(msg.value)) throw; // reverts the transfer.
            LogDepositMade(owner, msg.value);
        }
  }

  function () {
      throw; // throw reverts state to before call
  }
  //address[] internal members;
  //members.length
}
