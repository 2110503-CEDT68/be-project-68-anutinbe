import { COLORS } from "../styles/theme";

export default function Loader() {
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: 300 }}>
      <div style={{
        width: 32, height: 32,
        border: `3px solid #D4C9B0`,
        borderTopColor: COLORS.gold,
        borderRadius: "50%",
        animation: "spin .8s linear infinite",
      }} />
    </div>
  );
}
