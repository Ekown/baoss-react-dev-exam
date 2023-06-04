import { ListGroupItem } from "react-bootstrap";
import "./CartItem.css";

const CartItem = ({ item, incrementQuantity, decrementQuantity }) => {
  return (
    <ListGroupItem className="cart-item">
      <div className="cart-item-name">{item.name}</div>
      <div className="cart-item-controls">
        <div
          role="button"
          className="decrement"
          variant="outline"
          onClick={() => decrementQuantity(item)}
          aria-label={`Decrement ${item.name} quantity`}
        >
          <div>-</div>
        </div>
        <div className="quantity" variant="outline" aria-label="Item Quantity">
          <div>{item.quantity}</div>
        </div>
        <div
          role="button"
          className="increment"
          variant="outline"
          onClick={() => incrementQuantity(item)}
          aria-label={`Increment ${item.name} quantity`}
        >
          <div>+</div>
        </div>
      </div>
    </ListGroupItem>
  );
};

export default CartItem;
