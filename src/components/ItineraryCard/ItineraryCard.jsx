import './ItineraryCard.css'
import { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { Button, ButtonGroup, Modal } from 'react-bootstrap';
import Card from 'react-bootstrap/Card'
import { AuthContext } from './../../contexts/auth.context'
import { MessageContext } from './../../contexts/userMessage.context'
import itineraryService from '../../services/itineraries.service'
import { ItinerariesContext } from '../../contexts/itinerary.context';
import EditItineraryForm from '../../components/EditItineraryForm/EditItineraryForm'

function ItineraryCard({ city, transport, _id, owner, images, title, category }) {

    const { loadItineraries } = useContext(ItinerariesContext)

    const { setShowToast, setToastMessage } = useContext(MessageContext)

    const { user } = useContext(AuthContext)

    const deleteItinerary = e => {
        e.preventDefault()

        itineraryService
            .deleteItinerary(_id)
            .then(() => {
                setShowToast(true)
                setToastMessage('Ruta eliminada correctamente')
                loadItineraries(city, category)

            })
            .catch(err => console.error(err))
    }

    const [showModal, setShowModal] = useState(false)

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    return (
        <>
            {
                !user
                    ?
                    < Card className="mb-4 ItineraryCard">
                        <Card.Img variant="top" src={images} />
                        <Link to={`/iniciar-sesion`}>
                            <div>
                                <Card.Title className='itinerary-card-title'>{title}</Card.Title>
                            </div>
                        </Link>
                    </Card>
                    :

                    < Card className="mb-4 itinerary-card">
                        <Card.Img className='itinerary-image' variant="top" src={images} />
                        <Card.Body>
                            <Link to={`/detalles/${_id}`}>
                                <div>
                                    <Card.Title className='itinerary-card-title'>{title}</Card.Title>
                                </div>
                            </Link>
                            {
                                !owner || owner != user?._id
                                    ?
                                    <>
                                    </>
                                    :
                                    <>
                                        <div className="d-grid">
                                            <ButtonGroup aria-label="Basic example">
                                                <Button className="fill-card itinerary-button d-flex align-items-center justify-content-center" variant="gray" onClick={openModal}>Editar</Button>
                                                <>
                                                    <Button className="fill-card itinerary-button d-flex align-items-center justify-content-center" variant="gray" onClick={deleteItinerary}>Eliminar</Button>

                                                    <Modal show={showModal} onHide={closeModal}>
                                                        <Modal.Header closeButton>
                                                            <Modal.Title>Editar Ruta</Modal.Title>
                                                        </Modal.Header>
                                                        <Modal.Body>
                                                            <EditItineraryForm itinerary_id={_id} closeModal={closeModal} />
                                                        </Modal.Body>
                                                    </Modal>
                                                </>
                                            </ButtonGroup>
                                        </div>
                                    </>
                            }
                        </Card.Body>
                    </Card>
            }
        </>
    );
}

export default ItineraryCard;