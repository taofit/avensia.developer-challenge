import { useQuery } from 'react-query';
import Grid from '@material-ui/core/Grid';
import { Drawer } from "@material-ui/core";
import { GlobalWrapper, CartBadge } from './styles';
import Item from './Item/item';
import {useState, useEffect} from 'react';
import Cart from './ShoppingCart/cart';
import { ProductType, ItemType, CartType } from './Types/types';
import ShoppingBasketTwoToneIcon from '@material-ui/icons/ShoppingBasketTwoTone';

const getProducts = async (): Promise<ProductType[]> => {
  let response = await fetch('http://localhost:8181/products');
  if (!response.ok) {
    throw new Error(`Query server endpoint error: ${response.statusText}`);
  }

  return await response.json();
}

const App = () => {
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState<ItemType[]>([]);
    const { data, error } = useQuery<ProductType[]>('products', getProducts);

    const getTotalItems = (items: ItemType[]) => items.reduce((accu: number, item) => accu + item.quantity, 0);
    const addItemToCart = (selectedProduct: ProductType) => {
        const cartItemsPromise = postCartItems(selectedProduct.id);
        cartItemsPromise.then(response => {
            let newCartItems: ItemType[] = [];
            const itemExists = cartItems.find(item => item.product.id === selectedProduct.id);
            if (itemExists) {
                newCartItems = cartItems.map(item => item.product.id === selectedProduct.id ? {...item, quantity: item.quantity + 1} : item);
            } else {
                const selectedItem = {product: selectedProduct, quantity: 1};
                newCartItems = [...cartItems, selectedItem];
            }

            setCartItems(newCartItems);
        });
    };

  const removeItemFromCart = (id: number, curCartItems: ItemType[]) => {
      const curCartItem = curCartItems.filter(item => item.product.id === id);
      let quantity = curCartItem.length > 0 ? curCartItem[0].quantity : 0;
      quantity = quantity > 0 ? quantity - 1 : quantity;
      let cartItemsPromise;
      if (quantity > 0) {
          cartItemsPromise = putCartItems(id, quantity);
      } else {
          cartItemsPromise = deleteCartItems(id);
      }
      cartItemsPromise.then(response => {
          let newCartItems: ItemType[] = [];
          if (response.items.length > 0) {
              newCartItems = response.items.reduce((curr: ItemType[], resItem: ItemType) => {
                  return curCartItems.map(item => {
                      return item.product.id === resItem.product.id ? {...item, quantity: resItem.quantity} : item;
                  });
              }, [] as ItemType[]);
          } else {
              newCartItems = curCartItems.filter(item => item.product.id !== id);
          }
          setCartItems(newCartItems);
      })
  };

    const postCartItems = async (id: number): Promise<CartType> => {
        let response = await fetch(`http://localhost:8181/cart/${id}?quantity=1`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`Query server endpoint error: ${response.statusText}`);
        }
        const content = await response.json();

        return content;
    };

    const putCartItems = async (id: number, quantity: number): Promise<CartType> => {
        let response = await fetch(`http://localhost:8181/cart/${id}?quantity=${quantity}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        if (!response.ok) {
            throw new Error(`Query server endpoint error: ${response.statusText}`);
        }
        const content = await response.json();
        return content;
    };

    const deleteCartItems = async (id: number): Promise<CartType> => {
        let response = await fetch(`http://localhost:8181/cart/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Query server endpoint error: ${response.statusText}`);
        }
        const content = await response.json();
        return content;
    };


    const getCartItems = async (): Promise<CartType[]> => {
        let response = await fetch('http://localhost:8181/cart');
        if (!response.ok) {
            throw new Error(`Query server endpoint error: ${response.statusText}`);
        }
        const content = await response.json();
        console.log(content);
        return content;
    };

    useEffect(() => {
        getCartItems();
    },[cartItems]);

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
