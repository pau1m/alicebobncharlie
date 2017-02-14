pragma solidity ^0.4.4;

contract BandPaid {

  address public owner;
  mapping(address => uint) public members;
  uint memberCount;
  uint balance;

  function BandPaid() {
    owner = msg.sender;
    memberCount = 0;
  }

  function forwardPayment() payable returns (bool sent) {
    //iterate over each of the balances
  }

  function addMember(address _member) returns (bool){
    if (msg.sender != owner) {
      throw;
    } else {
      members[_member] = 1;
      memberCount = memberCount + 1;
      return true;
    }
  }

  function removeMember(address _member) returns (bool) {
    if (msg.sender != owner) { //@todo create modifier for DRYness
      throw; // whats the difference for sender between throw and empty return
    } else {
      members[_member] = 0;
      memberCount = memberCount - 1;
      return true;
    }
  }

  function numMembers() constant returns (uint) {
    return memberCount;
  }

  function destroy() {
    if (msg.sender != owner) {
      // kill the contract and send funds to creator.
      selfdestruct(owner);
    }
  }

  //get list of all members

  /*function payActiveMembers() {
    uint i = 0;
    for (i;i<memberCount;i++) {
      doSomeStuff(accountBalances[accountIndex[i]]);
    }
  }*/

  //might want to factor out iteration
  /*function iterateMembers(){
    for(uint i=0;i<memberCount;i++)
    {
        doSomeStuff(members[i]);
    }
    }*/
}
