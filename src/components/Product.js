import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { add } from "../store/cartSlice";
import { getProducts } from "../store/productSlice";
import { Alert } from "react-bootstrap";

const Product = () => {
  const dispatch = useDispatch();
  const { data: products, status } = useSelector((state) => state.products);
  console.log("products: ");
  console.log(products);

  useEffect(() => {
    // fetch("https://fakestoreapi.com/products")
    //   .then((data) => data.json())
    //   .then((result) => getProducts(result));
    dispatch(getProducts());
  }, []);

  const addToCart = (product) => {
    //dispatch an action
    dispatch(add(product));
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (status === "Error") {
    return (
      <Alert key="danger" variant="danger">
        Something went wrong, try again later!
      </Alert>
    );
  }

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
