import './ProfilePage.css'
import { useContext, useState } from 'react'
import { AuthContext } from '../../contexts/auth.context'
import itineraryService from '../../services/itineraries.service'
import { useEffect } from 'react'
import { Row, Col, Card, Container } from 'react-bootstrap'
import eventService from '../../services/events.service'
import { Link } from 'react-router-dom'
import my_date from '../../utils/date.utils'

const ProfilePage = () => {

    const [itinerariesOwned, setItinerariesOwned] = useState()
    const [favItineraries, setFavItineraries] = useState()
    const [yourEvents, setYourEvents] = useState()

    const { user } = useContext(AuthContext)

    const filterItineraries = () => {

        itineraryService
            .getOwnedItineraries()
            .then(({ data }) => setItinerariesOwned(data))
            .catch(err => console.log(err))
    }

    const getFavs = () => {

        itineraryService
            .getFavsItineraries()
            .then(({ data }) => setFavItineraries(data))
            .catch(err => console.log(err))
    }

    const printEvent = () => {

        eventService
            .getJoinedEvents()
            .then(({ data }) => setYourEvents(data))
            .catch(console.log)

    }

    useEffect(() => {
        filterItineraries()
        getFavs()
        printEvent()
    }, [])

    return (
        <Container fluid className='profile-container'>

            <Row className='profile-main-row'>
                <Col className='info-personal-col' md={{ span: 3 }}>
                    <h3 className='profile-info-text mt-4 d-flex text-align-left'>INFORMACIÓN PERSONAL</h3>
                    <img className='profile-img' src={user?.imageUrl}></img>
                    <h1 className='profile-info-text-h1'>{user?.username}</h1 >
                    <h1 className='profile-info-text-h1'>{user?.email}</h1 >
                </Col>
                <Col md={{ span: 3 }}>
                    <h3 className='profile-info-text mt-4 d-flex text-align-left'>ITINERARIOS</h3>
                    {
                        itinerariesOwned ? itinerariesOwned.map((myItineraries, idx) => {
                            return (
                                <Card className="mb-4 itinerary-card" key={idx}>
                                    <img className='profile-images' src={myItineraries.images}></img>
                                    <Link to={`/detalles/${myItineraries._id}`}>
                                        <div>
                                            <Card.Title className='profile-card-title'>{myItineraries.title}</Card.Title>
                                        </div>
                                    </Link>
                                </Card>
                            )
                        })
                            :
                            'No has creado ninguna ruta aún.'}
                </Col>

                <Col md={{ span: 3 }}>

                    <h3 className='profile-info-text mt-4 d-flex text-align-left'>FAVORITOS</h3>
                    {
                        favItineraries ? favItineraries.map((myFavItineraries, idx) => {
                            return (
                                <>
                                    <Card className="mb-4 itinerary-card" key={idx}>
                                        <img className='profile-images' src={myFavItineraries.images}></img>
                                        <Link to={`/detalles/${myFavItineraries._id}`}>
                                            <div>
                                                <Card.Title className='profile-card-title'>{myFavItineraries.title}</Card.Title>
                                            </div>
                                        </Link>
                                    </Card>
                                </>
                            )
                        })
                            :
                            'No tienes ningún favorito aún.'}
                </Col>
                <Col>
                    <h3 className='profile-info-text mt-4 d-flex text-align-left'>EVENTOS</h3>
                    {
                        yourEvents ? yourEvents.map((myEvents, idx) => {
                            return (
                                <Col>
                                    <Card className="mb-4" key={idx}>
                                        <Link to={`/detalles/${myEvents.itineraryOwner}`}>
                                            <p className='profile-event-title'>{myEvents.title}</p>
                                        </Link>
                                        <p>{my_date(new Date(myEvents.date))}</p>
                                    </Card>
                                </Col>
                            )
                        })
                            :
                            'No te has unido a ningún evento aún.'}
                </Col>
            </Row>
        </Container >
    )
}

export default ProfilePage