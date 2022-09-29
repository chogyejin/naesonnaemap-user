import styled from "@emotion/styled";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
};

const Main = styled.main``;

export default Layout;
