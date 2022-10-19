import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Iframe(props){
    return (
        <Container className="w-100 h-auto" >
            <Row style={{minHeight:'560px'}}>
                <Col>
                    <iframe src="//www.youtube.com/embed/xPFlY6fY2c0?wmode=opaque&enablejsapi=1&autoplay=0&mute=1" allow='autoplay' className="w-100 h-100" scrolling="no" frameBorder="0" allowFullScreen></iframe>
                </Col>
            </Row>
        </Container>
    )
}

export default Iframe;