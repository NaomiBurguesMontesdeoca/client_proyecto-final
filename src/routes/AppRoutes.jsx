import { Routes, Route } from "react-router-dom"
import HomePage from "../pages/HomePage/HomePage"
import SignupPage from "../pages/SignupPage/SignupPage"
import LoginPage from "../pages/LoginPage/LoginPage"
import ItineraryType from "../components/ItinerariesType/ItinerariesType"
import ItineraryEditPage from "../pages/ItineraryEditPage/ItineraryEditPage"
import DestinationsPage from "../pages/DestinationsPage/DestinationsPage"
import ItineraryDetailsPage from "../pages/ItineraryDetailsPage/ItineraryDetailsPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"

const AppRoutes = () => {

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/destinos" element={<DestinationsPage />} />
            <Route path="/itinerario/:hostcity" element={< ItineraryType />} />
            <Route path="/detalles/:itinerary_id" element={<ItineraryDetailsPage />} />
            <Route path="/editar/:itinerary_id" element={< ItineraryEditPage />} />
            <Route path="/detalles/:evento_id" element={<p>DETALLES EVENTO</p>} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/perfil" element={<ProfilePage />} />
            <Route path="/*" element={<h1>404</h1>} />
        </Routes>
    )
}

export default AppRoutes