pragma solidity ^0.4.4;

/*library BandPaidUtil {
  function splitTransaction(amount, num) {
    return amount /
  }
}*/

contract BandPaid {

  address public owner;
  mapping(address => uint) public members;
  uint memberCount;

  function BandPaid() {
    owner = msg.sender;
  }

  function forwardPayment() payable returns (bool sent) {
    //iterate over each of the balances
  }

  function addMember(address _member) {
    if (msg.sender != owner) {
      throw; // whats the difference for sender between throw and empty return
    } else {
      members[_member] = 1; //maybe set a timestamp -- used to calc?

      memberCount = memberCount + 1;
    }
  }

  function removeMember(address _member) {
    if (msg.sender != owner) { //@todo create modifier for DRYness
      throw; // whats the difference for sender between throw and empty return
    } else {
      members[_member] = 0;
      memberCount = memberCount - 1;
    }
  }

  function numMembers() constant returns  (uint memberSize) {
    return memberCount;
  }

  //might want to factor out iteration
  /*function iterateMembers(){
    for(uint i=0;i<memberCount;i++)
    {
        doSomeStuff(members[i]);
    }
    }*/
}
