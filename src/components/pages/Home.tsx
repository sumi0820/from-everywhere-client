import ItemList from 'components/templates/ItemList';
import MainVisual from 'components/templates/MainVisual';
import { VFC } from 'react';
import useGetItems from 'hooks/use-get-items';
import Spinner from 'components/atoms/Spinner';

const Home: VFC = () => {
  const { latestItems, isLoading } = useGetItems();

  return (
    <>
      <MainVisual />
      {isLoading ? <Spinner /> : <ItemList {...{ latestItems }} />}
    </>
  );
};

export default Home;
