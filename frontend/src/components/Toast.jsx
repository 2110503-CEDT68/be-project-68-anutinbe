import { useEffect } from "react";
import { COLORS } from "../styles/theme";

export default function Toast({ msg, type, onClose }) {
  useEffect(() => {
    const t = setTimeout(onClose, 3200);
    return () => clearTimeout(t);
  }, [onClose]);

  const bg = type === "error" ? COLORS.rust : COLORS.sage;

  return (
    <div style={{
      position: "fixed", bottom: 28, right: 28, zIndex: 999,
      background: bg, color: "#fff", padding: "14px 22px",
      fontFamily: "'DM Mono', monospace", fontSize: 13,
      borderRadius: 3, boxShadow: "0 4px 24px rgba(0,0,0,.25)",
      animation: "fadeUp .3s ease",
      maxWidth: 340,
    }}>
      {msg}
    </div>
  );
}
