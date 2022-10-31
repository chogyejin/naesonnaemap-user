import styled from "@emotion/styled";

const Header = () => {
  return <Container>헤더</Container>;
};

const Container = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  height: 40px;
  background-color: #aaa;
`;

export default Header;
