import styled from "@emotion/styled";

const Footer = () => {
  return <Container>푸터</Container>;
};

const Container = styled.footer`
  width: 100%;
  height: 40px;
  position: fixed;
  bottom: 0;
  background-color: #fff;
  box-shadow: 0 -2px 4px -1px rgba(0, 0, 0, 0.25);
`;

export default Footer;
