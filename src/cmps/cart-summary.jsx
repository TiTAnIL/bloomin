import { useState, useEffect } from 'react';
import { utilService } from '../services/util.service.js';

export function CartSummery({ items, quantities }) {
  const [currQuantity, setQuantity] = useState(0)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let newTotal = 0;
    items.forEach((item) => {
      const itemTotal = item.price * quantities[item.name];
      newTotal += itemTotal;
    });
    setTotal(newTotal);
  }, [items, quantities]);


  return (
    <section>
      <div className="summery-container">
        <h2>Summery</h2>
        <div>
          <div className="coupon-form">
            <label htmlFor="animal">Have a Coupon?</label>
            <input
              pattern="[a-z]{2,20}"
              type="text"
              id="coupon"
              name="coupon"
              defaultValue="Enter Coupon"
              size="50"
              maxLength="50"
            ></input>
          </div>
          <table className="summery-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Amount</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                return (
                  <tr key={item.name + utilService.makeId()}>
                    <td>{item.name}</td>
                    <td>{quantities[item.name]}</td>
                    <td>${item.price * quantities[item.name]}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="summery-total">
          <h2>Total</h2>
          <h2>${total}</h2>
        </div>
        <button>Buy</button>
      </div>
    </section>
  )
}
