import 'bootstrap/dist/css/bootstrap.min.css';

function SideBar(props) {
    return (
        <>
            <i className="bi bi-person-circle myusericon" />
            <div>User:&nbsp;
                <span className={props.user.id ? "" : "bold"}>
                    {props.user.id ? props.nameScore.name : "nobody"}
                </span>
            </div>
            <p>Points: {props.nameScore.score}</p>
            <ListGroup as="ul" variant="flush">
                <ListGroup.Item as="li" action variant="success">Riddles</ListGroup.Item>
            </ListGroup>
        </>
    );
}

export { SideBar };