import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #7e00f3;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
`;

const Announcement = () => {
  return <Container>Darmowa dostawa przy zamówieniach powyżej 300zł</Container>;
};


export default Announcement;
