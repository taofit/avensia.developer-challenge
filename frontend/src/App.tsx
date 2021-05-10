import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import { Drawer } from "@material-ui/core";
import { GlobWrapper, CartButton } from './styles';
import Item from './Item/Item';
import {useState} from "react";

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ProductType[]>([]);
  const { data, isLoading, error } = useQuery<ProductType[]>('products', getProducts);

  const getTotalItems = () => null;
  const handleAddToCart = (selectedItem: ProductType) => null;
  const handleRemoveFromCart = () => null;

  if (error) {
    return (<div>OBS error occured</div>);
  }

  return (
      <GlobWrapper>
        <Drawer anchor='top' open={cartOpen} onClose={() => setCartOpen(false)}>
          Cart
        </Drawer>
        <CartButton onClick={() => setCartOpen(true)}>Open cart</CartButton>
        <Grid container spacing={4}>
          {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
          ))}
        </Grid>
      </GlobWrapper>

  );
}

export default App;
