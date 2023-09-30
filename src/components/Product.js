import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { add } from "../store/cartSlice";

const Product = () => {
  const dispatch = useDispatch();
  const [products, getProducts] = useState([]);
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((data) => data.json())
      .then((result) => getProducts(result));
  });

  const addToCart = (product) => {
    //dispatch an action

    dispatch(add(product));
  };

  const cards = products.map((product) => (
    <div className="col-md-3">
      <Card key={product.id} className="h-100 pt-3" style={{ width: "18rem" }}>
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
            <Button variant="primary" onClick={() => addToCart(product)}>
              Add to Cart
            </Button>
          </Card.Footer>
        </Card.Body>
      </Card>
    </div>
  ));

  return (
    <>
      <h2 className="text-center pt-4 pb-4">Product Dashboard</h2>
      <div className="row">{cards}</div>
    </>
  );
};

export default Product;
