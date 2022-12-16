import './Navigation.css'
import { Nav, Navbar, NavDropdown, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth.context'

const Navigation = () => {

    const { user, logoutUser } = useContext(AuthContext)

    return (
        <Navbar className='color-nav' expand="lg">
            <Link to="/">
                <img className='logo-img' src="https://res.cloudinary.com/drcjyzigg/image/upload/v1670495264/Proyecto%20Final%20IH/LiitLogo.png"></img>
            </Link>
            <Link to="/">
                <Navbar.Brand className='brand-name' as='div'>Liit</Navbar.Brand>
            </Link>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Link to="/destinos">
                        <Nav.Link as='div'>Todos los destinos</Nav.Link>
                    </Link>
                </Nav>

                <Form className="me-5">
                    <NavDropdown title={!user ? 'Acceso' : user.username} align="end">
                        {
                            !user
                                ?
                                <>
                                    <Link to="/registro">
                                        <Nav.Link className='dropdown-text ' as='div'>Registro</Nav.Link>
                                    </Link>
                                    <Link to="/iniciar-sesion">
                                        <Nav.Link className='dropdown-text' as='div'>Iniciar sesión</Nav.Link>
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to="/perfil">
                                        {user && <Nav.Link className='dropdown-text' as='div'>Perfil</Nav.Link>}
                                    </Link>
                                    <Link to="/">
                                        {user && <Nav.Link className='dropdown-text' as='div' onClick={logoutUser}>Cerrar sesión</Nav.Link>}
                                    </Link>
                                </>
                        }
                    </NavDropdown>
                </Form>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Navigation