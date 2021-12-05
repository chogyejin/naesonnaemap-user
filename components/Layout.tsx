import Navbar from './Navbar';
import Footer from './Footer';
import { ContainerDiv } from '../styles/style.js';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Navbar />
      <ContainerDiv>{children}</ContainerDiv>
      <Footer />
    </div>
  );
}
