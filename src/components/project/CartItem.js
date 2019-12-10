import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import { ShopContext } from '../../contexts/shop';

const CartItem = ({ item }) => {
    const { updateQuantity, removeProductFromCart } = useContext(ShopContext);
    const [quantity, setQuantity] = useState(1);
    const onChange = (event) => {
        const value = event.target.value;

        // Make sure the quantity is always at least 1.
        const safeValue = Math.max(Number(value), 0);

        // No need to update if the value hasn’t updated.
        if (value === quantity) {
            return;
        }

        // If the field is empty, update the state but don’t do anything else.
        if (value === '') {
            setQuantity(value);
            return;
        }

        // Otherwise, trigger the loading state and set the quantity in state.
        setQuantity(safeValue);

        // If the quantity is set to 0, remove the item.
        if (safeValue === 0) {
            removeProductFromCart(item.id);
            return;
        }

        // If we get here, update the quantity.
        updateQuantity(item.id, safeValue);
    };
    const onBlur = () => setQuantity(item.quantity);
    const onClick = () => removeProductFromCart(item.id);
    useEffect(() => {
        item.quantity !== quantity && quantity !== '' && setQuantity(item.quantity);
    }, [item.quantity, quantity]);
    return (
        <li className="cart-line-item">
            <div className="row align-items-center">
                <div className="col-auto">
                    <div className="cart-line-item-image">
                        <img className="image fit exact-center img-fluid" src={item.variant.image.src} alt={item.title} />
                    </div>
                </div>
                <div className="col">
                    <p className="title">{item.title}</p>
                </div>
                <div className="col-2">
                    <p className="price">${item.variant.price}</p>
                </div>
                <div className="col-2">
                    <input
                        type="number"
                        id={`quantity-${item.id.substring(58, 64)}`}
                        className="form-control form-control-md"
                        name="quantity"
                        inputMode="numeric"
                        min="1"
                        step="1"
                        onChange={onChange}
                        onBlur={onBlur}
                        value={quantity}
                        aria-label="quantity"
                    />
                </div>
                <div className="col-1">
                    <button type="button" className="btn btn-default btn-md do-remove" onClick={onClick}>
                        X
                    </button>
                </div>
            </div>
        </li>
    );
};

CartItem.propTypes = {
    item: PropTypes.object.isRequired,
};

export default CartItem;
