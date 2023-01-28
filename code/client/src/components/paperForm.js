import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchForm(props) {

    const navigate = useNavigate();
    const [input, setInput] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newInput = {
            id: 0, // purpose is having a unique id while updating locally (before fetching db) and not
            // have a warning of non-uniqueness of the key
            input: input,
        };
        // props.setInput(newInput);
        navigate('/search/results');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Form.Group>
                        <Form.Label>Search by {props.criterion}</Form.Label>
                        <Form.Control type='text' required value={input}
                            onChange={(event) => setInput(event.target.value)} />
                    </Form.Group>
                </Row>
                <Button variant="success" type="submit">Search&nbsp;<i className={'bi bi-upload'} /></Button>
                &nbsp;&nbsp;
                <Button variant="danger" onClick={() => navigate('/')}>Cancel</Button>
            </Container>
        </Form>
    );
}

function PaperForm(props) {

    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [keywords, setKeywords] = useState('');
    const [file, setFile] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const newPaper = {
            id: 0, // purpose is having a unique id while updating locally (before fetching db) and not
            // have a warning of non-uniqueness of the key
            title: title,
            author: author,
            keywords: keywords,
            file: file,
        };
        // props.addPaper(newPaper);
        navigate('/');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Container>
                <Row>
                    <Form.Group>
                        <Form.Label>Question</Form.Label>
                        <Form.Control type='text' required value={question}
                            onChange={(event) => setQuestion(event.target.value)} />
                    </Form.Group>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Difficulty</Form.Label>
                            <Form.Select value={difficulty}
                                onChange={(event) => setDifficulty(event.target.value)}>
                                <option>Easy</option>
                                <option>Average</option>
                                <option>Difficult</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Duration</Form.Label>
                            <Form.Control type='number' value={duration} required min={60} max={600}
                                onChange={(event) => setDuration(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Answer</Form.Label>
                            <Form.Control type='text' value={answer} required
                                onChange={(event) => setAnswer(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Hint 1</Form.Label>
                            <Form.Control type='text' required value={hint1}
                                onChange={(event) => setHint1(event.target.value)} />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Hint 2</Form.Label>
                            <Form.Control type='text' required value={hint2}
                                onChange={(event) => setHint2(event.target.value)} />
                        </Form.Group>
                    </Col>
                </Row>
                <br />
                <Button variant="success" type="submit">Add&nbsp;<i className={'bi bi-upload'} /></Button>
                &nbsp;&nbsp;
                <Button variant="danger" onClick={() => navigate('/myriddles')}>Cancel</Button>
            </Container>
        </Form>
    );

}

export { SearchForm, PaperForm };