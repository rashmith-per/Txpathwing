import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    setCart(savedCart);
  }, []);

  const removeFromCart = (courseId) => {
    const updatedCart = cart.filter(
      (course) => course.id !== courseId
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const getPrice = (price) => {
    return Number(
      price.replace("₹", "").replace(/,/g, "")
    );
  };

  const totalPrice = cart.reduce(
    (total, course) => total + getPrice(course.price),
    0
  );

  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>

          <h1>Your cart is empty</h1>

          <p>
            Add a course from the marketplace to continue.
          </p>

          <button
            type="button"
            className="continue-shopping-button"
            onClick={() => navigate("/marketplace")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">

        <div className="cart-header">
          <div>
            <span className="cart-label">
              YOUR SELECTION
            </span>

            <h1>Your Cart</h1>

            <p>
              {cart.length}{" "}
              {cart.length === 1 ? "course" : "courses"}{" "}
              added to your cart
            </p>
          </div>
        </div>

        <div className="cart-layout">

          <div className="cart-items">
            {cart.map((course) => (
              <article
                key={course.id}
                className="cart-course-card"
              >


                <div className="cart-course-details">

                  <span className="cart-course-category">
                    {course.category}
                  </span>

                  <h2>{course.title}</h2>

                  <p className="cart-instructor">
                    Instructor: {course.instructor}
                  </p>

                  <div className="cart-course-meta">
                    <span>{course.lessons}</span>

                    <span>•</span>

                    <span>{course.duration}</span>

                    <span>•</span>

                    <span>{course.level}</span>
                  </div>

                  <div className="cart-course-price">

                    <span className="cart-current-price">
                      {course.price}
                    </span>

                    {course.oldPrice &&
                      course.oldPrice !== "₹0" && (
                        <del>
                          {course.oldPrice}
                        </del>
                      )}

                  </div>

                </div>

                <button
                  type="button"
                  className="remove-cart-button"
                  onClick={() =>
                    removeFromCart(course.id)
                  }
                >
                  Remove
                </button>

              </article>
            ))}
          </div>

          <aside className="cart-summary">

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Courses</span>

              <span>{cart.length}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>

              <span>
                ₹{totalPrice.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-divider" />

            <div className="summary-total">
              <span>Total</span>

              <strong>
                ₹{totalPrice.toLocaleString("en-IN")}
              </strong>
            </div>

            <button
              type="button"
              className="checkout-button"
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              className="continue-shopping-button"
              onClick={() =>
                navigate("/marketplace")
              }
            >
              Continue Shopping
            </button>

          </aside>

        </div>

      </div>
    </div>
  );
}

export default Cart;