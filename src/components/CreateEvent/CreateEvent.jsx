import { useState } from "react"
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import './CreateEvent.css'

import NewEventForm from "../../components/NewEventForm/NewEventForm"

const CreateEvent = ({ itinerary_id, filterEvent }) => {

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
        filterEvent()
    }

    // useEffect(() => {

    // }, [])

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <h1 className="details-title">Eventos</h1>
                    </Col>
                    <Col>
                        <Button className="fill create-event-button" onClick={openModal} variant="gray" size="sm">Crear nuevo evento</Button>
                    </Col>
                </Row>
            </Container>

            < Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Datos de tu evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewEventForm fireFinalActions={fireFinalActions} itinerary_id={itinerary_id} />
                </Modal.Body>
            </Modal >
        </ >
    )
}

export default CreateEvent