import { useSelector } from "react-redux"
import styled from "styled-components";
import { useState } from "react"
import { Link } from "react-router-dom"
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

const NavLink = styled(Link)`
  color:white;
  font-weight: 700;
  text-decoration: none;
`
const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const ShippingSummary = () => {
    const user = useSelector((state) => state.user.currentUser)
    const [addressSet, setAddress] = useState(Object.keys(user.address).length !== 0)

    return (

        <Summary>
            <AccountTitle>Adress dostawy</AccountTitle>
            <SummaryItem>

                <SummaryItemValue>{user.name + " " + user.lastname}</SummaryItemValue>
            </SummaryItem>
            <SummaryItem>
                <SummaryItemValue>{user.email}</SummaryItemValue>
            </SummaryItem>
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
            <Button><NavLink to="/account">Zmien adres</NavLink></Button>
        </Summary>

    )
};


export default ShippingSummary;