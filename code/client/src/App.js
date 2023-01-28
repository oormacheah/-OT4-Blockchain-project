import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { HomeRoute, SearchRoute } from './components/routes';

const fakePapers = [
  {id: 0, title: 'Blockchain', author: 'Nawid', keywords: ['blockchain', 'research'], file: '0x414'},
  {id: 1, title: 'MLPR', author: 'Omar', keywords: ['machine-learning', 'models'], file: '0x814'},
  {id: 2, title: 'MLDA', author: 'Aldredo', keywords: ['el-papu', 'machine-learning'], file: '0x1111'},
  {id: 3, title: 'PSAT project', author: 'Felipe', keywords: ['scientific', 'paper'], file: '0x3224'},
]

function App() {

  const [papers, setPapers] = useState([]);
  const [criterion, setCriterion] = useState('');

  // useEffect(() => {
  //   const getData = async () => {

  //   }
  // }, []);

  return (
    <Container className="App" fluid>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainRoute/>}/>
          <Route path="/search/:criterion" element={<SearchRoute/>}/>
          <Route path="/search/results" element={<SearchResultsRoute papers={fakePapers} criterion={criterion}/>}/>
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
