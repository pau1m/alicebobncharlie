pragma solidity ^0.4.4;

contract BandPaid {

  address public owner;
  mapping (int8 => address) public membersIndex;
  mapping(address => uint) public members;
  int8 public memberCount;
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

  function deposit() payable returns (bool) {
    if (msg.value != 0) {
      balance = balance + msg.value;
      NewPayment(msg.sender, "Sold a track");
      return true;
    } else {
      throw;
    }
  }

  function forwardPayment(address payee) payable returns (bool sent) {
    //fwd balance to payee
  }

  function payBand() returns (bool) {
    int8 i=0;
    // If the request comes from a band member.
    if (msg.sender == owner) {
      for (i;i<memberCount;i++) {
        membersIndex[i].call.value(this.balance / 5).gas(50000);
        balance = balance - (balance / 10);
        NewWithdrawl(msg.sender, "Paid out");
      }
      //NewWithdrawl(msg.sender, "Paid out");
      return true;
    } else {
      return false;
      /*throw; //either no balance or sender is not*/
    }
  }
  //could use address[] internal members;
  /*function withdraw(address addr) payable returns (bool) {
    // If account exists and can payout
    if (members[msg.sender] >= 0) {

      int8 i = 0;
      for (i;i<memberCount;i++) {
        //treat the contract as a member.
        //members[membersIndex[i]].send(this.balance / memberCount +1);
      }
      // send ether to thels
      NewWithdrawl(msg.sender, "Paid out");
      // keep back one ether for account management
      // withdrawAmount = (balance / (memberCount) - 1)
      return true;
    } else {
      throw; //either no balance or sender is not
    }
  }*/

  function getMemberAtIndex(int8 i) constant returns (address) {
    return membersIndex[i];
  }

  function getMemberBalance(address _member) constant returns(uint) {
    return members[_member];
  }

  function getContractBalance() returns (uint) {
    return this.balance;
  }

  function addMember(address _member) returns (bool) {
    if (msg.sender != owner) {
      throw;
    } else {
      members[_member] = 0;
      membersIndex[memberCount] = _member;
      memberCount++;

      AddMember(msg.sender, "Added band member");
      return true;
    }
  }

  function removeMember(address _member) returns (bool removed) {
    if (msg.sender != owner) { //@todo create modifier for owner
      throw;
    } else {
      members[_member] = 0;
      // how do we unset this or set to some kind of null value?
      membersIndex[memberCount] = owner;
      memberCount --;
      return true;
    }
  }

  function numMembers() constant returns (int8) {
    return memberCount;
  }

  function destroy() {
    if (msg.sender == owner) {
      ContractDestroyed("Bye Bye!");
      selfdestruct(owner);
    }
  }
}
