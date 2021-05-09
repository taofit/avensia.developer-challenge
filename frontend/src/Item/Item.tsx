import Button from "@material-ui/core/Button";
import { ProductType } from "../App";
import { Wrapper } from "./Item.styles";

type Props = {
    item: ProductType;
    handleAddToCart: (selectedItem: ProductType) => null;
};

const Item: React.FC<Props> = ({item, handleAddToCart}) => (
    <Wrapper>
        <img src={item.imageUrl} alt={item.title}/>
        <div>
            <h4>{item.title}</h4>
            <p>{item.prices[0].currency} {item.prices[0].amount}</p>
        </div>
        <Button onClick={() => handleAddToCart(item)}>Add to cart</Button>
    </Wrapper>
);

export default Item;