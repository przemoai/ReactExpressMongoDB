import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@material-ui/icons";
import styled from "styled-components";
import { mobile } from "../responsive";
import { Link } from "react-router-dom";

const Container = styled.div`
  background-color: #0A1A29;
  display: flex;
  ${mobile({ flexDirection: "column" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Logo = styled.h1`
  color:white;
`;

const Desc = styled.p`
  color:white;
  margin: 20px 0px;
`;

const SocialContainer = styled.div`
  display: flex;
  color:white;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: #${(props) => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
  color:white;
  ${mobile({ display: "none" })}
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const Right = styled.div`
  color:white;
  flex: 1;
  padding: 20px;
  ${mobile({ backgroundColor: "#fff8f8" })}

`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
    width: 50%;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color:white;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

const Footer = () => {
  
  return (
    <Container>
   <Left>
      <Logo>Shopp</Logo>
      <Desc>
         There are many variations of passages of Lorem Ipsum available, but
         the majority have suffered alteration in some form, by injected
         humour, or randomised words which dont look even slightly believable.
      </Desc>
      <SocialContainer>
         <SocialIcon color="3B5999">
              <Facebook />
         </SocialIcon>
         <SocialIcon color="E4405F">
            <Instagram />
         </SocialIcon>
         <SocialIcon color="55ACEE">
            <Twitter />
         </SocialIcon>
         <SocialIcon color="E60023">
            <Pinterest />
         </SocialIcon>
      </SocialContainer>
   </Left>
   <Center>
      <Title>Przydatne linki</Title>
      <List>
         <ListItem><StyledLink to="/" >Strona główna</StyledLink></ListItem>
         <ListItem><StyledLink to="/cart" >Koszyk</StyledLink></ListItem>
         <ListItem><StyledLink to="/products/mouse" >Myszki</StyledLink></ListItem>
         <ListItem><StyledLink to="/products/keyboard" >Klawiatury</StyledLink></ListItem>
         <ListItem><StyledLink to="/products/mousepad" >Podkładki</StyledLink></ListItem>
         <ListItem>Moje konto</ListItem>      
         
      </List>
   </Center>
   <Right>
      <Title>Kontakt</Title>
      <ContactItem>
         <Room style={{ marginRight: "10px" }} /> Lublin, Nadbystrzycka XYZ
      </ContactItem>
      <ContactItem>
         <Phone style={{ marginRight: "10px" }} /> +1 234 56 78
      </ContactItem>
      <ContactItem>
         <MailOutline style={{ marginRight: "10px" }} /> info@shopp.pl
      </ContactItem>
      <Payment src="https://i.ibb.co/Qfvn4z6/payment.png" />
   </Right>
</Container>
  );
};



export default Footer;
