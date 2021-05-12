import { CartWrapper, CartItemWrapper } from '../styles';
import { ProductType, ItemType } from '../App';
import Button from "@material-ui/core/Button";

type Props = {
    items: ItemType[];
    addItem: (item: ProductType) => void;
    removeItem: (id: number) => void;
}

let qty: {[id:number]: number};
const Cart: React.FC<Props> = ({items, addItem, removeItem}) => {
    return (
        <CartWrapper>
            <h3>Shopping Cart</h3>
            {items.length === 0 ? <p>Cart is empty.</p> : ''}
            {items.map((item: ItemType)=> (
                <CartItemWrapper key={item.product.title}>
                    <h4>{item.product.title}</h4>
                    <img src={item.product.imageUrl} alt={item.product.title}/>
                    <div className='itemDetail'>
                        <div>
                            Price:
                            {
                                item.product.prices.map(price => <p key={price.currency}>{price.currency} {price.amount}</p>)
                            }
                        </div>
                        <div>
                            Total:
                            {
                                item.product.prices.map(price => <p key={price.currency}>{price.currency} {(price.amount * item.quantity).toFixed(2)}
                                </p>)
                            }
                        </div>
                    </div>
                    <div className='itemButton'>
                        <Button size='small' disableElevation onClick={() => removeItem(item.product.id)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button size='small' disableElevation onClick={() => addItem(item.product)}>+</Button>
                    </div>
                </CartItemWrapper>
            ))}
        </CartWrapper>
    )
}

export default Cart;