export const COLORS = {
  ink: "#0D0D0D",
  paper: "#F5F0E8",
  cream: "#EDE8DC",
  gold: "#C8A84B",
  goldLight: "#E8C96A",
  rust: "#B85C38",
  sage: "#5A7A5E",
  muted: "#8A8070",
  white: "#FEFCF8",
};

export const globalStyle = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700;900&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Mono:wght@300;400&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: ${COLORS.paper};
    color: ${COLORS.ink};
    font-family: 'Libre Baskerville', Georgia, serif;
    min-height: 100vh;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(20px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;
