import React from "react";
import { Col, Container, Row } from "react-bootstrap";

function Group(props) {
  const data = [
    {label:'', url:'https://images.squarespace-cdn.com/content/v1/572e314422482e952aae8c6c/1664658537969-O5P4JXK125T9Y2HH5BV7/e4.jpg?format=300w'},
    {label:'', url:'https://images.squarespace-cdn.com/content/v1/572e314422482e952aae8c6c/1664658537921-8989KHTON94SRBY5B5X9/e3.jpg?format=300w'},
    {label:'', url:'https://images.squarespace-cdn.com/content/v1/572e314422482e952aae8c6c/1664658318060-8OXDKXWL2Y8I59TIGWDE/E1.jpg?format=300w'},
    {label:'', url:'https://images.squarespace-cdn.com/content/v1/572e314422482e952aae8c6c/1664658391743-0REZW3I77NL81GS6PCRY/e2.jpg?format=300w'},
  ]
  return (
    <Container className="py-5">
      <Row className="justify-content-center pb-5">
        {data.map((m,index) => (
          <Col key={`Group-ID-${index}`} xl={3} lg={4} md={6} sm={12} className="text-center">
            <img className="rounded-circle" src={m.url}/>
          </Col> 
        ))}
      </Row>
      <Row className="text-center">
          <div className="h4 my-4">Throughout October, we plan to complete as many projects as our budget can fund—or, shall we say, as far as your donations can take us. Our success depends on your help.</div>
      </Row>
    </Container>
  )
}

export default Group;