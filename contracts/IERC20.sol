// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

interface IERC20{
    function transfer(address recipient, uint256 amount) external returns (bool);
    function approve(address _spender, uint _value) external;
    function balanceOf(address who) external view returns(uint256 balance);
}