import './ItineraryDetailsCard.css'
import Card from 'react-bootstrap/Card'
import { Col, Container, Row } from 'react-bootstrap';


function ItineraryDetailsCard({ itinerary }) {

    return (
        <Container fluid className='mt-4'>
            <Row className="mb-4 itinerary-details-card">
                <Col md={{ span: 5 }}>
                    <Card.Img variant="top" src={itinerary.images} />
                </Col>
                <Col md={{ span: 5 }} >
                    <h3 className='details-title details-elements'>{itinerary.title}</h3>
                    <p className='details-elements'>{itinerary.city}</p>
                    <p className='details-elements'>Medio de transporte: {itinerary.transport}</p>
                    <p className='details-elements'>Categoría: {itinerary.category}</p>
                    <p className='details-elements'>Duración de la ruta: {itinerary.duration}</p>
                    <p className='details-elements'>Se puede realizar con mascotas: {itinerary.pets ? 'si' : 'no'}</p>
                    <article className='text-start'>Descripción: {itinerary.description}</article>
                    <p className='details-elements mt-3'>Valora esta ruta:</p>
                    <fieldset class="rating">
                        <input type="radio" id="star5" name="rating" value="5" /><label class="full" for="star5" title="Awesome - 5 stars"></label>
                        <input type="radio" id="star4half" name="rating" value="4 and a half" /><label class="half" for="star4half" title="Pretty good - 4.5 stars"></label>
                        <input type="radio" id="star4" name="rating" value="4" /><label class="full" for="star4" title="Pretty good - 4 stars"></label>
                        <input type="radio" id="star3half" name="rating" value="3 and a half" /><label class="half" for="star3half" title="Meh - 3.5 stars"></label>
                        <input type="radio" id="star3" name="rating" value="3" /><label class="full" for="star3" title="Meh - 3 stars"></label>
                        <input type="radio" id="star2half" name="rating" value="2 and a half" /><label class="half" for="star2half" title="Kinda bad - 2.5 stars"></label>
                        <input type="radio" id="star2" name="rating" value="2" /><label class="full" for="star2" title="Kinda bad - 2 stars"></label>
                        <input type="radio" id="star1half" name="rating" value="1 and a half" /><label class="half" for="star1half" title="Meh - 1.5 stars"></label>
                        <input type="radio" id="star1" name="rating" value="1" /><label class="full" for="star1" title="Sucks big time - 1 star"></label>
                        <input type="radio" id="starhalf" name="rating" value="half" /><label class="half" for="starhalf" title="Sucks big time - 0.5 stars"></label>
                    </fieldset>
                </Col>
            </Row>
        </Container >
    );
}

export default ItineraryDetailsCard