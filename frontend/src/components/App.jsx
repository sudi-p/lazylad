import React from 'react';
import AppHeader from './headers/AppHeader';
import LandingFooter from './footers/LandingFooter';
import FloatingHeader from './headers/FloatingHeader';
import Main from './Main';
import Main2 from './Main2';
import 'antd/dist/antd.css';
import { Layout } from 'antd';

const { Content } = Layout;


const LoggedInView = () => (
  <Layout>
    <AppHeader />
    <Layout style={{ marginLeft: 200, 'backgroundColor': '#fff' }}>
      <Content style={{ margin: '24px 50px', overflow: 'initial' }}>
        <Main />
      </Content>
    </Layout>
    
  </Layout>
);


const SignupView = () => (
  <Layout style={{ background: 'white' }}>
    <FloatingHeader />
    <Main2 />
    <LandingFooter />
  </Layout>
);


const App = () => (
    window.isLoggedIn ?  <LoggedInView />:<SignupView />
);

export default App