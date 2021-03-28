import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import { GoogleMap } from './GoogleMap/GoogleMap';
import { Header } from './Header';
import { ArticleModal } from './ArticleModal';
import { Sidebar } from './Sidebar';

const { Content, Footer } = AntLayout;

const Layout = styled(AntLayout)`
  height: 100vh;
`;

const FooterComponent = styled(Footer)`
  text-align: center;
`;

export function Page() {
  return (
    <Layout>
      <Header />
      <Content>
        <GoogleMap />
        <Sidebar />
        <ArticleModal />
      </Content>
      <FooterComponent>Netguru College React</FooterComponent>
    </Layout>
  );
}
