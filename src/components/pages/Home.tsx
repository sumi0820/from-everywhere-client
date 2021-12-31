import ItemList from 'components/templates/ItemList';
import MainVisual from 'components/templates/MainVisual';
import { VFC } from 'react';
import useGetItems from 'hooks/use-get-items';
import Spinner from 'components/atoms/Spinner';
import BurgerMenu from 'components/atoms/BurgerMenu';
import Footer from 'components/atoms/Footer';

const Home: VFC = () => {
  const { latestItems, isLoading } = useGetItems();

  return (
    <>
      <BurgerMenu />
      <MainVisual />
      {isLoading ? <Spinner /> : <ItemList {...{ latestItems }} />}
      <Footer />
    </>
  );
};

export default Home;
