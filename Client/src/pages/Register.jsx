import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { mobile } from "../responsive";
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import { Link } from 'react-router-dom'
import { register } from "../redux/apiCalls";
import { Alert } from '@mui/material';

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
  flex-direction: row;
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
  margin-top: 1%;
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: #7e00f3;  
  color: white;
  cursor: pointer;
  :disabled {background-color: #3c3b3d;}
`;

const InfoBox = styled.div`
margin-left: 5px;
  display:flex;  
  font-size: 16px;
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
  const { isFetching, messageSuccess, messageFail } = useSelector((state) => state.user)

  const nameValid =     name      != null && name.trim().length > 0
  const lastnameValid = lastname  != null && lastname.trim().length > 0
  const mailValid =     email     != null && email.trim().length > 0
  const usernameValid = username  != null && username.trim().length > 0
  const passwordValid = password  != null && password.trim().length > 0


  const isValid = nameValid && mailValid && usernameValid && lastnameValid && passwordValid
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
          <Input placeholder="imię" type="text" required onChange={(e) => setName(e.target.value)} />
          <Input placeholder="nazwisko" type="text" required onChange={(e) => setLastname(e.target.value)} />
          <Input placeholder="login" type="text" required onChange={(e) => setUsername(e.target.value)} />
          <Input placeholder="email" type="mail" required onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="hasło" type="password" required onChange={(e) => setPassword(e.target.value)} />
          <Input placeholder="powtórz hasło" type="password" required onChange={(e) => setPasswordAgain(e.target.value)} />
          <Agreement>

            Tworząc konto wyrażasz zgodę na przetwarzanie danych oraz
            ackeptujesz regulamin i politykę prywatności <b>POLITYKA PRYWATNOŚCI</b>
          </Agreement>

          <Button onClick={handleClick} disabled={isFetching || !isValid}>CREATE</Button>

          <TitleWrapper>          

            <InfoBox>{error && <Alert variant="outlined" severity="error">
                      {error}
                    </Alert>}    </InfoBox>
            
            <InfoBox>{messageSuccess !== false && <Alert variant="outlined" severity="success">
                      {messageSuccess}
                    </Alert>} </InfoBox>
                       
            {messageFail !== false &&<InfoBox>
                    <Alert variant="outlined" severity="error">
                      {messageFail}
                    </Alert>
             
            </InfoBox> }
          </TitleWrapper>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;