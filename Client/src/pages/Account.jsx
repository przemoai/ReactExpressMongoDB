import { Add, Remove } from "@material-ui/icons";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { Link } from "react-router-dom"
import { clearCart } from "../redux/cartRedux";
import { useDispatch } from "react-redux";


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

const ProductSize = styled.span``;

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



const Account = () => {
  const user = useSelector((state) => state.user.currentUser)
  
  
  const dispatch = useDispatch()

  const handleClick = () => {
    dispatch(clearCart())

  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>{user.name}</Title>
        <Top>
          <TopButton><Link to="/" style={{ textDecoration: "none" }}>Kontynuuj zakupy</Link></TopButton>
          <TopTexts>
            <TopText></TopText>
          </TopTexts>

          {/* <TopButton type="filled" onClick={handleClick}>Wyczyść koszyk</TopButton> */}

        </Top>
        <Bottom>
          <Info>
            
            
          </Info>
          <Summary>
            <SummaryTitle>Twoje dane</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Miasto</SummaryItemText>
              <SummaryItemPrice>{user.address} </SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Kod pocztowy</SummaryItemText>                         
              <SummaryItemPrice></SummaryItemPrice>              
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Ulica</SummaryItemText>
              <SummaryItemPrice></SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Nr domu</SummaryItemText>
              <SummaryItemPrice></SummaryItemPrice>
            </SummaryItem>
            <Button>Zapisz</Button>
          </Summary>
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Account;
