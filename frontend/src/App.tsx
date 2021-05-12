import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import { Drawer } from "@material-ui/core";
import { GlobalWrapper, CartBadge } from './styles';
import Item from './Item/Item';
import {useState} from "react";
import Cart from './ShoppingCart/Cart';
import { ProductType, ItemType } from "./Types/types";
import ShoppingBasketTwoToneIcon from '@material-ui/icons/ShoppingBasketTwoTone';

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
        const itemExists = preItems.find(item => item.product.id === selectedProduct.id);
        if (itemExists) {
            return preItems.map(item => item.product.id === selectedProduct.id ? {...item, quantity: item.quantity + 1} : item);
        }
        const selectedItem = {product: selectedProduct, quantity: 1};
        return [...preItems, selectedItem];
    });
  };
  const removeItemFromCart = (id: number) => {
      setCartItems(preItems => {
        const itemExists = preItems.find(item => item.product.id === id);
        if (!itemExists) {
            // throw new Error(`item with id; ${id} does not exist in the cart`);
            return preItems;
        }

        const cartItems = preItems.map(item => {
            const quantity = item.quantity === 0 ? item.quantity : item.quantity - 1;
            return item.product.id === id ? {...item, quantity} : item;
        });

        return cartItems.filter(item => {
            return item.quantity > 0;
        })
      });
  };

  const toggleDrawer = () => {
      setCartOpen(!cartOpen);
  }

  if (error) {
    return (<div>OBS error occured</div>);
  }

  return (
      <GlobalWrapper>
        <Drawer anchor='bottom' open={cartOpen} onClose={() => toggleDrawer()}>
          <Cart items={cartItems} addItem={addItemToCart} removeItem={removeItemFromCart} />
        </Drawer>
        <CartBadge color="secondary" badgeContent={getTotalItems(cartItems)} onClick={() => toggleDrawer()} title='Open cart'>
            <ShoppingBasketTwoToneIcon />{" "}
        </CartBadge>
        <Grid container spacing={4} id='wrapperGrid'>
          {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4}>
                <Item item={item} addItemToCart={addItemToCart} />
              </Grid>
          ))}
        </Grid>
      </GlobalWrapper>

  );
}

export default App;
