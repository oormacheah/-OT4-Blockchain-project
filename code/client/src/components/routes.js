import 'bootstrap/dist/css/bootstrap.min.css';
import { GrSearchAdvanced } from 'react-icons/gr';
import { Container, Row, Col, Alert, Table, Button, Dropdown } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { PaperTable } from './paperTable';
import { SearchForm } from './paperForm';

function HomeRoute(props) {
    const navigate = useNavigate()
    return (
        <>
            <br />
            <Row>
                <h1>
                    ResearChain
                </h1>
            </Row>
            <Row>
                <GrSearchAdvanced className="search_logo" />
            </Row>
            <br />
            <br />
            <Row>
                <div className="d-flex justify-content-center">
                    <br />
                    <Button>Upload&nbsp;&nbsp;<i className={'bi bi-upload'} /></Button>
                    &nbsp;&nbsp;
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            Search&nbsp;&nbsp;<i class="bi bi-search"/>
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Search by title</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/search/keywords')}>
                                Search by keywords
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </Row>
        </>
    );
}

function SearchRoute(props) {
    const { criterion } = useParams();
    const navigate = useNavigate();
    return (
        <>
            <br />
            <Row>
                <Col>
                    <h1>
                        Search by {props.criterion}&nbsp;&nbsp;<i class="bi bi-search"/>&nbsp;&nbsp;
                        <Button variant="outline-danger"
                        onClick={() => navigate('/')}>Go back</Button>
                    </h1>
                </Col>
            </Row>
            
            <Row>
                <SearchForm criterion={criterion}/>
            </Row>

        </>
    );
}

function SearchResultsRoute(props) {

    const criterion = props.criterion;
    const input = props.input;

    switch (criterion) {
        case 'Keywords':
            break;
        case 'Title':
            break;
        default:
            break;
    }
    

    return (
        <Row>
            <PaperTable papers={props.papers}/>
        </Row>
    );
}


export { HomeRoute, SearchRoute, SearchResultsRoute };