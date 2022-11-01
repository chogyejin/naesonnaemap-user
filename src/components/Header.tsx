import styled from "@emotion/styled";

const Header = () => {
  return <Container>헤더</Container>;
};

const Container = styled.header`
  width: 100%;
  position: fixed;
  top: 0;
  height: 40px;
  background-color: #fff;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`;

export default Header;
