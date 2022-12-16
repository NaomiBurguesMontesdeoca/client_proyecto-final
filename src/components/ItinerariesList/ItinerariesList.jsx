import { useContext, useState } from "react"
import { Col, Row, Button, Modal, Container } from "react-bootstrap"
import { Link } from 'react-router-dom'
import ItineraryCard from "../ItineraryCard/ItineraryCard"
import { ItinerariesContext } from '../../contexts/itinerary.context'
import { AuthContext } from './../../contexts/auth.context'
import NewItineraryForm from "../NewItineraryForm/NewItineraryForm"
import './ItinerariesList.css'

const ItinerariesList = () => {

    const { itineraries } = useContext(ItinerariesContext)

    const { user } = useContext(AuthContext)
    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
    }

    return (

        <Container>
            <Row className="mt-5 route-row">
                {
                    !user
                        ?
                        <>
                            <Link to={'/iniciar-sesion'}>
                                <Button className="fill create-route-button" variant="gray" size="sm">Crea tu propia ruta</Button>
                            </Link>
                        </>
                        :
                        <>
                            <Row className="d-flex justify-content-center">
                                <Button className="fill create-route-button" onClick={openModal} variant="gray">Crea tu propia ruta</Button>
                                <Modal show={showModal} onHide={closeModal}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Nueva ruta</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <NewItineraryForm fireFinalActions={fireFinalActions} />
                                    </Modal.Body>
                                </Modal>
                            </Row>
                        </>
                }
                {itineraries.map(elm => {
                    return (
                        <Col sm={{ span: 4 }} key={elm._id} >
                            <ItineraryCard {...elm} />
                        </Col>
                    )
                })}

            </Row>
        </Container>
    )
}

export default ItinerariesList