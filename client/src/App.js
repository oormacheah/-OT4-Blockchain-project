import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { HomeRoute, NewPaperRoute, SearchRoute, SearchResultsRoute } from './components/views';
import API from './API';

// const fakePapers = [
//   {id: 0, title: 'Blockchain', author: 'Nawid', keywords: ['blockchain', 'research'], file: '0x414', owners: [1], value: 200},
//   {id: 1, title: 'MLPR', author: 'Omar', keywords: ['machine-learning', 'models', 'plots'], file: '0x814', owners: [2], value: 100},
//   {id: 2, title: 'MLDA', author: 'Alfredo', keywords: ['el-papu', 'machine-learning'], file: '0x1111', owners: [3], value: 122},
//   {id: 3, title: 'PSAT project', author: 'Felipe', keywords: ['scientific', 'paper'], file: '0x3224', owners: [4], value: 67},
// ]

function App() {

  const [papers, setPapers] = useState([]);
  const [criterion, setCriterion] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState(''); // Should be an address
  const [message, setMessage] = useState('');

  const changeCriterion = (crit) => setCriterion(crit);
  const changeInput = (input) => setSearchInput(input);

  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on('chainChanged', () => {
        window.location.reload();
      })
      window.ethereum.on('accountsChanged', async () => {
        window.location.reload();
        setUser(await API.getActiveAddress())
      })
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      setUser(await API.getActiveAddress());
    }
    getUser();
  }, []);

  useEffect(() => {
    const getPapers = async (criterion, searchInput) => {
      let filteredPapers = await API.findPapers(criterion, searchInput);
      setPapers(filteredPapers);
    }
    getPapers(criterion, searchInput);
  }, [criterion, searchInput, message]);

  const uploadPaper = async (newPaper) => {
    let success = await API.uploadPaper(newPaper);
    if (success) {
      setMessage({msg: 'Paper correctly uploaded!', type: 'success'});
    }
    else {
      setMessage({msg: 'Paper is already present in the blockchain!', type: 'danger'});
    }
  };

  const buyPaper = async (paperID, value) => {
    let success = await API.buyPaper(paperID, value);
    if (success) {
      setMessage({msg: 'Paper correctly bought!', type: 'success'});
    }
    else {
      setMessage({msg: 'Couldn\'t buy paper!', type: 'danger'});
    }
  };

  return (
    <Container className="App" fluid>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute user={user} msg={message} setMsg={setMessage}/>}/>
          <Route path="/upload" element={<NewPaperRoute uploadPaper={uploadPaper}/>}/>
          <Route path="/search/:criterion" element={<SearchRoute setCriterion={changeCriterion} setInput={changeInput}/>}/>
          <Route path="/search/results" element={<SearchResultsRoute papers={papers} user={user} buyPaper={buyPaper} msg={message} setMsg={setMessage}/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
