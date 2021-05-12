import { CartWrapper, CartItemWrapper } from '../styles';
import { ProductType, ItemType, PriceType } from '../Types/types';
import Button from "@material-ui/core/Button";

type Props = {
    items: ItemType[];
    addItem: (item: ProductType) => void;
    removeItem: (id: number) => void;
}

const getTotalPrice = (items: ItemType[]) => {
    return items.reduce((accu: PriceType[], item) => {
        const currProductPrice = item.product.prices.map(price => ({
            amount: price.amount * item.quantity,
            currency: price.currency
        }));
        if (accu.length === 0) {
            accu = currProductPrice;
        } else {
            accu = accu.map(existEachPrice => {
                let amount = existEachPrice.amount;
                currProductPrice.forEach((currEachPrice) => {
                    if (currEachPrice.currency === existEachPrice.currency) {
                        amount += currEachPrice.amount;
                    }
                });

                return {...existEachPrice, amount};
            });
        }
        return accu;
    }, [] as PriceType[]);
}

const Cart: React.FC<Props> = ({items, addItem, removeItem}) => {
    return (
        <CartWrapper>
            <div className='cartSummary'>
                <h2>Shopping Cart</h2>
                {items.length > 0 ? <h4>Total:</h4> : null}
                {getTotalPrice(items).map(totalPrice => <p key={totalPrice.currency}>{totalPrice.currency}: {totalPrice.amount.toFixed(2)}</p>)}
            </div>
            {items.length === 0 ? <p className='emptyMsg'>Cart is empty.</p> : null}
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
                                item.product.prices.map(price =>
                                    <p key={price.currency}>{price.currency} {(price.amount * item.quantity).toFixed(2)}
                                    </p>)
                            }
                        </div>
                    </div>
                    <div className='itemButton'>
                        <Button size='small' onClick={() => removeItem(item.product.id)}>-</Button>
                        <span>{item.quantity}</span>
                        <Button size='small' onClick={() => addItem(item.product)}>+</Button>
                    </div>
                </CartItemWrapper>
            ))}
        </CartWrapper>
    )
}

export default Cart;