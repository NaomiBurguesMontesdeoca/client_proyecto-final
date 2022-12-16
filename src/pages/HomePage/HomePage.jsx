import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import './HomePage.css'
import { Card } from 'react-bootstrap'
import SelectSupplier from '../../components/SelectSupplier/SelectSupplier'

const HomePage = () => {

    return (
        <div className='main-div-home-page'>

            <Container fluid className="margin-card">

                <h1 className='home-page-title'>Destinos destacados</h1>

                <SelectSupplier />

                <Row>
                    <Col >
                        <Card className="bg-gray card-size">
                            <Link to="/itinerario/Madrid,%20España">
                                <Card.Img src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670489152/Proyecto%20Final%20IH/HomePage/HomePageMadrid.jpg" alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title className='card-title-home'>MADRID</Card.Title>
                                </Card.ImgOverlay>
                            </Link>
                        </Card>
                    </Col>
                    <Col >
                        <Card className="bg-gray card-size">
                            <Link to="/itinerario/Roma,%20Italia">
                                <Card.Img src="https://res.cloudinary.com/drcjyzigg/image/upload/v1671033742/Proyecto%20Final%20IH/HomePage/RomaHomePage.jpg" alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title className='card-title-home'>ROMA</Card.Title>
                                </Card.ImgOverlay>
                            </Link>
                        </Card>
                    </Col>
                    <Col >
                        <Card className="bg-gray card-size">
                            <Link to="/itinerario/Ámsterdam,%20Países%20Bajos">
                                <Card.Img src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670490709/Proyecto%20Final%20IH/HomePage/HomePageAmsterdam.jpg" alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title className='card-title-home'>AMSTERDAM</Card.Title>
                                </Card.ImgOverlay>
                            </Link>
                        </Card>
                    </Col>
                    <Row>
                        <Container fluid className="margin-card">

                        </Container>
                    </Row>
                    <Col >
                        <Card className="bg-gray card-size">
                            <Link to="/itinerario/Nueva%20York,%20NY,%20USA">
                                <Card.Img src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670491258/Proyecto%20Final%20IH/HomePage/HomePageNY.webp" alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title className='card-title-home'>NUEVA YORK</Card.Title>
                                </Card.ImgOverlay>
                            </Link>
                        </Card>
                    </Col>
                    <Col >
                        <Card className="bg-gray card-size">
                            <Link to="/itinerario/París,%20Francia">
                                <Card.Img src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670490638/Proyecto%20Final%20IH/HomePage/HomePageParis.jpg" alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title className='card-title-home'>PARíS</Card.Title>
                                </Card.ImgOverlay>
                            </Link>
                        </Card>
                    </Col>
                    <Col >
                        <Card className="bg-gray card-size">
                            <Link to="/itinerario/Londres,%20Reino%20Unido">
                                <Card.Img src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670490562/Proyecto%20Final%20IH/HomePage/HomePageLondres.jpg" alt="Card image" />
                                <Card.ImgOverlay>
                                    <Card.Title className='card-title-home'>LONDRES</Card.Title>
                                </Card.ImgOverlay>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div >
    )
}
export default HomePage