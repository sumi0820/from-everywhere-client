import { VFC } from 'react';
import Spinner from 'components/atoms/Spinner';
import Footer from 'components/atoms/Footer';
import BurgerMenu from 'components/atoms/BurgerMenu';
import useGetItem from 'hooks/use-get-item';
import { useParams } from 'react-router-dom';
import Header from 'components/atoms/Header';
import ItemEditForm from 'components/templates/ItemEditForm';

const ItemEdit: VFC = () => {
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
          <ItemEditForm />
          <Footer />
        </>
      )}
    </>
  );
};

export default ItemEdit;
