import React from "react"
import Select from 'react-select'
import './SelectSupplier.css'
import itineraryService from '../../services/itineraries.service'
import { useState, useEffect } from 'react'
import { Navigate, useNavigate } from "react-router-dom"


const SelectSupplier = () => {

    const [destinations, setDestinations] = useState()

    const printDestinations = () => {

        itineraryService
            .getAllDestinations()
            .then(response => {
                const mapDestinations = response.data.cities.map(elm => { return { 'label': elm, 'value': elm } })
                setDestinations(mapDestinations)
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        printDestinations()
    }, [])

    const navigate = useNavigate()

    const handleSelectChange = ({ value }) => {
        navigate(`/itinerario/${value}`)
    }


    return (
        <div className="Suppliers-container">
            <Select placeholder='buscar por destino...'
                options={destinations}
                onChange={handleSelectChange}
            />
        </div>
    )
}

export default SelectSupplier