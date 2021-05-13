import styled from 'styled-components';
import Badge from '@material-ui/core/Badge';

export const GlobalWrapper = styled.div`
    margin: 30px;
    #wrapperGrid {
        margin-top: 10px;
    }
    Badge {
        cursor: pointer;
    }
`;

export const ItemWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    width: 100%;
    border: 1px solid grey;
    border-radius: 15px;
    height: 100%;
    
    button {
        border-radius: 0 15px;
        background-color: lightGrey;
    }
    img {
        max-height: 200px;
        object-fit: cover;
        border-radius: 15px 15px 0 0; 
    }
    
    div {
        font-family: Helvetica;
        padding: 10px;
        height: 100%;
    }
`;

export const CartWrapper = styled.div`
    font-family: Helvetica;
    display: flex;
    height: 500px;
    padding: 23px;
    
    div.cartSummary {
        padding: 0 10px;
        border-right: 2px solid lightGrey;
    }
    p.emptyMsg {
        margin: auto;
        font-family: Helvetica;
        font-size: 20px;
    }
`;

export const CartItemWrapper = styled.div`
    justify-content: space-between;
    margin: 0 15px;
    padding: 0 15px;
    border-bottom: 1px solid lightGrey;
    border-right: 1px solid lightGrey;
    
    .itemDetail, .itemButton {
        display: flex;
        justify-content: space-between;
        Button {
            background-color: lightGrey;
        }
    }
    div {
        flex: 1;
    }
    img {
        max-width: 100px;
    }
`;

export const CartBadge = styled(Badge)`
    cursor: pointer;
`