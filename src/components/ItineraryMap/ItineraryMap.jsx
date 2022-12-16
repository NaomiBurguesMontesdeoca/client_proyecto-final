import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api'
import { useCallback, useEffect } from 'react'
import '../ItineraryMap/ItineraryMap.css'
import { useState } from 'react'

const containerStyle = {
    width: '100%',
    height: '500px'
}

function MyMap({ locations }) {
    const stops = []
    locations.forEach((elm, idx) => {
        console.log(idx !== 0)
        if (idx !== 0 && idx !== locations.length - 1) {
            console.log(elm)
            return stops.push({ location: { lat: elm.coordinates[0], lng: elm.coordinates[1] } })
        }
    })

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries: ['places']
    })

    useEffect(() => {

    }, [isLoaded])

    const position = {
        lat: locations[0].coordinates[0],
        lng: locations[0].coordinates[1]
    }

    const [map, setMap] = useState(null)

    const MarkeronLoad = (marker) => {
        console.log('marker', marker)
    }

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(position)
        const zoom = 8
        map.fitBounds(bounds)
        map.setZoom(zoom)
        setMap(map)
    }, [])

    const OPTIONS = {
        minZoom: 4,
        maxZoom: 15
    }

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const [directionsResponse, setDirectionsResponse] = useState(null)

    async function calculateRoute() {

        try {

            // eslint-disable-next-line no-undef
            const directionsService = new google.maps.DirectionsService()



            const results = await directionsService.route({
                origin: { lat: locations[0].coordinates[0], lng: locations[0].coordinates[1] },
                destination: { lat: locations[locations.length - 1].coordinates[0], lng: locations[locations.length - 1].coordinates[1] },
                // eslint-disable-next-line no-undef
                travelMode: 'WALKING',
                waypoints: stops
            })


            setDirectionsResponse(results)
        } catch (err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        calculateRoute()
    }, [])


    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            position={position}
            options={OPTIONS}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <>
            </>
            {locations.map((elm) => {
                return (<Marker onLoad={MarkeronLoad} position={{ lat: elm.coordinates[0], lng: elm.coordinates[1] }} />)
            })
            }
            directionsResponse && <DirectionsRenderer directions={directionsResponse}

            />
        </GoogleMap>
    ) : <></>
}

export default MyMap


