import { useState, useContext, useEffect } from "react"
import { Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import itineraryService from "../../services/itineraries.service"
import uploadServices from "../../services/upload.service"
import { MessageContext } from './../../contexts/userMessage.context'
import PlacesAutocomplete from 'react-places-autocomplete';
import { geocodeByAddress, geocodeByPlaceId, getLatLng } from 'react-places-autocomplete';




const EditItineraryForm = ({ itinerary_id, closeModal }) => {

    const [itineraryData, setItineraryData] = useState({})

    useEffect(() => {
        itineraryService
            .getOneItinerary(itinerary_id)
            .then(({ data }) => setItineraryData(data))
            .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate()

    const handleAutoCompleteCity = async value => {
        setItineraryData({ ...itineraryData, city: value })
    }

    const handleInputChange = e => {
        const { name, value } = e.target
        setItineraryData({ ...itineraryData, [name]: value })
    }

    const handleCheckboxChange = e => {
        console.log(e.target.checked)
        const { name, checked } = e.target
        setItineraryData({ ...itineraryData, [name]: checked })
    }

    const [loadingImage, setLoadingImage] = useState(false)

    const handleFileUpload = e => {

        setLoadingImage(true)

        const formData = new FormData()
        formData.append('imageData', e.target.files[0])

        uploadServices
            .uploadimage(formData)
            .then(res => {
                setItineraryData({ ...itineraryData, images: res.data.cloudinary_url })
                setLoadingImage(false)
            })
            .catch(err => console.log(err))
    }

    const handleFormSubmit = e => {
        e.preventDefault()

        itineraryService
            .editItinerary(itinerary_id, itineraryData)
            .then(() => {
                navigate(`/detalles/${itinerary_id}`)
                closeModal()
            })
            .catch(err => console.error(err))
    }



    const { city, transport, category, title, duration, pets, description, images } = itineraryData

    return (
        <Form onSubmit={handleFormSubmit}>
            <PlacesAutocomplete
                value={city}
                onChange={handleAutoCompleteCity}
                onSelect={handleAutoCompleteCity}
            >
                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>

                        <Form.Group className="mb-3" controlId="name">
                            <Form.Label>Ciudad</Form.Label>
                            <input {...getInputProps({ placeholder: "Escriba la ciudad" })} className="form-control" />
                        </Form.Group>
                        <div>
                            {loading ? <div>...Cargando</div> : null}
                            {suggestions.map(suggestion => {
                                const style = {
                                    backgroundColor: suggestion.active ? "#F5EBE0" : '#fff'
                                }
                                return <div {...getSuggestionItemProps(suggestion, { style })}>
                                    {suggestion.description}
                                </div>
                            })}
                        </div>
                    </div>
                )}
            </PlacesAutocomplete>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Medio de transporte</Form.Label>
                <Form.Select className="mb-3" aria-label="transport" value={transport} onChange={handleInputChange} name="transport">
                    <option>Elige el medio de transporte...</option>
                    <option>Andando</option>
                    <option>En bici</option>
                    <option>En coche</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="name">
                <Form.Label>Categoría</Form.Label>
                <Form.Select className="mb-3" aria-label="category" value={category} onChange={handleInputChange} name="category">
                    <option>Elige la categoría de tu ruta...</option>
                    <option>Arte</option>
                    <option>Gastronomia</option>
                    <option>Naturaleza</option>
                    <option>Ocio nocturno</option>
                    <option>Playas</option>
                    <option>Turismo rural</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Nombre de la ruta</Form.Label>
                <Form.Control type="text" value={title} onChange={handleInputChange} name="title" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Duración</Form.Label>
                <Form.Control type="text" value={duration} onChange={handleInputChange} name="duration" />
            </Form.Group>

            <div key={`default-checkbox`} className="mb-3" value={pets}>
                <Form.Check
                    onChange={handleCheckboxChange}
                    type={'checkbox'}
                    id={`default-checkbox`}
                    label={`Se puede realizar con animales`}
                    name='pets'
                />

            </div>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Descripción</Form.Label>
                <Form.Control type="text area" value={description} onChange={handleInputChange} name="description" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="desc">
                <Form.Label>Imágenes</Form.Label>
                <Form.Control type="file" multiple onChange={handleFileUpload} />
            </Form.Group>

            <div className="d-grid">
                <Button className="create-button" type="submit" disabled={loadingImage}>{loadingImage ? 'Subiendo imagen...' : 'Editar itinerario'}</Button>
            </div>

        </Form>
    )
}

export default EditItineraryForm