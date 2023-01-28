import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
    const [file, setFile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const keywordsArray = keywords.toLowerCase().split(", ");
        const newPaper = {
            id: 0, // purpose is having a unique id while updating locally (before fetching db) and not
            // have a warning of non-uniqueness of the key
            title: title,
            author: author,
            keywords: keywordsArray,
            file: file,
        };
        props.addPaper(newPaper);
        navigate('/');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control type='text' required value={title}
                            onChange={(event) => setTitle(event.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Author</Form.Label>
                            <Form.Control type='text' required value={author}
                                onChange={(event) => setAuthor(event.target.value)}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>File</Form.Label>
                            <Form.Control type='text' value={file} required
                                onChange={(event) => setFile(event.target.value)} />
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