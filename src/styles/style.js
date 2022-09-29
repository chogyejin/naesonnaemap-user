import { css, Global } from "@emotion/react";

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
      a {
        text-decoration: none;
        color: black;
      }
      a:hover {
        opacity: 0.6;
      }
    `}
  />
);
