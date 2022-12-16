import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./Calendar.css";
import { Modal, Button } from "react-bootstrap";
import eventService from "../../services/events.service";


const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});


const EventCalendar = ({ filterEvent, events }) => {

    const [eventInfo, setEventInfo] = useState('')
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        filterEvent()

    }, [])


    const openModal = () => setShowModal(true)
    const closeModal = () => setShowModal(false)

    const fireFinalActions = () => {
        closeModal()
        filterEvent()
    }


    const handleSelectedEvent = (e) => {
        setEventInfo(e)
    }

    const joinToAnEvent = (id) => {

        eventService
            .joinEvent(id)
            .then(() => closeModal())
            .catch(err => console.log(err))

    }

    const unJoinToAnEvent = (id) => {

        eventService
            .unJoinEvent(id)
            .then(() => closeModal())
            .catch(err => console.log(err))

    }

    return (
        <div className="App">
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: "50px" }}
                onDoubleClickEvent={openModal}
                onSelectEvent={(e) => handleSelectedEvent(e)}

            />
            < Modal show={showModal} onHide={closeModal} >
                <Modal.Header closeButton>
                    <Modal.Title className="calendar-event-title">Datos de tu evento</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h2 className="calendar-event-title">{eventInfo.title}</h2>
                    <p className="calendar-event-description">{eventInfo.description}</p>
                    <Button onClick={() => joinToAnEvent(eventInfo.id)} variant="dark" size="sm">Asistir</Button>
                    <Button onClick={() => unJoinToAnEvent(eventInfo.id)} variant="dark" size="sm">No asistir</Button>
                </Modal.Body>
            </Modal >
        </div>
    );
}

export default EventCalendar;
