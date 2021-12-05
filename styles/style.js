import { css, Global, keyframes } from '@emotion/react';
import styled from '@emotion/styled';

export const globalStyles = (
  <Global
    styles={css`
      html,
      body {
        margin: 0;
        background: papayawhip;
        min-height: 100vh;
        font-size: 24px;
      }
    `}
  />
);

export const navbarStyles = css`
  background-color: white;
  text-align: center;
`;

export const NavbarDiv = styled.div`
  ${navbarStyles};
`;

export const footerStyles = css`
  background-color: white;
  text-align: center;
  margin-top: auto;
`;

export const FooterDiv = styled.div`
  ${footerStyles};
`;

export const ContainerStyles = css`
  min-height: 100vh;
  width: 100%;
`;

export const ContainerDiv = styled.div`
  ${ContainerStyles};
`;

// export const hoverStyles = css`
//   &:hover {
//     color: white;
//     background-color: lightgray;
//     border-color: aqua;
//     box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
//   }
// `
// export const bounce = keyframes`
//   from {
//     transform: scale(1.01);
//   }
//   to {
//     transform: scale(0.99);
//   }
// `

// export const Combined = styled.div`
//   ${basicStyles};
//   ${hoverStyles};
//   & code {
//     background-color: linen;
//   }
// `
// export const Animated = styled.div`
//   ${basicStyles};
//   ${hoverStyles};
//   & code {
//     background-color: linen;
//   }
//   animation: ${({ animation }) => animation} 0.2s infinite ease-in-out alternate;
// `
