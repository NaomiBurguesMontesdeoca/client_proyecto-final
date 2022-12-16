
import itineraryService from '../../services/itineraries.service'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ItineraryDetailsCard from '../../components/ItineraryDetailsCard/ItineraryDetailsCard'
import CreateEvent from '../../components/CreateEvent/CreateEvent'
import MyMap from '../../components/ItineraryMap/ItineraryMap'
import EventCalendar from '../../components/Calendar/Calendar'
import { Container, Row, Col, Button } from 'react-bootstrap'
import eventService from '../../services/events.service'
import './ItineraryDetailsPage.css'


function ItineraryDetailsPage() {

    const [itineray, setItinerary] = useState()
    const { itinerary_id } = useParams()
    const [events, setEvents] = useState()

    const filterEvent = () => {

        eventService
            .getEvents()
            .then(response => {
                const allEvents = response.data.map(event => {
                    return {
                        title: event.title,
                        start: new Date(event.date),
                        end: new Date(event.date),
                        allDay: true,
                        itineraryOwner: event.itineraryOwner,
                        description: event.description,
                        id: event._id
                    }
                })

                const filteredEvents = allEvents.filter(event => {
                    return (event.itineraryOwner === itinerary_id)
                })

                setEvents(filteredEvents)
            })
    }

    const getDetails = (itinerary_id) => {

        itineraryService
            .getOneItinerary(itinerary_id)
            .then(({ data }) => setItinerary(data))
            .catch(err => console.log(err))
    }

    const addFav = (itinerary_id) => {

        itineraryService
            .addFav(itinerary_id)
            .then(() => console.log('likaso'))
            .catch(err => console.log(err))

    }

    const deleteFav = (itinerary_id) => {

        itineraryService
            .deleteFav(itinerary_id)
            // .then(() => closeModal())
            .then(() => console.log('dis likaso'))

            .catch(console.log('ERROR'))

    }

    useEffect(() => {
        getDetails(itinerary_id)
        filterEvent()
    }, [])


    return (
        <>
            <Container fluid>

                {itineray ?
                    <>
                        <ItineraryDetailsCard itinerary={itineray} />
                    </>
                    : 'Cargando...'
                }

                <Row className='events-line-details'>
                    <Col className='d-flex' md={{ span: 5 }} >
                        <CreateEvent itinerary_id={itinerary_id} filterEvent={filterEvent} />
                    </Col>
                    <Col className='d-flex justify-content-end'>
                        <Button className="fill details-event-button" onClick={() => addFav(itinerary_id)} variant="gray" size="sm">Añadir favorito</Button>
                    </Col>
                    <Col>
                        <Button className="fill details-event-button" onClick={() => deleteFav(itinerary_id)} variant="gray" size="sm">Quitar favorito</Button>
                    </Col>
                </Row>

                <Row className="mb-4 details-row">
                    <Col md={{ span: 5 }}>
                        {events && <EventCalendar events={events} filterEvent={filterEvent} />}
                    </Col>
                    <Col className='mt-5' md={{ span: 5 }} >
                        {itineray ?
                            <>
                                <MyMap locations={itineray.locations} />
                            </>
                            : 'Cargando...'}
                    </Col>
                </Row>

            </Container>
        </>
    );
}

export default ItineraryDetailsPage