import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { mobile } from "../responsive";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { Link } from 'react-router-dom'
import { register } from "../redux/apiCalls";

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
  width: 50%;
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
  :disabled {background-color: #3c3b3d;}
`;

const InfoBox = styled.div`
  display:flex;  
  font-size: 16px;
`

const Error = styled.span`
flex:1;   
  margin: 0px 10px 0px 0px;
  padding: 10px;
  color:red;
`

const Succes = styled.span`  
flex:1;    
  margin: 0px 10px 0px 0px;
  padding: 10px;
  color:green;
`



const Register = () => {

  const [name, setName] = useState(null)
  const [lastname, setLastname] = useState(null)
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [email, setEmail] = useState(null);
  const [passwordAgain, setPasswordAgain] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch()
  const { isFetching, messageSucces, messageFail } = useSelector((state) => state.user)

  const isValid = email != null && email.trim().length > 0;
  const handleClick = async (e) => {
    e.preventDefault();
    if (password !== passwordAgain) {
      setError("Hasła nie są takie same")
    }
    else {
      setError(null)
      register(dispatch, { name, lastname, username, email, password })


    }

};



  return (
    <Container>
      <Wrapper>
        <TitleWrapper>
          <Title>REGISTER</Title>
          <BackButton><Link to="/"><ArrowBackIosOutlinedIcon /></Link></BackButton>
        </TitleWrapper>
        <Form onSubmit={handleClick}>
          <Input placeholder="name" type="text" required onChange={(e) => setName(e.target.value)} />
          <Input placeholder="last name" type="text" required onChange={(e) => setLastname(e.target.value)} />
          <Input placeholder="username" type="text" required onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" type="mail" required onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="password" type="text" required onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="confirm password" type="text" required onChange={(e) => setPasswordAgain(e.target.value)} />
          <Agreement>
            By creating an account, I consent to the processing of my personal
            data in accordance with the <b>PRIVACY POLICY</b>

          </Agreement>

          <Button onClick={handleClick} disabled={isFetching || !isValid}>CREATE</Button>

          <TitleWrapper>
            <InfoBox>{error && <Error>{error}</Error>}    </InfoBox>
            <InfoBox>{messageSucces !== null && <Succes>{messageSucces}</Succes>} </InfoBox>
            <InfoBox>{messageFail !== null && <Error>{JSON.stringify(messageFail).slice(1,-1)}</Error>} </InfoBox>
          </TitleWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
