pragma solidity ^0.4.4;

contract BandPaid {

  address public owner;
  mapping(address => uint) public members;
  uint public memberCount;
  uint balance;

  function BandPaid() {
    owner = msg.sender;
    memberCount = 0;
  }

  event AddMember(address indexed sender, bytes32 msg);
  event NewPayment(address indexed sender, bytes32 msg);
  event NewWithdrawl(address indexed sender, bytes32 msg);
  event ContractDestroyed(bytes32 msg);

  function getOwner() returns (address) {
    return owner;
  }

  function forwardPayment(address payee) payable returns (bool sent) {
    //fwd balance to payee
  }

  function withdraw() payable returns (bool) {
    // If account exists and can payout
    if (members[msg.sender] >= 0) {
      // send ether to thels


      NewWithdrawl(msg.sender, "Paid out");
      return true;
    } else {
      throw; //either no balance or sender is not
    }
  }

  function addMember(address _member) returns (bool) {
    if (msg.sender != owner) {
      throw;
    } else {
      members[_member] = 0;
      memberCount = (memberCount + 1);

      AddMember(msg.sender, "Added band member");
      return true;
    }
  }

  function removeMember(address _member) returns (bool) {
    if (msg.sender != owner) { //@todo create modifier for owner
      throw;
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
    if (msg.sender == owner) {
      ContractDestroyed("Bye Bye!");
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
