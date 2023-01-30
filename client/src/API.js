import Web3 from 'web3';
import contractInfo from './PaperManagement.json';

const web3 = new Web3(Web3.givenProvider);
const contractAddress = contractInfo.networks['5777'].address;
const contractAbi = contractInfo.abi;
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const getActiveAddress = async () => {
	let accounts = await web3.eth.requestAccounts();
	let current_account = accounts[0];
	return current_account;
}

const uploadPaper = async (newPaper) => {
	let accounts = await web3.eth.requestAccounts();
	let account = accounts[0];

	// Check if paper is present (by title)
	if (await contract.methods.findTitle(newPaper.title).call()) {
		return false;
	}
	else {
		// Upload to IPFS and get hash
		await contract.methods.registerPaper(newPaper.title, newPaper.author, newPaper.keywords, 'aaa', newPaper.value).send({from: account});
		return true;
	}

	// await contract.methods.registerPaper(2, 'Blokchain', 'Alfred', 'machine-learning, report', 
	// 'science', 'https://google.com').send({from: account});
	// let ids = await contract.methods.getIds().call();
	// console.log(ids);

	// let hashIPFS = metodoparasubirIPFS

	// let paper = await contract.methods.getPaper_byTitle('Blokchain').call();
	// console.log(paper);
}

const findPapers = async (criterion, searchInput) => {
	let filteredPapers = [];
	let paperInfo;
	let paperIds;
	switch (criterion) {
		case 'title':
			// Input will be just a string
			// filteredPapers = [fakePapers.find((paper) => paper.title.toLowerCase() === searchInput.toLowerCase())];
			paperInfo = await contract.methods.getPaper_byTitle(searchInput).call();
			filteredPapers = [...filteredPapers,
				{
					id: paperInfo[0],
					title: paperInfo[1],
					author: paperInfo[2],
					keywords: paperInfo[3],
					file: paperInfo[4],
					owners: paperInfo[5],
					value: paperInfo[6],
				}
			]

			break;
		case 'author':
			// Input will be just a string
			// filteredPapers = [fakePapers.find((paper) => paper.author.toLowerCase() === searchInput.toLowerCase())];
			const response = await contract.methods.getPaperIds_byAuthor(searchInput).call();
			paperIds = response[0];
			const count = response[1];
			
			let id;
			for (let i=0; i<count; i++) {
				id = paperIds[i];
				paperInfo = await contract.methods.getPaper_byId(id).call();
				filteredPapers = [...filteredPapers, 
					{
						id: paperInfo[0],
						title: paperInfo[1],
						author: paperInfo[2],
						keywords: paperInfo[3],
						file: paperInfo[4],
						owners: paperInfo[5],
						value: paperInfo[6],
					}
				];
			}
			break;
		case 'keywords':
			const keywords = searchInput.split(", ");
			paperIds = await contract.methods.getIds().call();
			let papersArray = [];
			for (let id of paperIds) {
				paperInfo = await contract.methods.getPaper_byId(id).call();
				papersArray = [...papersArray, 
					{
						id: paperInfo[0],
						title: paperInfo[1],
						author: paperInfo[2],
						keywords: paperInfo[3],
						file: paperInfo[4],
						owners: paperInfo[5],
						value: paperInfo[6],
					}
				];
			}

			filteredPapers = papersArray.filter(paper => {
				let paperKeywords = paper.keywords.split(", ");
				return keywords.every(word => paperKeywords.includes(word));
			});

			break;
		default:
			break;
	}

	return filteredPapers;
}

const buyPaper = async (paperID, paperValue) => {
	let weiValue = web3.utils.toWei(paperValue, "ether");
	let accounts = await web3.eth.requestAccounts();
	let current_account = accounts[0];

	await contract.methods.buy(paperID).send({from: current_account, value: weiValue});
	return true;
}

const API = { getActiveAddress, uploadPaper, findPapers, buyPaper };

export default API;
// uint256 price, string memory name, string memory autor, string memory keywords,
// string memory field, string memory ipfs_file