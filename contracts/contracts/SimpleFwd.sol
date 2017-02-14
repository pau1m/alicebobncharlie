pragma solidity ^0.4.4;

contract SimpleFwd {
    address public owner;
    /*address public recipient;*/

    function  SimpleFwd(/*address _recipient*/) {
        owner = msg.sender;
//        recipient = _recipient;
    }

    function getString() returns (string foo) {
      foo = "Hello world";
      return foo;
    }

    /*function withdraw() payable returns (bool) {
        if (recipient.send(msg.value)) {
            return true;
        } else {
            return false;
        }
    }*/
}
