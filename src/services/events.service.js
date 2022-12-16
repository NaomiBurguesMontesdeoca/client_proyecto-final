import axios from 'axios'

class EventService {

    constructor() {

        this.api = axios.create({
            baseURL: `${process.env.REACT_APP_API_URL}/events`
        })

        this.api.interceptors.request.use((config) => {

            const storedToken = localStorage.getItem('authToken')

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` }
            }

            return config
        })
    }

    getEvents() {
        return this.api.get('/getAllEvents')
    }

    getOneEvent(event_id) {
        return this.api.get(`/getOneEvent/${event_id}`)
    }

    joinEvent(event_id) {
        return this.api.put(`/joinEvent/${event_id}`)
    }

    unJoinEvent(event_id) {
        return this.api.put(`/unJoinEvent/${event_id}`)
    }

    saveEvent(eventData) {
        return this.api.post('/saveEvent', eventData)
    }

    getJoinedEvents() {
        return this.api.get('/joinedEvents')
    }
}

const eventService = new EventService()

export default eventService