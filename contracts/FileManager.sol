// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.5.0 <0.6.0;
pragma experimental ABIEncoderV2;

contract FileManager {
  struct File {
    string fileName;
    string fileType;
    string cid;
  }
  mapping(address => File[]) files;

  function addFile(string[] memory _fileInfo, string  memory _cid) public {
    files[msg.sender].push(File(_fileInfo[0], _fileInfo[1], _cid));
  }

  function getFiles(address _account) public  view  returns (File[] memory) {
    return files[_account];
  }
}