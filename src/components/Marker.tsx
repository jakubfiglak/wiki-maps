import styled from 'styled-components';
import { Tooltip } from 'antd';
import { emit } from '../pages/map/mediator';
import { Color } from '../types';

type CircleProps = { color: Color };
type MarkerProps = {
  lat: number;
  lng: number;
  title: string;
  pageId: number;
  color?: Color;
};

const colors = {
  orange: {
    background: '#ff7e23e0',
    shadow: '#ffa769',
  },
  blue: {
    background: '#237bffe0',
    shadow: '#698bff',
  },
};

const Circle = styled.div<CircleProps>`
  background-color: ${({ color }) => colors[color].background};
  border-radius: 50%;
  width: 30px;
  height: 30px;
  box-shadow: 0px 0px 5px ${({ color }) => colors[color].shadow};
  opacity: 0.7;
  transition: all 0.2s ease-in;
  cursor: pointer;
  transform: scale(0.95);

  &:hover {
    opacity: 1;
    transform: scale(1);
  }
`;

export function Marker({
  lat,
  lng,
  title,
  pageId,
  color = 'orange',
}: MarkerProps) {
  function handleClick() {
    emit('markerClicked', pageId);
  }

  return (
    <Tooltip title={title}>
      <Circle onClick={handleClick} color={color} />
    </Tooltip>
  );
}
