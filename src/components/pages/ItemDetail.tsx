import BurgerMenu from 'components/atoms/BurgerMenu';
import Footer from 'components/atoms/Footer';
import { VFC } from 'react';
import Header from 'components/atoms/Header';
import useGetItem from 'hooks/use-get-item';
import Spinner from 'components/atoms/Spinner';
import Item from 'components/templates/Item';
import { useParams } from 'react-router-dom';

const ItemDetail: VFC = () => {
  const { itemId = '' } = useParams<{ itemId: string }>();
  const { item, isLoading } = useGetItem(itemId);

  return (
    <>
      {isLoading && !item ? (
        <Spinner />
      ) : (
        <>
          <Header />
          <BurgerMenu />
          <Item {...{ item }} />
          <Footer />
        </>
      )}
    </>
  );
};

export default ItemDetail;
