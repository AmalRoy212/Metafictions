import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function HomeCard({color,img,title}) {
  return (
    <Card style={{ width: '18rem', backgroundColor:color, marginBottom:'10rem', marginLeft:"auto",marginRight:"auto"}}>
      <Card.Img style={{padding:"1rem"}} variant="top"
       src={img} />
      <Card.Title>{title} 8</Card.Title>
      {/* <Card.Body>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body> */}
    </Card>
  );
}

export default HomeCard;