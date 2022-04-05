import styled from "styled-components";
import { mobile } from "../responsive";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import {Link} from 'react-router-dom'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(195, 175, 248, 0.5),
      rgba(255, 255, 255, 0.5)
    )
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;
const TitleWrapper = styled.div`
  display: flex;
`
const Title = styled.h1`
  flex:1;
  font-size: 24px;
  font-weight: 300;
`;

const BackButton = styled.h1`
    
    font-size: 24px;
    font-weight: 300;
    align-items: flex-end;
`

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #7e00f3;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  return (
    <Container>
      <Wrapper>
      <TitleWrapper>
          <Title>REGISTER</Title>
          <BackButton><Link to="/"><ArrowBackIosOutlinedIcon/></Link></BackButton>
        </TitleWrapper>
        <Form>
          <Input placeholder="name" />
          <Input placeholder="last name" />
          <Input placeholder="username" />
          <Input placeholder="email" />
          <Input placeholder="password" />
          <Input placeholder="confirm password" />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>
          </Agreement>
          <Button>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
