import { useEffect, useState } from 'react';
import GoogleMapReact, { Coords } from 'google-map-react';
import { Marker } from '../Marker';
import { emit } from '../../pages/map/mediator';
import { useMapStore } from '../../pages/map/store';
import { styles } from './styles';

const losAngelesPosition: Coords = {
  lat: 34.052235,
  lng: -118.243683,
};

const defaultZoom = 10;

export function GoogleMap() {
  const [userLocation, setUserLocation] = useState(losAngelesPosition);

  const [{ markers }] = useMapStore();

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
          libraries: ['places'],
        }}
        defaultCenter={losAngelesPosition}
        defaultZoom={defaultZoom}
        center={userLocation}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => emit('mapLoaded', map)}
        options={{ styles: styles.tinia }}
      >
        {markers.map(({ pageid, lat, lng, title, color }) => (
          <Marker
            key={pageid}
            lat={lat}
            lng={lng}
            title={title}
            pageId={pageid}
            color={color}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
