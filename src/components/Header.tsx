import { useEffect } from 'react';
import { Layout as AntLayout, Input } from 'antd';
import styled from 'styled-components';
import { useMapStore } from '../pages/map/store';
import { emit } from '../pages/map/mediator';

const { Header: AntHeader } = AntLayout;

const StyledHeader = styled(AntHeader)`
  display: flex;
`;

const Logo = styled.h2`
  color: #fff;
`;

const SearchBox = styled(Input).attrs({
  type: 'text',
  id: 'searchbox',
  placeholder: 'Search Places',
})`
  margin: 10px 20px;
  width: 300px;
`;

export function Header() {
  const [{ googleApiLoaded }] = useMapStore();

  useEffect(() => {
    if (googleApiLoaded) {
      const input = document.getElementById('searchbox') as HTMLInputElement;
      const searchBox = new google.maps.places.SearchBox(input);

      searchBox.addListener('places_changed', () => {
        const selectedPlace = searchBox.getPlaces()[0];
        const location = selectedPlace.geometry?.location.toJSON();
        if (location) {
          emit('placeSelected', location);
        }
      });
    }
  }, [googleApiLoaded]);

  return (
    <StyledHeader>
      <Logo>Wikipedia Map</Logo>
      <SearchBox />
    </StyledHeader>
  );
}
