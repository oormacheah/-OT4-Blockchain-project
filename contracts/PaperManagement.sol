	// SPDX-License-Identifier: CC-BY-NC-SA-4.0

	pragma solidity ^0.8.17;

	// the Ether unit assumed for the contract is wei
	contract PaperManagement {
		struct paperInfo {
			uint256 id;
			string title;                // paper's name
			string author;               //paper's autor
			string keywords;          //paper's key words
			string ipfs_file;          // hash to IPFS file
			address[] owners;				//paper's owner
			uint256 value;				//paper's value
		}

		mapping (uint256 => paperInfo) papers; //papers collection
		uint256[] paperIds; 			// paper's id
		uint256 sumOfPapers;			// sum of all papers we have

		constructor () {
			sumOfPapers = 0; 
		}

		function buy(uint256 id) external payable {
			require(msg.value >= papers[id].value, 'The amount is too low!');
			
			/*
			* sends the requested paper
			* from this contract address
			* to the buyer
			*/
			papers[id].owners.push(msg.sender);
		}

		function registerPaper(string memory title, string memory author, string memory keywords, 
								string memory ipfs_file, uint256 value) public {
			require(findTitle(title) == false, "A paper with the same title was already uploaded");
			//we should check title and keywords here						
			uint256 id = sumOfPapers;						
			paperInfo storage newPaper = papers[id];
			newPaper.id = id;
			newPaper.title = title;
			newPaper.author = author;
			newPaper.keywords = keywords;
			newPaper.ipfs_file = ipfs_file;
			newPaper.owners.push(msg.sender);
			newPaper.value = value;
			paperIds.push(id);
			sumOfPapers= sumOfPapers + 1;
		}	
		
		function findTitle(string memory title) public view returns (bool) {
			bool found = false;
			for (uint i=0; i<paperIds.length; i++) {
				if (keccak256(abi.encodePacked((papers[i].title))) == keccak256(abi.encodePacked((title)))) {
					found = true;
					break;
			 	}
			}
			return found;
		}
		
		function getPaper_byId(uint256 id) public view returns (uint256, string memory, string memory, string memory, string memory, address[] memory, uint256){
			paperInfo storage s = papers[id];
			return (s.id, s.title, s.author, s.keywords, s.ipfs_file, s.owners, s.value);
		}

		function getPaperCID_byId(uint256 id) public view returns (string memory){
			paperInfo storage s = papers[id];
			return s.ipfs_file;
		}

		function getPaper_byTitle(string memory title) public view returns (uint256, string memory, string memory, string memory, string memory, address[] memory, uint256){
			uint paperId = paperIds.length;
			for (uint i=0; i<paperIds.length; i++) {
				if (keccak256(abi.encodePacked((papers[i].title))) == keccak256(abi.encodePacked((title)))){
					paperId = i;
					break;
				}
			}
			require(paperId != paperIds.length, "This title does not exist nowadays");
			paperInfo storage s = papers[paperId];
			return (s.id, s.title, s.author, s.keywords, s.ipfs_file, s.owners, s.value);
		}

		function getPaperIds_byAuthor(string memory author) public view returns (uint256[] memory, uint256){
			
			uint256[] memory ids = new uint256[](paperIds.length);
			uint256 count = 0;

			for (uint256 i=0; i<paperIds.length; i++){
				if (keccak256(abi.encodePacked((papers[i].author))) == keccak256(abi.encodePacked((author)))){
					ids[count] = i;
					count++;
				}
			 }
			require(count != 0, "This autor does not have papers nowadays");
			return (ids, count);
		}

		function getIds() public view returns (uint256[] memory) {
			uint256[] memory listOfIds = new uint256[](paperIds.length);
			for (uint i=0; i<paperIds.length; i++){
				listOfIds[i] = paperIds[i];
			}
			return listOfIds;
		}

		function getSumOfPapers() public view returns (uint){
			return sumOfPapers;
		}
		
	}