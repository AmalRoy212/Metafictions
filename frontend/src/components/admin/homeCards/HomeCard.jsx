import Card from 'react-bootstrap/Card';

function HomeCard({color,img,title}) {
  return (
      <Card style={{ width: '18rem', backgroundColor:color, marginLeft:"auto",marginRight:"auto"}}>
        <Card.Img style={{padding:"1rem"}} variant="top"
        src={img} />
        <Card.Title>{title} 8</Card.Title>
      </Card>
  );
}

export default HomeCard;