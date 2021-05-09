import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import { Wrapper } from './Item/Item.styles';
import Item from './Item/Item';

const itemList: Array<string> = [];
let list = '';

export type ProductType = {
  id: number;
  imageUrl: string;
  title: string;
  prices: Price[];
  url: string;
};

type Price = {
  amount: number;
  currency: string; // Currently SEK and EUR
};

const getProducts = async (): Promise<ProductType[]> => {
  let response = await fetch('http://localhost:8181/products');
  if (!response.ok) {
    throw new Error(`Cannot communicate with the mocked REST API server (${response.statusText})`);
  }
  return await response.json();
}

const App = () => {
  const { data, isLoading, error } = useQuery<ProductType[]>('products', getProducts);

  const getTotalItems = () => null;
  const handleAddToCart = (selectedItem: ProductType) => null;
  const handleRemoveFromCart = () => null;

  if (error) {
    return (<div>OBS error occured</div>);
  }

  return (
      <Wrapper>
        <Grid container spacing={4}>
          {data?.map(item => (
              <Grid item key={item.id} grid-xs-10 sm={5}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
          ))}
        </Grid>
      </Wrapper>

  );
}

export default App;
