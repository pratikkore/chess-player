import React from "react";
import { Button, Card, Col, Row } from "react-bootstrap";
import { MdAccountCircle } from 'react-icons/md';
import { useNavigate } from "react-router-dom";

let PlayerData = [{ id: 1, "name": "peter" },
{ id: 2, "name": "John" },
{ id: 3, "name": "alex" },
{ id: 4, "name": "erik" },
{ id: 5, "name": "jydra21" }];

function Playerlist() {
    // const history = useHistory();
    const navigate = useNavigate();

    function onClickProfile(player) {
        console.log("dguyeduyg");
        navigate('/playersProfile/' + player.name);

    }
    return (
        <>

            <Row xs={1} md={3} className="g-2">
                {PlayerData.map((res, idx) => (
                    <Col style={{ textAlign: 'center' }}> <Card >
                        <div style={{ fontSize: '50px' }}> <MdAccountCircle></MdAccountCircle></div>
                        <Card.Body>
                            <Card.Title>Player {res.id}</Card.Title>
                            <Card.Text>
                                {res.name}
                            </Card.Text>
                            <Button onClick={() => onClickProfile(res)} variant="primary">Go To Profile</Button>
                        </Card.Body>
                    </Card>
                    </Col>
                )
                )}</Row>
        </>
    )
}

export default Playerlist;