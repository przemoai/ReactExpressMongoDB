import { Badge, } from "@material-ui/core";
import { ShoppingCartOutlined } from "@material-ui/icons";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";
import { logout } from "../redux/apiCalls";

const Container = styled.div`
  background-color: #0A1A29;
  height: 60px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;




const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  color:white;
  ${mobile({ fontSize: "24px" })}
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  color:white;
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  text-decoration: none;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;



const Navbar = () => {

  const handleClick = (e) => {
    e.preventDefault()
    logout()
  }

  const quantity = useSelector(state => state.cart.quantity)
  const user = useSelector((state) => state.user.currentUser)
  return (
    <Container>
      <Wrapper>
        <Left>
          <MenuItem>
            {user && <ExitToAppOutlinedIcon onClick={handleClick} />}
          </MenuItem>

        </Left>
        <Center>
          <Link to="/" style={{ textDecoration: "none" }}><Logo>Shopp</Logo></Link>
        </Center>
        <Right>
          {!user && <Link to="/register" style={{ textDecoration: "none" }}><MenuItem>ZAŁÓŻ KONTO</MenuItem></Link>}
          {!user && <Link to="/login" style={{ textDecoration: "none" }}><MenuItem>ZALOGUJ SIĘ</MenuItem></Link>}
          <Link to="/cart">
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </MenuItem>
          </Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
