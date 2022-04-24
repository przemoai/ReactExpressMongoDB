import {
  FavoriteBorderOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@material-ui/icons";
import styled from "styled-components";
import { Link } from "react-router-dom";


const Container = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin: 5px;
  height: 10vh;
  max-width: 80%;

`;
const Error = styled.span`
  flex:1;   
  margin: 0px 10px 0px 0px;
  padding: 10px;
  color:black;
  min-width: 100%;
`




const Order = ({ order }) => {
  return (
    <Container>

      {/* {console.log(order) } */}
      {order._id}
      

      <br></br>Produkty:
      {order.products.map((product)=>(<li key={product._id}>{product.title}</li>))}

      

      Status: {order.status}

    </Container>
  );
};

export default Order;