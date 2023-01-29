import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { HomeRoute, NewPaperRoute, SearchRoute, SearchResultsRoute } from './components/views';

const fakePapers = [
  {id: 0, title: 'Blockchain', author: 'Nawid', keywords: ['blockchain', 'research'], file: '0x414', owners: [1], value: 200},
  {id: 1, title: 'MLPR', author: 'Omar', keywords: ['machine-learning', 'models', 'plots'], file: '0x814', owners: [2], value: 100},
  {id: 2, title: 'MLDA', author: 'Alfredo', keywords: ['el-papu', 'machine-learning'], file: '0x1111', owners: [3], value: 122},
  {id: 3, title: 'PSAT project', author: 'Felipe', keywords: ['scientific', 'paper'], file: '0x3224', owners: [4], value: 67},
]

function App() {

  const [papers, setPapers] = useState([]);
  const [criterion, setCriterion] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [user, setUser] = useState(3); // Should be an address

  const changeCriterion = (crit) => setCriterion(crit);
  const changeInput = (input) => setSearchInput(input);

  // useEffect(() => {
  //   const getData = async () => {

  //   }
  // }, []);

  useEffect(() => {
    let filteredPapers = [];
    switch (criterion) {
      case 'title':
        // Input will be just a string
        filteredPapers = [fakePapers.find((paper) => paper.title.toLowerCase() === searchInput.toLowerCase())];
        break;
        case 'author':
          // Input will be just a string
          filteredPapers = [fakePapers.find((paper) => paper.author.toLowerCase() === searchInput.toLowerCase())];
          break;
        case 'keywords':
          const keywords = searchInput.split(", ");
          filteredPapers = fakePapers.filter((paper) => keywords.every((word) => paper.keywords.includes(word)));
        break;
      default:
        break;
    }

    setPapers(filteredPapers);

  }, [criterion, searchInput]);

  return (
    <Container className="App" fluid>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRoute user={user}/>}/>
          <Route path="/upload" element={<NewPaperRoute/>}/>
          <Route path="/search/:criterion" element={<SearchRoute setCriterion={changeCriterion} setInput={changeInput}/>}/>
          <Route path="/search/results" element={<SearchResultsRoute papers={papers} user={user}/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
