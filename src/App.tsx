import { VFC } from 'react';
import { Route, Routes } from 'react-router';
import { Container } from 'semantic-ui-react';

import Landing from 'components/pages/Landing';
import Auth from 'components/pages/Auth';
import Header from 'components/atoms/Header';
import Others from 'components/pages/Others';

import './App.css';

const App: VFC = () => (
  <>
    <Header />
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/others" element={<Others />} />
      </Routes>
    </Container>
  </>
);

export default App;
