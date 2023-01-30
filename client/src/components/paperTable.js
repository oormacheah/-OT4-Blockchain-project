import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { Table, Button } from 'react-bootstrap';

const openText = (file) => {
  let reader = new FileReader();
  reader.readAsText(file);
  reader.onload = () => {
    let tab = window.open('about:blank', '_blank');
    tab.document.write(reader.result);
    tab.document.close();
  };
}

function PaperTable(props) {
  const papers = props.papers;
  let paperElements;
  if (papers[0] !== undefined) {
    paperElements = papers.map(paper => {
      return <PaperRow key={paper.id} id={paper.id} title={paper.title} author={paper.author} 
      keywords={paper.keywords} file={paper.file} owners={paper.owners} value={paper.value}
      user={props.user} buyPaper={props.buyPaper}/>;
    });
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Keywords</th>
          <th>Value</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {paperElements}
      </tbody>
    </Table>
  );
}

function PaperRow(props) {
  // const keywordStr = props.keywords.join(', ');
  const owned = props.owners.includes(props.user);

  return (
    <tr key={props.id}>
      <td key={props.title}>{props.title}</td>
      <td key={props.author}>{props.author}</td>
      <td key={props.keywords}>{props.keywords}</td>
      <td key={props.value}>{props.value} ETH</td>
      <td key={owned} className={owned ? "greentext" : "redtext"}>{owned ? "Owned" : "Not owned"}</td>
      <td key={props.file}>
        <Button variant="primary" onClick={() => openText(props.file)}>View</Button>
        &nbsp;&nbsp;
        <Button variant="dark" disabled={owned} onClick={() => props.buyPaper(props.id, props.value)}>Buy</Button>
      </td>
    </tr>
  );
}


export { PaperTable };