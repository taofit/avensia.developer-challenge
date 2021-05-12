import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import { Drawer } from "@material-ui/core";
import { GlobWrapper, CartButton } from './styles';
import Item from './Item/Item';
import {useState} from "react";
import Cart from './ShoppingCart/Cart';

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

export type ItemType = {
    product: ProductType;
    quantity: number;
}

const getProducts = async (): Promise<ProductType[]> => {
  let response = await fetch('http://localhost:8181/products');
  if (!response.ok) {
    throw new Error(`Cannot communicate with the mocked REST API server (${response.statusText})`);
  }
  return await response.json();
}

const App = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<ItemType[]>([]);
  const { data, isLoading, error } = useQuery<ProductType[]>('products', getProducts);

  const getTotalItems = (items: ItemType[]) => items.reduce((accu: number, item) => accu + item.quantity, 0);
  const addItemToCart = (selectedProduct: ProductType) => {
    setCartItems(preItems => {
        const itemExits = preItems.find(item => item.product.id === selectedProduct.id);
        if (itemExits) {
            return preItems.map(item => item.product.id === selectedProduct.id ? {...item, quantity: item.quantity + 1} : item);
        }
        const selectedItem = {product: selectedProduct, quantity: 1};
        return [...preItems, selectedItem];
    });
    console.log(cartItems);
  };
  const removeItemFromCart = () => null;

  if (error) {
    return (<div>OBS error occured</div>);
  }

  return (
      <GlobWrapper>
        <Drawer anchor='right' open={cartOpen} onClose={() => setCartOpen(false)}>
          <Cart items={cartItems} addItem={addItemToCart} removeItem={removeItemFromCart} />
        </Drawer>
        <CartButton onClick={() => setCartOpen(true)}>Open cart</CartButton>
        <Grid container spacing={4} id='wrapperGrid'>
          {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} addItemToCart={addItemToCart} />
              </Grid>
          ))}
        </Grid>
      </GlobWrapper>

  );
}

export default App;
