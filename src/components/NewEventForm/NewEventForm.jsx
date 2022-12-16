import { useState, useContext } from "react"
import { Form, Button } from "react-bootstrap"
import eventService from "../../services/events.service"
import { useNavigate } from 'react-router-dom'
import { MessageContext } from './../../contexts/userMessage.context'
import ErrorMessage from "../ErrorMessage/ErrorMessage"


const NewEventForm = ({ fireFinalActions, itinerary_id }) => {

    // console.log(itinerary_id)


    const [eventData, setEventData] = useState({

        title: '',
        description: '',
        date: new Date,
        itineraryOwner: itinerary_id
    })

    const { setShowToast, setToastMessage } = useContext(MessageContext)


    const handleInputChange = e => {
        const { name, value } = e.target
        setEventData({ ...eventData, [name]: value })
    }

    const navigate = useNavigate()

    const [errors, setErrors] = useState([])

    const handleFormSubmit = e => {
        e.preventDefault()

        eventService
            .saveEvent(eventData)
            .then((response) => {
                const { _id: event_id } = response.data
                setShowToast(true)
                setToastMessage('Evento creado correctamente')
                fireFinalActions()
            })
            .catch(err => setErrors(err.response.data.errorMessages))
    }

    const { title, description, date } = eventData


    return (
        <Form onSubmit={handleFormSubmit}>
            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Título del evento</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text area" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Fecha del evento</Form.Label>
                <Form.Control type="date" multiple value={date} onChange={handleInputChange} name="date" />
            </Form.Group>

            {errors.length ? <ErrorMessage>{errors.map(elm => <p key={elm}>{elm}</p>)}</ErrorMessage> : undefined}

            <div className="d-grid">
                <Button className="create-button" type="submit">Crear evento</Button>
            </div>
        </Form>
    )
}

export default NewEventForm