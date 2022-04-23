import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateUserAddress } from "../redux/apiCalls";

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


const Account = () => {
  const user = useSelector((state) => state.user.currentUser)
  const [city, setCity] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [street, setstreet] = useState(null)
  const [houseNumber, setHouserNumber] = useState(null)
  const dispatch = useDispatch()
  const { isFetching, messageSucces, messageFail } = useSelector((state) => state.user)
  
  const isValidCity = city !== ""
  const isValidStreet = street !== "" 
  const isValidHouseNumber = /^[1-9]\d*(?: ?(?:[a-z]|[/-] ?\d+[a-z]?))?$/.test(houseNumber);
  const isValidZipCode = /^([0-9]{2}-)?[0-9]{3}$/.test(zipcode);  
  let isFormValid = isValidCity && isValidStreet && isValidHouseNumber && isValidZipCode
  

  const handleClick = async (e) => {  
    e.preventDefault();
    if(!isValidZipCode){
      alert("Zle wypeliony kod pocztowy");
    }   
    if(isFormValid) {
      const userId = user._id
      const token = "Bearer "+user.accessToken    
      updateUserAddress(dispatch,userId,token,{city,zipcode,street,houseNumber})
      
    }
    
  }

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>{user.name}</Title>
        <Top>
          {/* <TopButton><Link to="/" style={{ textDecoration: "none" }}>Kontynuuj zakupy</Link></TopButton> */}
          <TopTexts>
            <TopText></TopText>
          </TopTexts>

        </Top>
        <Bottom>

          <Info>
            <AccountTitle>Zmień adres</AccountTitle>
            <Form >              
              <Input placeholder="miasto" type="text" required onChange={(e) => setCity(e.target.value)} />
              <Input placeholder="kod pocztowy        XX-XXX" maxLength="6" type="text" required onChange={(e) => setZipcode(e.target.value)} />
              <Input placeholder="ulica" type="text" required onChange={(e) => setstreet(e.target.value)} />
              <Input placeholder="nr domu                 XX/X " type="mail" required onChange={(e) => setHouserNumber(e.target.value)} />
              <Button onClick={handleClick} disabled={isFetching} >Zmień</Button>
              
              
              
              
            </Form>
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
