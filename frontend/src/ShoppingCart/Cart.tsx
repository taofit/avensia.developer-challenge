import { CartWrapper, CartItemWrapper } from '../styles';
import { ProductType } from '../App';
import Button from "@material-ui/core/Button";

type Props = {
    items: ProductType[];
    addItem: (item: ProductType) => null;
    removeItem: (id: number) => null;
}

let qty: {[id:number]: number};
const Cart: React.FC<Props> = ({items, addItem, removeItem}) => {
    return (
        <CartWrapper>
            <h3>Shopping Cart</h3>
            {items.length === 0 ? <p>Cart is empty.</p> : ''}
            {items.map((item: ProductType)=> (
                <CartItemWrapper>
                    <h4>{item.title}</h4>
                    <div className='itemDetail'>
                        <img src={item.imageUrl} alt={item.title}/>
                        <p>
                            Price:
                            {
                                item.prices.map(price => <p key={price.currency}>{price.currency} {price.amount}</p>)
                            }
                        </p>
                        <p>
                            Total:
                            {
                                item.prices.map(price => <p key={price.currency}>
                                    {price.currency} {(price.amount * qty[item.id]).toFixed(2)}
                                </p>)
                            }
                        </p>
                    </div>
                    <div className='itemButton'>
                        <Button size='small' disableElevation onClick={() => removeItem(item.id)}>-</Button>
                        <span>{qty[item.id]}</span>
                        <Button size='small' disableElevation onClick={() => addItem(item)}>+</Button>
                    </div>
                </CartItemWrapper>
            ))}
        </CartWrapper>
    )
}

export default Cart;