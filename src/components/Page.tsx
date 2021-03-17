import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';
import { GoogleMap } from './GoogleMap';

const { Header, Content, Footer } = AntLayout;

const Logo = styled.h2`
  color: #fff;
`;

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
      <Header>
        <Logo>Wikipedia Map</Logo>
      </Header>
      <Inner>
        <GoogleMap />
      </Inner>
      <FooterComponent>Netguru College React</FooterComponent>
    </Layout>
  );
}
