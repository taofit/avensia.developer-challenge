import Button from "@material-ui/core/Button";
import { ProductType } from "../Types/types";
import { Wrapper } from "../styles";

type Props = {
    item: ProductType;
    addItemToCart: (selectedItem: ProductType) => void;
};

const Item: React.FC<Props> = ({item, addItemToCart}) => (
    <Wrapper>
        <img src={item.imageUrl} alt={item.title}/>
        <div>
            <h4>{item.title}</h4>
            {
                item.prices.map(price => <p key={price.currency}>{price.currency} {price.amount}</p>)
            }
        </div>
        <Button onClick={() => addItemToCart(item)}>Add to cart</Button>
    </Wrapper>
);

export default Item;