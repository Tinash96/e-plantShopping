import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onCheckout }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const itemTotal = item.cost * item.quantity; // Multiply numeric cost with quantity
      return total + itemTotal;
    }, 0).toFixed(2); // Return total sum rounded to 2 decimal places
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    if (onContinueShopping) {
      onContinueShopping();  // Trigger the parent function to continue shopping
    }
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (onCheckout) {
      onCheckout();  // Trigger the parent function to go to checkout
    }
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.id)); // Remove item if quantity is 1
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Calculate total cost for an individual item
  const calculateTotalCost = (item) => {
    return (item.cost * item.quantity).toFixed(2); // Calculate total cost by multiplying cost with quantity
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.id}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">${item.cost.toFixed(2)}</div> {/* Display cost with $ sign */}
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={handleCheckout}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
