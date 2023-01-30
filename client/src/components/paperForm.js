import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm(props) {
    const navigate = useNavigate();
    const [input, setInput] = useState('');
    const criterion = props.criterion;

    const handleSubmit = (event) => {
        event.preventDefault();

        props.setCriterion(criterion);
        props.setInput(input);
        navigate('/search/results');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <br/>
                <Row>
                    <Form.Group>
                        <Form.Control type='text' required value={input}
                            onChange={(event) => setInput(event.target.value)} />
                    </Form.Group>
                </Row>
                <br/>
                <Button variant="primary" type="submit">Search</Button>
                &nbsp;&nbsp;
                <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button>
            </Container>
        </Form>
    );
}

function NewPaperForm(props) {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [keywords, setKeywords] = useState('');
    const [fileName, setFileName] = useState('');
    const [file, setFile] = useState();
    const [value, setValue] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        // const keywordsArray = keywords.toLowerCase().split(", ");
        const newPaper = {
            title: title,
            author: author,
            keywords: keywords,
            file: file,
            value: value,
        };
        props.uploadPaper(newPaper);
        navigate('/');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Form.Group>
                            <Form.Label>Title</Form.Label>
                            <Form.Control type='text' required value={title}
                                onChange={(event) => setTitle(event.target.value)}/>
                    </Form.Group>   
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>File</Form.Label>
                            <Form.Control type='file' accept=".txt" required value={fileName}
                                onChange={(event) => {setFile(event.target.files); setFileName(event.target.value)}} />
                        </Form.Group>
                        
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' value={author} required
                                onChange={(event) => setAuthor(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Value (ETH)</Form.Label>
                            <Form.Control type='number' value={value} required min={0}
                                onChange={(event) => setValue(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Keywords (format: xxx, yyy...)</Form.Label>
                            <Form.Control type='text' value={keywords} required
                                onChange={(event) => setKeywords(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                
                <br />
                <Button variant="success" type="submit">Upload</Button>
                &nbsp;&nbsp;
                <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button>
            </Container>
        </Form>
    );

}

export { SearchForm, NewPaperForm };