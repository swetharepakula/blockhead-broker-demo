pragma solidity ^0.4.16;

contract Poll {
    uint public proposalA;
    uint public proposalB;

    constructor() public {
        proposalA = 0;
        proposalB = 0;
    }

    function voteA() public{
      proposalA +=1;
    }
    function voteB() public{
      proposalB +=1;
    }
}
