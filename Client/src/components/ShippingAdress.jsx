import styled from "styled-components";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { updateUserAddress } from "../redux/apiCalls";
import { Alert } from "@mui/material";
const Container = styled.div`
  
`;

const AccountTitle = styled.h1`
  font-weight: 200;
`;

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

const Error = styled.div`
  flex:1;   
  margin: 0px 10px 0px 0px;
  padding: 10px;
  color:red;
  min-width: 60%;
  
`
const ErrorBox= styled.div`
  flex-basis:100%;  
`
const ErrorContent = styled.div`
  width:40%
`

const ShippingAdress = () => {
  const user = useSelector((state) => state.user.currentUser)
  const [city, setCity] = useState(null)
  const [zipcode, setZipcode] = useState(null)
  const [street, setstreet] = useState(null)
  const [houseNumber, setHouserNumber] = useState(null)
  const [validationCheck, setValidationCheck] = useState(false)
  const dispatch = useDispatch()
  const { isFetching, messageSucces, messageFail } = useSelector((state) => state.user)
  
  const isValidCity = city !== ("" || null)
  const isValidStreet = street !== ("" || null) 
  const isValidHouseNumber = /^[1-9]\d*(?: ?(?:[a-z]|[/-] ?\d+[a-z]?))?$/.test(houseNumber);
  const isValidZipCode = /^([0-9]{2}-)?[0-9]{3}$/.test(zipcode);  
  
  let isFormValid = isValidCity && isValidStreet && isValidHouseNumber && isValidZipCode
  

  const handleClick = async (e) => {    
    e.preventDefault();
    setValidationCheck(true); 
    console.log(isFormValid)

    if(isFormValid) {
      const userId = user._id
      const token = "Bearer "+user.accessToken    
      updateUserAddress(dispatch,userId,token,{city,zipcode,street,houseNumber})
      setValidationCheck(false); 
    }
    
  }

  return( 
          <Container>
          <AccountTitle>Zmień adres</AccountTitle>
            <Form>              
              <Input placeholder="miasto" type="text" required onChange={(e) => setCity(e.target.value)} />
              <Input placeholder="kod pocztowy        XX-XXX" maxLength="6" type="text" required onChange={(e) => setZipcode(e.target.value)} />
              <Input placeholder="ulica" type="text" required onChange={(e) => setstreet(e.target.value)} />
              <Input placeholder="nr domu                 XX/X " type="mail" required onChange={(e) => setHouserNumber(e.target.value)} />
              <Button onClick={handleClick} disabled={isFetching} >Zmień</Button>
              
             
              <ErrorBox> 
                <ErrorContent>      
              {(!isValidCity && validationCheck) && <Error><Alert severity="error" variant="outlined">Błędny format miasta</Alert></Error>}
              {(!isValidZipCode && validationCheck) && <Error><Alert severity="error" variant="outlined">Kod pocztowy powinienen wygladac tak XX-XXX</Alert></Error>}              
              {(!isValidStreet && validationCheck) && <Error><Alert severity="error" variant="outlined">Błędny format ulicy</Alert></Error>}
              {(!isValidHouseNumber && validationCheck) && <Error><Alert severity="error" variant="outlined">Błędny format nr domu</Alert></Error>} 
                </ErrorContent>  
              </ErrorBox> 

            </Form>
          </Container>
  )
};


export default ShippingAdress;