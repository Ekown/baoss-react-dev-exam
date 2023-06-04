import { ListGroup } from "react-bootstrap";
import CartItem from "../../atoms/CartItem/CartItem";
import "./ShoppingCart.css";

const ShoppingCart = ({
  cartItems,
  incrementQuantity,
  decrementQuantity,
  removeFromCart
}) => {
  return (
    <div className="shopping-cart">
      {cartItems.length === 0 ? (
        <div className="no-products-added">
          <img src="no-product.png" alt="No Products have been added" />
          <div>No products have been added</div>
        </div>
      ) : (
        cartItems.map((item) => (
          <ListGroup as="ul" role="list" key={item.id}>
            <CartItem
              item={item}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              removeFromCart={removeFromCart}
            />
          </ListGroup>
        ))
      )}
    </div>
  );
};

export default ShoppingCart;
