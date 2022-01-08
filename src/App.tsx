import { VFC } from 'react';
import { Route, Routes } from 'react-router';
import { Container } from 'semantic-ui-react';

import Landing from 'components/pages/Landing';

import './App.css';
import Home from 'components/pages/Home';
import ItemDetail from 'components/pages/ItemDetail';
import UserDetail from 'components/pages/UserDetail';
import UserEdit from 'components/pages/UserEdit';
import ItemEdit from 'components/pages/ItemEdit';
import RequireAuth from 'RequireAuth';

const App: VFC = () => (
  <>
    <Container>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo="/">
              <Home />
            </RequireAuth>
          }
        />
        <Route path="/item/:itemId" element={<ItemDetail />} />
        <Route path="/user/:userId" element={<UserDetail />} />
        <Route path="/item/edit" element={<ItemEdit />} />
        <Route path="/user/edit" element={<UserEdit />} />
      </Routes>
    </Container>
  </>
);

export default App;
