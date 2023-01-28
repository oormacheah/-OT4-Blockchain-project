import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import '../App.css';
import { Navbar, Container, Button } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import { LogoutButton } from './authComponents';

function NavBar(props) {
    return (
        <Navbar bg="success" variant="dark">
            <Container>
                <Navbar.Brand>
                    <i className="bi bi-question-square" />
                    &nbsp;&nbsp;ResearChain
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export { NavBar };