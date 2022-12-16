import { Container, Row, Col, Card } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import './ItinerariesType.css'
import { useEffect, useState, useContext } from 'react'
import { ItinerariesContext } from '../../contexts/itinerary.context'
import ItinerariesList from '../ItinerariesList/ItinerariesList'
import { Link } from 'react-router-dom'

const ItineraryType = () => {

    const [itinerarySpecs, setItinerarySpecs] = useState({
        city: '',
        category: ''
    })

    const { loadItineraries, resetItineraries } = useContext(ItinerariesContext)

    const { hostcity } = useParams()

    useEffect(() => {
        resetItineraries()
        setItinerarySpecs({ city: hostcity })
    }, [])

    const handleTypeChange = e => {
        const { name } = e.target
        setItinerarySpecs({ ...itinerarySpecs, category: name })
        loadItineraries(itinerarySpecs.city, name)
    }

    const { city } = itinerarySpecs

    return (
        <div >

            <Container fluid className='category-container'>

                <h1 className='card-title-home category-capitalize'>{city}</h1>

                <Row className='category-row '>
                    <Col md={{ span: 2 }}>
                        <Card className='category-card' >
                            <Card.Img className='category-image' variant="top" src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670756908/arte.webp" />
                            <Card.Body>
                                <Link name="Arte" className='category-title' onClick={handleTypeChange}>Arte</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 2 }}>
                        <Card className='category-card'>
                            <Card.Img className='category-image' variant="top" src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670754391/gastronomia.webp" />
                            <Card.Body>
                                <Link name="Gastronomia" className='category-title' onClick={handleTypeChange}>Gastronomía</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 2 }}>
                        <Card className='category-card'>
                            <Card.Img className='category-image' variant="top" src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670758617/naturaleza.webp" />
                            <Card.Body>
                                <Link name="Naturaleza" className='category-title' onClick={handleTypeChange}>Naturaleza</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 2 }}>
                        <Card className='category-card'>
                            <Card.Img className='category-image' variant="top" src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670757667/ocioNocturno.jpg" />
                            <Card.Body>
                                <Link name="Ocio nocturno" className='category-title' onClick={handleTypeChange}>Ocio nocturno</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col md={{ span: 2 }}>
                        <Card className='category-card'>
                            <Card.Img className='category-image' variant="top" src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670758326/turismo.jpg" />
                            <Card.Body>
                                <Link name="Turismo" className='category-title' onClick={handleTypeChange}>Turismo</Link>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>

                <ItinerariesList />

            </Container>
        </div >
    )
}
export default ItineraryType