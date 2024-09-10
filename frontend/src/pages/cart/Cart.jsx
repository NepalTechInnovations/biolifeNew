import React from 'react';
import { useCartGlobally } from '../../context/CartContext';
import { useAuthGlobally } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import '../cart/cart.css';
import { MdDeleteForever } from "react-icons/md";

const Cart = () => {
    const { cart, incrementQuantity, decrementQuantity, removeFromCart } = useCartGlobally();
    const [auth] = useAuthGlobally(); 
    const navigate = useNavigate();

    const totalPrice = cart.reduce((acc, item) => acc + (Number(item.salePrice || 0) * (item.quantity || 0)), 0);

    const handleCheckout = () => {
        if (!auth.user) {
            navigate('/login');  // Redirect to login if not authenticated
        } else {
            navigate('/checkout');  // Proceed to checkout if authenticated
        }
    };

    return (
        <div className="cart">
            <div className="container shadowTest">
                <h3 className='Cartheading'>Shopping Cart</h3>
                <div className="cartContainer">
                    <div className="cartItems">
                        {cart.length > 0 ? (
                            cart.map(item => (
                                <div className="cartItem" key={item._id}>
                                    <img 
                                        src={(item.images && item.images.length > 0) ? item.images[0] : '/images/default.jpg'} 
                                        alt={item.name || 'Product Image'} 
                                        className="cartItemImg" 
                                    />
                                    <div className="cartItemDetails">
                                        <h2 className='cartProductName'>{item.name || 'Unknown Product'}</h2>
                                        <h4 className='cartPrice'>Rs {Number(item.salePrice || 0).toFixed(2)}</h4>
                                    </div>
                                    <div className="quantityControl">
                                        <button onClick={() => decrementQuantity(item._id)}>-</button>
                                        <span>{item.quantity || 0}</span>
                                        <button onClick={() => incrementQuantity(item._id)}>+</button>
                                    </div>
                                    <button className="removeItem" onClick={() => removeFromCart(item._id)}><MdDeleteForever /></button>
                                </div>
                            ))
                        ) : (
                            <p className='emptyCart'>Your cart is empty</p>
                        )}
                    </div>
                    <div className="summary">
                        <h3>Summary</h3>
                        <div className="summaryDetails">
                            <p>ITEMS {cart.length}</p>
                            <p>Total: Rs {Number(totalPrice).toFixed(2)}</p>
                            <label>SHIPPING</label>
                            <select>
                                <option>Cash On Delivery</option>
                                {/* <option>Khalti</option> */}
                            </select>

                            {/* Conditionally render button based on user authentication */}
                            {auth.user ? (
                                <button className="checkoutBtn" onClick={handleCheckout}>PROCEED TO CHECKOUT</button>
                            ) : (
                                <button className="checkoutBtn" onClick={() => navigate('/login')}>LOGIN TO CONTINUE</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
