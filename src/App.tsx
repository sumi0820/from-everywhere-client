import { VFC } from 'react';
import { Route, Routes } from 'react-router';
import { Container } from 'semantic-ui-react';

import Landing from 'components/pages/Landing';

import './App.css';
import Home from 'components/pages/Home';
import ItemDetail from 'components/pages/ItemDetail';
import UserDetail from 'components/pages/UserDetail';

const App: VFC = () => (
  <>
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/item/:itemId" element={<ItemDetail />} />
        <Route path="/user/:userId" element={<UserDetail />} />
      </Routes>
    </Container>
  </>
);

export default App;
