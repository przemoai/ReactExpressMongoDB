import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { login } from "../redux/apiCalls";
import { mobile } from "../responsive";
import { Link } from "react-router-dom"
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

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
  width: 25%;
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
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #7e00f3;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled{
    color: green;
    cursor: not-allowed;
  }
`;

const Option = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const Error = styled.span`
  color: red;
`

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch()
  const { isFetching, error } = useSelector((state) => state.user)
 
  
  const handleClick = (e) => {
    e.preventDefault()
    login(dispatch, { username, password })
    
  }

  return (
    <Container>

      <Wrapper>
        <TitleWrapper>
          <Title>Zaloguj się</Title>
          <BackButton><Link to="/"><ArrowBackIosOutlinedIcon/></Link></BackButton>
        </TitleWrapper>
        <Form>
          <Input placeholder="login" onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="hasło" onChange={(e) => setPassword(e.target.value)} />
          <Button onClick={handleClick} disabled={isFetching}>LOGIN</Button>
          {error && <Error>Błędny login lub hasło</Error>}
          <Option><Link to="/">Nie pamietasz hasla?</Link></Option>
          <Option> <Link to="/register">Uwtórz konto</Link></Option>
        </Form>

      </Wrapper>
    </Container>
  );
};

export default Login;
