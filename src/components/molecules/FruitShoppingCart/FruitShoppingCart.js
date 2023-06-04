import React, { useState, useEffect } from "react";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import TypeaheadInput from "../../atoms/TypeaheadInput/TypeaheadInput";
import "./FruitShoppingCart.css";

const FruitShoppingCart = () => {
  const [fruits, setFruits] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [cartItems, setCartItems] = useState([]);

  /**
   * Fetches the list of fruits from the API and sets the fruits state.
   * This effect runs once when the component mounts.
   */
  useEffect(() => {
    /**
     * Fetches the list of fruits from the API and restructures the JSON data for the typeahead component.
     *
     * @throws {Error} When there is an error fetching the fruits.
     */
    const fetchFruits = async () => {
      try {
        const response = await fetch("https://fruityvice.com/api/fruit/all/");

        // Restructure the json data for the typeahead component
        const data = (await response.json()).map((fruit) => {
          return {
            id: fruit.id,
            name: fruit.name
          };
        });

        setFruits(data);
      } catch (error) {
        console.error("Error fetching fruits:", error);
      }
    };

    fetchFruits();
  }, []);

  /**
   * Adds a fruit to the shopping cart. If the fruit already exists in the cart, it increments its quantity.
   * If the fruit doesn't exist in the cart, it adds a new item with a quantity of 1.
   *
   * @param {Object} fruit - The fruit to be added to the cart.
   */
  const addToCart = (fruit) => {
    const existingCartItem = cartItems.find((item) => item.id === fruit.id);

    if (existingCartItem) {
      incrementQuantity(fruit);
    } else {
      setCartItems([...cartItems, { ...fruit, quantity: 1 }]);
    }
  };

  /**
   * Increments the quantity of a fruit in the shopping cart.
   *
   * @param {Object} fruit - The fruit for which to increment the quantity.
   */
  const incrementQuantity = (fruit) => {
    const updatedCartItems = cartItems.map((item) => {
      if (item.id === fruit.id) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCartItems(updatedCartItems);
  };

  /**
   * Decrements the quantity of a fruit in the shopping cart. If the quantity becomes 0, the fruit is removed from the cart.
   *
   * @param {Object} fruit - The fruit for which to decrement the quantity.
   */
  const decrementQuantity = (fruit) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === fruit.id) {
          const updatedQuantity = item.quantity - 1;
          if (updatedQuantity === 0) {
            return null;
          }
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
      .filter(Boolean);

    setCartItems(updatedCartItems);
  };

  return (
    <div className="fruit-shopping-cart">
      <h1>Add Products</h1>

      <TypeaheadInput
        options={fruits}
        searchText={searchText}
        setSearchText={setSearchText}
        addToCart={addToCart}
      />

      <ShoppingCart
        cartItems={cartItems}
        incrementQuantity={incrementQuantity}
        decrementQuantity={decrementQuantity}
      />
    </div>
  );
};

export default FruitShoppingCart;
