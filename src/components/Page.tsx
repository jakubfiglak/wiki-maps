import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import { GoogleMap } from './GoogleMap';
import { Header } from './Header';
import { ArticleModal } from './ArticleModal';

const { Content, Footer } = AntLayout;

const Inner = styled(Content)`
  min-height: 280px;
  padding: 0;
  background: #fff;
`;

const Layout = styled(AntLayout)`
  min-height: 100vh;
`;

const FooterComponent = styled(Footer)`
  text-align: center;
`;

export function Page() {
  return (
    <Layout>
      <Header />
      <Inner>
        <GoogleMap />
        <ArticleModal />
      </Inner>
      <FooterComponent>Netguru College React</FooterComponent>
    </Layout>
  );
}
