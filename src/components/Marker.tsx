import styled from 'styled-components';

const Circle = styled.div`
  background-color: #ff7e23e0;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px #ffa769;
  opacity: 0.7;
`;

type Props = {
  lat: number;
  lng: number;
  text?: string;
};

export function Marker({ lat, lng, text }: Props) {
  return <Circle />;
}
