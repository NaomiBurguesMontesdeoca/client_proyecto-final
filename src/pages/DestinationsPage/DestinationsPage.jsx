import './DestinationsPage.css'
import { Card, Container, Row, Col } from 'react-bootstrap'
import itineraryService from '../../services/itineraries.service'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'


const DestinationsPage = () => {

    const [destinations, setDestinations] = useState()

    const printDestinations = () => {

        itineraryService
            .getAllDestinations()
            .then(response => setDestinations(response.data.cities))
            .catch(err => console.error(err))
    }

    useEffect(() => {
        printDestinations()
    }, [])


    return (
        <>
            <Container fluid>
                <Row>
                    {
                        destinations ? destinations.map((destination, idx) => {
                            return (
                                <Col md={{ span: 3 }}>
                                    {/* SACAR A DESTINATION CARD */}
                                    <Card className="mb-4 destination-card" key={idx}>
                                        < Link to={`/itinerario/${destination}`} >
                                            <span className='card-title-home destination-span'>{destination}</span>
                                        </Link >
                                    </Card>
                                </Col>
                            )
                        })
                            :
                            'Cargando...'}
                </Row>
            </Container>
        </>
    )

}

export default DestinationsPage