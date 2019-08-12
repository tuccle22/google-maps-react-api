import React from 'react'
import { useRoutes } from 'hookrouter'
import Layout from './Layout';
import MainMap from './maps/MainMap/MainMap';
import InfoWindowExample from './maps/InfoWindowExample';

import './App.css'

const routes = {
  '/': () => <MainMap />,
  '/info-window': () => <InfoWindowExample />,
};

function App() {
  const routeResult = useRoutes(routes);
  return (
    <Layout>
      {routeResult || <h2>Not Found</h2>}
    </Layout>
  );
}

export default App;