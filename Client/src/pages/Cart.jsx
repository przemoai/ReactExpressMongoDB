import { Add, Remove } from "@material-ui/icons";
import { useSelector, useDispatch} from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom"
import { clearCart } from "../redux/cartRedux";
import {useState} from "react"
import { makeOrder } from "../redux/apiCalls";
import { incQuantity,decQuantity,changeQuantity } from "../redux/cartRedux";

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
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  border: 1px solid #000000;
`;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 50vh;
`;

const SummaryTitle = styled.h1`
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

const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;
const Error = styled.div`
  flex:1;   
  margin: 10px 15px 0px 0px;
  padding: 10px;
  color:red;
  min-width: 100%;
`
const NavLink = styled(Link)`
  color:red;
  font-weight: 700;
  text-decoration: none;
`

const Cart = () => {
  const user = useSelector((state) => state.user.currentUser)
  const quantity = useSelector(state => state.cart.quantity)
  const cart = useSelector(state => state.cart)

  
  let shippingCost = 9.99
  let shippingDiscount = 0
  if (cart.total > 300) {
    shippingDiscount = shippingCost;
    shippingCost = 0;
  } else {
    shippingDiscount = 0
    shippingCost = 9.99
  }


  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(clearCart())
  }

  // let cartEmpty = cart.total===0
  // let addressSet = Object.keys(user.address).length!==0

  const [cartEmpty,setCartEmpty]=useState(cart.total===0)
  const [addressSet,setAddress]=useState(Object.keys(user.address).length!==0)

  const finalizeCart = () => {   
    if(cart.total!==0){
      setCartEmpty(false)
    }
    if(Object.keys(user.address).length===0){
      setAddress(false)
    }

    if (cartEmpty) {
      alert("Koszyk jest pusty")
    } else if (!addressSet) {
      alert("Nie podano adresu")
    } else {
      // alert("GRATULUJE ZAKUPU!")
      const token = "Bearer "+user.accessToken
      const userId = user._id   
      makeOrder(dispatch,userId,token,cart.products,user.address,cart.total)
    
    }
  }

  // const changeQuantityHandle = (itemId,action) => {
  //   if(action==="inc"){
  //     dispatch(incQuantity(itemId))
  //   }
  //   if(action==="dec"){
  //     dispatch(decQuantity(itemId))
  //   }        
  // }
  const changeQuantityHandle = (itemId,action) => {
    dispatch(changeQuantity({itemId,action}))
    
      
            
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Twój koszyk</Title>
        <Top>
          <TopButton><Link to="/" style={{ textDecoration: "none" }}>Kontynuuj zakupy</Link></TopButton>
          <TopTexts>
            <TopText>Koszyk({quantity})</TopText>
          </TopTexts>

          <TopButton type="filled" onClick={handleClick}>Wyczyść koszyk</TopButton>

        </Top>
        <Bottom>
          <Info>
            {cart.products.map(product => (

              <Product>
                <ProductDetail>
                  <Image src={product.img} />
                  <Details>
                    <ProductName>
                      <b>Produkt:</b> {product.title}
                    </ProductName>
                    <ProductId>
                      <b>ID:</b> {product._id}
                    </ProductId>
                    <ProductColor color={product.color} />
                  </Details>
                </ProductDetail>
                <PriceDetail>
                  <ProductAmountContainer>
                    <Add onClick={()=>{changeQuantityHandle(product._id,"inc")}}/>
                    <ProductAmount>{product.quantity}</ProductAmount>
                    <Remove onClick={()=>{changeQuantityHandle(product._id,"dec")}}/>
                  </ProductAmountContainer>
                  <ProductPrice>{product.price} zł</ProductPrice>
                </PriceDetail>
              </Product>
            ))}
            <Hr />
          </Info>
          <Summary>
            <SummaryTitle>Podsumowanie koszyka</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Suma</SummaryItemText>
              <SummaryItemPrice>{cart.total} zł</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Koszta dostawy</SummaryItemText>
              <SummaryItemPrice>{shippingCost} zł</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Zniżka</SummaryItemText>
              <SummaryItemPrice>{shippingDiscount} zł</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Suma</SummaryItemText>
              <SummaryItemPrice>{cart.total} zł</SummaryItemPrice>
            </SummaryItem>
            <Button onClick={finalizeCart}>Zapłać</Button>
            {!addressSet && <Error><NavLink to="/account">Musisz pierw uzupelnic adres</NavLink></Error>}

          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
