import GoogleMapReact, { Coords } from 'google-map-react';

const poznanPosition: Coords = {
  lat: 52.4006164,
  lng: 16.6214907,
};

const defaultZoom = 10;

export function GoogleMap() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: process.env.REACT_APP_GOOGLE_API_KEY as string,
        }}
        defaultCenter={poznanPosition}
        defaultZoom={defaultZoom}
      ></GoogleMapReact>
    </div>
  );
}
