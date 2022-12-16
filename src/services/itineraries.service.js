import axios from 'axios'

class ItineraryService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/itineraries`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getItineraries() {
        return this.api.get('/getAllItineraries')
    }

    getOneItinerary(itinerary_id) {
        return this.api.get(`/getOneItinerary/${itinerary_id}`)
    }

    saveItinerary(itineraryData) {
        return this.api.post('/saveItinerary', itineraryData)
    }

    getFilteredItineraries(city, category) {
        return this.api.get(`/filtered?city=${city}&category=${category}`)
    }

    editItinerary(itinerary_id, body) {
        return this.api.put(`/edit/${itinerary_id}`, body)
    }

    deleteItinerary(itinerary_id) {
        return this.api.delete(`/delete/${itinerary_id}`)
    }

    getAllDestinations() {
        return this.api.get('/getAllDestinations')
    }

    getOwnedItineraries() {
        return this.api.get('/getOwnedItineraries')
    }

    getFavsItineraries() {
        return this.api.get('/getFavsItineraries')
    }

    addFav(itinerary_id) {
        return this.api.put(`/addFav/${itinerary_id}`)
    }

    deleteFav(itinerary_id) {
        return this.api.put(`/deleteFav/${itinerary_id}`)
    }
}

const itineraryService = new ItineraryService()

export default itineraryService