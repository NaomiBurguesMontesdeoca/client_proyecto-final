import { useState, useEffect, useContext } from 'react'
import itineraryService from '../../services/itineraries.service'
import { MessageContext } from './../../contexts/userMessage.context'
import { useParams, useNavigate } from "react-router-dom"
import { Button, Modal } from 'react-bootstrap'
import EditItineraryForm from '../../components/EditItineraryForm/EditItineraryForm'


const ItineraryEditPage = (props) => {
    const [itinerary, setItinerary] = useState()
    const [showModal, setShowModal] = useState(false)

    const { itinerary_id } = useParams();

    const { setShowToast, setToastMessage } = useContext(MessageContext)
    const navigate = useNavigate()

    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    useEffect(() => {
        itineraryService
            .getOneItinerary(itinerary_id)
            .then(({ data }) => setItinerary(data))
            .catch((error) => console.log(error));

    }, [itinerary_id]);

    const handleFormSubmit = e => {
        e.preventDefault()

        itineraryService
            .editItinerary(itinerary_id, itinerary)
            .then(() => {
                setShowToast(true)
                setToastMessage('Ruta editada correctamente')
                // fireFinalActions()
                closeModal()

                navigate(`/detalles/${itinerary_id}`)
            })
            .catch(err => console.error(err))
    }

    return (
        <div>
            <Button onClick={openModal}>Edit </Button>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Editar Ruta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditItineraryForm itinerary={itinerary} setItinerary={setItinerary} handleFormSubmit={handleFormSubmit} />
                </Modal.Body>
            </Modal>
        </div>

    )
}

export default ItineraryEditPage
