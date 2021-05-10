import Button from "@material-ui/core/Button";
import { ProductType } from "../App";
import { Wrapper } from "../styles";

type Props = {
    item: ProductType;
    handleAddToCart: (selectedItem: ProductType) => null;
};

const Item: React.FC<Props> = ({item, handleAddToCart}) => (
    <Wrapper>
        <img src={item.imageUrl} alt={item.title}/>
        <div>
            <h4>{item.title}</h4>
            {
                item.prices.map(price => <p key={price.currency}>{price.currency} {price.amount}</p>)
            }
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
);

export default Item;