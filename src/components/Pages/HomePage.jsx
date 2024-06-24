import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';

import api from '../../../public/api';

function HomePage() {
  const [membership, setMembership] = useState(0)

  useEffect(() => {api.get("/customers").then( 
    response => setMembership(response.data.length)
  ).catch(
    error => console.log(error)
  )}, [])

  return (
    <Container className="text-center">
      <h1>Welcome to the eStore</h1>
      <h4>Now serving <span style={{color: "#a15Cf8"}}>{membership}</span> customers!</h4>
    </Container>
  )
}

export default HomePage
