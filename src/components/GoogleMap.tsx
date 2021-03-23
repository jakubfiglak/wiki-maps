import { useEffect, useState } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { Marker } from './Marker';
import { emit } from '../pages/map/mediator';
import { useMapStore } from '../pages/map/store';

const losAngelesPosition: Coords = {
  lat: 34.052235,
  lng: -118.243683,
};

const defaultZoom = 10;

export function GoogleMap() {
  const [userLocation, setUserLocation] = useState(losAngelesPosition);

  const [{ markers }] = useMapStore();

  useEffect(() => {
    emit('mapLoaded', userLocation);
  }, [userLocation]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) =>
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        }),
      (error) => console.error(error)
    );
  }, []);

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY as string,
        }}
        defaultCenter={losAngelesPosition}
        center={userLocation}
        defaultZoom={defaultZoom}
        onChange={(e) => emit('mapDragged', e.center)}
      >
        {markers.map((marker) => (
          <Marker key={marker.pageid} lat={marker.lat} lng={marker.lng} />
        ))}
      </GoogleMapReact>
    </div>
  );
}
