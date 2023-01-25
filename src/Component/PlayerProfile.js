import React from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Col, Image, Row } from "react-bootstrap";
import { MdAccountCircle } from "react-icons/md";
import { useEffect, useState } from "react";
import Spinner from 'react-bootstrap/Spinner';
import '.././App.css';
import { FaCrown } from 'react-icons/fa';
import { FcApproval, FcCalendar, FcCancel, FcConferenceCall, FcGlobe } from "react-icons/fc";

function PlayerProfile() {

    const params = useParams()
    const username = params.username;
    const URL = "https://api.chess.com/pub/player/" + username;
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);
    const [country, setCountry] = useState({});

    let stausDataColor = {
        basic: "silver",
        premium: "gold"
    }
    const fetchData = () => {
        console.log('Fetching data...');
        axios.get(URL).then(response => {
            console.log(response);
            if (response.status === 200) {
                getCountry(response.data);
            }

        });
    }

    const getCountry = (data) => {
        axios.get(data.country).then(response => {
            console.log(response);
            if (response.status === 200) {
                setData(data);

                setCountry(response.data);
                setLoading(false)

            }

        });
    }
    useEffect(() => {
        if (data && !data.length)
            fetchData();
    }, [])
    return (
        <Row className="h-100 m-0" xs={1} md={3}>
            <Col className="p-0"></Col>
            <Col className="main-div h-100 p-0">
                    {loading && <div style={{ textAlign: 'center' }} className="loading-css">
                        <Spinner animation="border" role="status">
                            <span className="visually-hidden ">Loading...</span>
                        </Spinner>

                    </div>
                    }
                    <div>
                        {
                            !loading &&
                                data.avatar ? <div> <Image className="image-avatar" src={data.avatar} ></Image></div>
                                : ( !loading && <div style={{ fontSize: '190px' }}> <MdAccountCircle></MdAccountCircle> </div>)
                        }
                    </div>
                    <div style={{ fontSize: "25px", fontWeight: "800", lineHeight: "60px" }}>
                        {!loading && country.name && <span ><FcGlobe></FcGlobe>  Country - {country.name}</span>}
                        {!loading && data.followers && <div ><FcConferenceCall></FcConferenceCall>  Followers - {data.followers}</div>}
                        {!loading && data.joined && <div> <FcCalendar></FcCalendar>  Joining Date - {new Date(data.joined * 1000).toISOString().substring(0, 10)}</div>}
                        {!loading && data.last_online && <div> <FcCalendar></FcCalendar>  Last Online - {new Date(data.last_online * 1000).toISOString().substring(0, 10)}</div>}
                        {!loading && data.status && <div className={stausDataColor[data.status]}><FaCrown></FaCrown>  Status - {data.status}</div>}
                        {!loading && <div>{data.verified ? <div> <FcApproval></FcApproval> verification -  True </div> :
                            <div><FcCancel></FcCancel> verification -  False </div>}</div>}
                    </div>
            </Col>
            <Col className="p-0"></Col>
        </Row>
    )
}
export default PlayerProfile;