import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function Blogs(props) {
  const data = [
    {title:'Learn about our fall 2022 food distribution ', url:'https://images.squarespace-cdn.com/content/v1/572e314422482e952aae8c6c/b1f72660-9b67-4666-aaba-a3a09a179e27/Food+distribution?format=750w', subtitle:'Seventy-five families received food supplies to last the average family of five approximately 2~3 weeks…', BtnText:'Read more', BtnUrl:'#'},
    {title:'Learn about our recent medical camp, completed as part of our fall 2022 projects. ', url:'https://images.squarespace-cdn.com/content/v1/572e314422482e952aae8c6c/b27cfb07-cd7e-4fb9-a607-0fe07d1d8783/IMG_2816-2++%28R%29.jpg?format=750w', subtitle:'One hundred and thirty-four people attended the camp…', BtnText:'Read more', BtnUrl:'#'},
  ]
  return (
    <Container className="py-5">
      <Row>
        <Col xl={12}>
          <div className="text-center display-2 pb-4">
            <strong>Some Heading!</strong>
          </div>
        </Col>
        {
          data?.map((m,index) => (
            <Col key={`Blogs-ID-${index}`} lg={6} sm={12} className="pb-5">
              <Card  border="secondary">
                <Card.Img variant="top" className="h-100" src={m.url} />
                <Card.Body>
                  <Card.Title>
                    <span>{m.subtitle}</span>
                  </Card.Title>
                  <Card.Text>
                    <span>{m.title}</span>
                    <a href={m.BtnUrl}>{m.BtnText}</a>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))
        }
      </Row>
    </Container>
  )
}

export default Blogs;