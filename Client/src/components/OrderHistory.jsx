import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateUserAddress } from "../redux/apiCalls";
import { useEffect } from "react";
import { publicRequest } from "../requestMethods";
import { userOrders } from "../redux/userRedux";
import Order from "./Order";
const Container = styled.div`
  
`;

const AccountTitle = styled.h1`
  font-weight: 200;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; 
`;

const Input = styled.input`
  flex: 1;
  min-width: 60%;
  max-width: 60%;
  margin: 10px 10px 10px 0px;
  padding: 20px;
`;

const Button = styled.button`
  width: 40%;
  padding: 20px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Error = styled.span`
flex:1;   
  margin: 0px 10px 0px 0px;
  padding: 10px;
  color:red;
  min-width: 100%;
`

const OrderHistory = () => {
  const user = useSelector((state) => state.user)
  // const [Orders, setOrders] = useState([])

  return (
    <Container>
      {

        user.orders && user.orders.map((order, key) =>
          (<Order order={order} key={order.id} />)
        )




      }
    </Container>
  );
};


export default OrderHistory;