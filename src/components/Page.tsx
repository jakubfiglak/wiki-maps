import { Layout as AntLayout } from 'antd';
import styled from 'styled-components';

const { Header, Content, Footer } = AntLayout;

const Logo = styled.h2`
  color: #fff;
`;

const Inner = styled(Content)`
  min-height: 280px;
  padding: 24px;
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
        <div className="site-layout-content">Content</div>
      </Inner>
      <FooterComponent>Netguru College React</FooterComponent>
    </Layout>
  );
}
