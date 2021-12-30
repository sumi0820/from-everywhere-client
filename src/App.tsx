import { VFC } from 'react';
import { Route, Routes } from 'react-router';
import { Container } from 'semantic-ui-react';

import Landing from 'components/pages/Landing';
import BurgerMenu from 'components/atoms/BurgerMenu';
import Others from 'components/pages/Others';

import './App.css';
import Home from 'components/pages/Home';

const App: VFC = () => (
  <>
    <Container>
    <BurgerMenu />

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/others" element={<Others />} />
      </Routes>
    </Container>
  </>
);

export default App;
