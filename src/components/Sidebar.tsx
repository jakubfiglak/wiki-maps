import { Drawer, Button } from 'antd';
import { DoubleRightOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useMapStore } from '../pages/map/store';
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
        {ArticlesDatabase.articles.map((article) => (
          <p>{article}</p>
        ))}
      </Drawer>
    </Container>
  );
}
