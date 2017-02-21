pragma solidity ^0.4.4;
//@todo getters and setters and reducing memory footprint
//@todo weighting and percentage pay out
//@todo set minimum for contract reserver (band war chest)

contract BandPaid {

  struct BandMember {
    //@todo change to bytes32
    string name;
    string link;
    address addr;
    int8 weight;
    bool status;
    uint maxWithdrawal;
    uint balance;
  }

  mapping(address => BandMember) public members;
  address public owner;
  mapping (int8 => address) public membersIndex;
  int8 public memberCount;

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

  modifier isOwner() {
      if (msg.sender != owner) throw;
      _;
  }

  modifier isBandMember() {
    if (members[msg.sender].status != true) throw;
    _;
  }

  function deposit() payable returns (bool) {
    if (msg.value == 0) throw;
      NewPayment(msg.sender, "Sold a track");
      return true;
  }

  function forwardPayment(address payee) payable returns (bool sent) {
    //fwd balance to payee
  }

  function payBand() payable isOwner returns (bool) {

      for (int8 i=0;i<memberCount;i++) {
        /*membersIndex[i].call.value(3000000).gas(500000);*/
        address payee = membersIndex[i];
        if (payee.send(2 ether)) {
          NewWithdrawl(payee, "Paid out");
        }
          NewWithdrawl(payee, "Failed");
      }
  }

  function getMemberAtIndex(int8 i) constant returns (address) {
    return membersIndex[i];
  }

  function getMemberBalance(address _member) constant returns (uint) {
    return members[_member].balance;
  }

  function getContractBalance() returns (uint) {
    return this.balance;
  }

  function addMember(address _member) isOwner returns (bool) {

      members[_member].status = true;
      membersIndex[memberCount] = _member;
      memberCount++;

      AddMember(msg.sender, "Added band member");
      return true;
  }

  function removeMember(address _member) isOwner returns (bool removed) {
      members[_member].status = false;
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
