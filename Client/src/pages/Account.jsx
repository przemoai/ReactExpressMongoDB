import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ShippingAdress from "../components/ShippingAdress";
import { mobile } from "../responsive";
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react";
import OrderHistory from "../components/OrderHistory";
import { getUserOrders } from "../redux/apiCalls";


const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 2;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const AccountTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemValue = styled.span``;

const Button = styled.button`
  margin-right:5px;
  width: 40%;
  padding: 20px;
  background-color: black;
  color: white;
  font-weight: 600;
`;



const Account = () => {
  const user = useSelector((state) => state.user.currentUser)
  const [shippingVisible, setShippingVisible] = useState(false)
  const [ordersVisible, setOrdersVisible] = useState(false)
  const dispatch = useDispatch()
  const setVisible = (e) => {

    if (e.target.id == "address") {
      setOrdersVisible(false)
      setShippingVisible(!shippingVisible)
    }
    if (e.target.id == "orders") {
      getUserOrders(dispatch, user)
      setShippingVisible(false)
      setOrdersVisible(!ordersVisible)

    }


  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Witaj {user.name}!</Title>
        <Top>

          <TopTexts>
            <TopText></TopText>
          </TopTexts>

        </Top>
        <Bottom>

          <Info>

            <Button id="address" onClick={setVisible}>ZMIEN ADRES</Button>
            <Button id="orders" onClick={setVisible}>HISTORIA ZAMOWIEN</Button>

            {shippingVisible && <ShippingAdress></ShippingAdress>}
            {ordersVisible && <OrderHistory></OrderHistory>}
          </Info>

          <Summary>
            <AccountTitle>Twoje dane</AccountTitle>
            <SummaryItem>
              <SummaryItemText>Miasto:</SummaryItemText>
              <SummaryItemValue>{user.address.city ? user.address.city : "-"}</SummaryItemValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Kod pocztowy</SummaryItemText>
              <SummaryItemValue>{user.address.zipcode ? user.address.zipcode : "-"}</SummaryItemValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Ulica</SummaryItemText>
              <SummaryItemValue>{user.address.street ? user.address.street : "-"}</SummaryItemValue>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Nr domu</SummaryItemText>
              <SummaryItemValue>{user.address.houseNumber ? user.address.houseNumber : "-"}</SummaryItemValue>
            </SummaryItem>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Account;
