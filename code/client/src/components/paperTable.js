import { Table } from 'react-bootstrap';

function PaperTable(props) {
  const papers = props.papers;
  const paperElements = papers.map(paper => {
    return <PaperRow id={paper.id} title={paper.title} author={paper.author} keywords={paper.keywords} file={paper.file}/>
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author(s)</th>
          <th>Keywords</th>
          <th>File</th>
        </tr>
      </thead>
      <tbody>
        {paperElements}
      </tbody>
    </Table>
  );
}

function PaperRow(props) {
  const keywordStr = props.keywords.join(', ')
  return (
    <tr key={props.id}>
      <td key={props.title}>{props.title}</td>
      <td key={props.author}>{props.author}</td>
      <td key={keywordStr}>{keywordStr}</td>
      <td key={props.file}>{props.file}</td>
    </tr>
  );
}


export { PaperTable };