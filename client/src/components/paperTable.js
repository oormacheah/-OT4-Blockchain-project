import { Table, Button } from 'react-bootstrap';

function PaperTable(props) {
  const papers = props.papers;
  let paperElements;
  if (papers[0] !== undefined) {
    paperElements = papers.map(paper => {
      return <PaperRow key={paper.id} id={paper.id} title={paper.title} author={paper.author} 
      keywords={paper.keywords} file={paper.file} owners={paper.owners} value={paper.value}
      user={props.user}/>;
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
  const keywordStr = props.keywords.join(', ');

  return (
    <tr key={props.id}>
      <td key={props.title}>{props.title}</td>
      <td key={props.author}>{props.author}</td>
      <td key={keywordStr}>{keywordStr}</td>
      <td key={props.value}>{props.value}</td>
      <td key={props.file}>
        <Button variant="primary" onClick={() => window.open('https://google.com', '_blank', 'noreferrer')}>View</Button>
        &nbsp;&nbsp;
        <Button variant="dark" disabled={props.owners.includes(props.user)}>Buy</Button>
      </td>
    </tr>
  );
}


export { PaperTable };