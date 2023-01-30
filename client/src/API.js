import Web3 from 'web3';
import { Web3Storage } from 'web3.storage';
import contractInfo from './PaperManagement.json';


const web3 = new Web3(Web3.givenProvider);
const contractAddress = contractInfo.networks['5777'].address;
const contractAbi = contractInfo.abi;
const contract = new web3.eth.Contract(contractAbi, contractAddress);

const client = new Web3Storage({ token: process.env.REACT_APP_WEB3STORAGE_TOKEN });

var variable_text = "";

const openText = (file) => {
	let reader = new FileReader();
	reader.readAsText(file);
	reader.onload = () => {
	  variable_text = reader.result;
	};
	return variable_text;
}

function jaccardSimilarity(str1, str2) {
	let set1 = new Set(str1.split(""));
	let set2 = new Set(str2.split(""));
	let intersection = new Set([...set1].filter(x => set2.has(x)));
	let union = new Set([...set1, ...set2]);
	return intersection.size / union.size;
}

const getAccessToken = () => {
	return process.env.REACT_APP_WEB3STORAGE_TOKEN;
};

const makeStorageClient = () => {
	return new Web3Storage({ token: getAccessToken() });
}

const getActiveAddress = async () => {
	let accounts = await web3.eth.requestAccounts();
	let current_account = accounts[0];
	return current_account;
}

const uploadPaper = async (newPaper) => {
	let accounts = await web3.eth.requestAccounts();
	let account = accounts[0];

	let existing = false;
	let ids;
	let CIDs = [];

	// Check if paper is present (by title or a more complex measure)
	// existing = await contract.methods.findTitle(newPaper.title).call()

	ids = await contract.methods.getIds().call();
	
	for (let id of ids) {
		CIDs = [...CIDs, await contract.methods.getPaperCID_byId(id).call()];
	}

	const newPaperText = openText(newPaper.file[0]);

	// CIDs listo
	for (const CID of CIDs) {
		const client = makeStorageClient();
		const res = await client.get(CID);
		if (!res.ok) {
			throw new Error(`failed to get ${CID} - [${res.status}] ${res.statusText}`);
		}
		// Unpack File objects from the response
		const files = await res.files();
		const file = files[0];
		const file_text = openText(file);
		let jc_index = jaccardSimilarity(newPaperText, file_text);
		if (jc_index >= 0.80) {
			existing = true;
		}
	}
	//

	if (existing) {
		return false;
	}
	else {
		// Upload to IPFS and get hash
		const filename = newPaper.file[0].name;
		const rootCID = await client.put(newPaper.file, {
			name: filename,
			maxRetries: 3,
		});
		await contract.methods.registerPaper(newPaper.title, newPaper.author, newPaper.keywords, rootCID, newPaper.value).send({ from: account });
		return true;
	}
}

const handleRetrieve = async (CID) => {
	const client = makeStorageClient();
	const res = await client.get(CID);
	// console.log(res)
	// console.log(`Got a response! [${res.status}] ${res.statusText}`)
	if (!res.ok) {
		throw new Error(`failed to get ${CID} - [${res.status}] ${res.statusText}`);
	}
	// Unpack File objects from the response
	const files = await res.files();
	return files[0];
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
						file: await handleRetrieve(paperInfo[4]),
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
				for (let i = 0; i < count; i++) {
					id = paperIds[i];
					paperInfo = await contract.methods.getPaper_byId(id).call();
					filteredPapers = [...filteredPapers,
					{
						id: paperInfo[0],
						title: paperInfo[1],
						author: paperInfo[2],
						keywords: paperInfo[3],
						file: await handleRetrieve(paperInfo[4]),
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
						file: await handleRetrieve(paperInfo[4]),
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

		await contract.methods.buy(paperID).send({ from: current_account, value: weiValue });
		return true;
	}

	const API = { getActiveAddress, uploadPaper, findPapers, buyPaper };

	export default API;
// uint256 price, string memory name, string memory autor, string memory keywords,
// string memory field, string memory ipfs_file