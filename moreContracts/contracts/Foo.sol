pragma solidity ^0.4.4;

contract Foo {

  uint number = 2;

  function Foo() {
  }

  function getNumber() constant returns (uint number) {
    return number;
  }
}
