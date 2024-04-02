import React from "react";
import { Container, Row, Col, Form, FormGroup } from "reactstrap";
import Helmet from "../Components/Helmet/Helmet";
import CommonSection from "../Components/UI/CommonSection";
import "../styles/checkout.css";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../redux/slices/cartSlice";

const Checkout = () => {
  const totalQty = useSelector((state) => state.cart.totalQuantity);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const dispatch = useDispatch();

  const handlePlaceOrder = () => {
    dispatch(cartActions.clearCart());
    toast.success("Order placed successfully!");
  };

  return (
    <Helmet title="Checkout">
      <CommonSection title="Checkout" />

      <section>
        <Container>
          <Row>
            <Col lg="8">
              <h6 className="mb-4 fw-bold">Billing Information</h6>
              <Form className="billing__form">
                <FormGroup className="form__group">
                  <input type="text" placeholder="Enter your name" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="email" placeholder="Enter your email" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="number" placeholder="Phone number" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Postal code" />
                </FormGroup>

                <FormGroup className="form__group">
                  <input type="text" placeholder="Country" />
                </FormGroup>
              </Form>
            </Col>

            <Col lg="4">
              <div className="checkout__cart">
                <h6>
                  Total Qty:<span>{totalQty} items</span>
                </h6>
                <h6>
                  Subtotal:<span>${totalAmount}</span>
                </h6>
                <h6>
                  <span>
                    Shipping:
                    <br />
                    free shipping
                  </span>
                  <span>$0</span>
                </h6>
                <h4>
                  Total cost:<span>${totalAmount}</span>
                </h4>
                <button
                  className="auth__btn w-100 mt-2"
                  onClick={handlePlaceOrder}
                >
                  Place an order
                </button>
                <button className="auth__btn w-100 mt-2">
                  <Link to="/shop ">Continue shopping</Link>
                </button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};

export default Checkout;
