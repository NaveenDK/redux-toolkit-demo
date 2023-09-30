import React from "react";
import { Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { remove } from "../store/cartSlice";

const Cart = () => {
  const productCart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removeFromCart = (id) => {
    //dispatch a remove
    dispatch(remove(id));
  };

  const cards = productCart.map((product) => (
    <div className="col-md-12">
      <Card key={product.id} className="h-100 pt-3">
        <div className="text-center">
          <Card.Img
            variant="top"
            src={product.image}
            style={{ width: "100px", height: "130px" }}
          />
        </div>

        <Card.Body className="text-center">
          <Card.Title>{product.title}</Card.Title>
          <Card.Text> ${product.price}</Card.Text>
          <Card.Footer style={{ background: "white" }}>
            <Button variant="danger" onClick={() => removeFromCart(product.id)}>
              Remove
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  ));
  return (
    <>
      <div className="row">{cards}</div>
    </>
  );
};

export default Cart;
