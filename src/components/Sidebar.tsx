import { Drawer, Button, List } from 'antd';
import { DoubleRightOutlined, PushpinOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useMapStore } from '../pages/map/store';
import { emit } from '../pages/map/mediator';
import ArticlesDatabase from '../services/ArticlesDatabase';

const Container = styled.aside`
  position: fixed;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
`;

const IconButton = styled(Button)`
  background: none;
  color: #fff;
  border-color: #fff;
`;

export function Sidebar() {
  const [{ isSidebarOpen }, { setSidebarOpen }] = useMapStore();

  return (
    <Container>
      <IconButton
        type="primary"
        size="large"
        onClick={() => setSidebarOpen(true)}
        shape="circle"
        icon={<DoubleRightOutlined />}
      />
      <Drawer
        title="Visited Places"
        placement="left"
        closable={false}
        onClose={() => setSidebarOpen(false)}
        visible={isSidebarOpen}
      >
        <List
          itemLayout="horizontal"
          dataSource={ArticlesDatabase.articles}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Button
                    onClick={() => {
                      emit('placeSelected', {
                        lat: item.coords.lat,
                        lng: item.coords.lng,
                      });
                      setSidebarOpen(false);
                    }}
                    shape="circle"
                    type="primary"
                    icon={<PushpinOutlined />}
                  />
                }
                title={item.title}
                description={`Visited: ${item.readDate}`}
              />
            </List.Item>
          )}
        />
      </Drawer>
    </Container>
  );
}
