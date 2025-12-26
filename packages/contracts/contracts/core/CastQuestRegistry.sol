// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Errors} from "../libs/Errors.sol";

contract CastQuestRegistry {
    address public owner;
    mapping(bytes32 => address) private _modules;

    constructor(address _owner) {
        require(_owner != address(0), Errors.ZeroAddress);
        owner = _owner;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, Errors.NotAuthorized);
        _;
    }

    function registerModule(bytes32 kind, address module) external onlyOwner {
        require(module != address(0), Errors.ZeroAddress);
        _modules[kind] = module;
    }

    function getModule(bytes32 kind) external view returns (address) {
        return _modules[kind];
    }
}
