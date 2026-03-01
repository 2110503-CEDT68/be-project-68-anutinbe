import { COLORS } from "../styles/theme";

export default function Header({ user, onLogout, onChangePassword, page, setPage }) {
  return (
    <header style={{
      background: COLORS.ink,
      color: COLORS.paper,
      borderBottom: `3px solid ${COLORS.gold}`,
      padding: "0 40px",
    }}>
      <div style={{
        maxWidth: 1100, margin: "0 auto",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        height: 68,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
          <span style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 22, fontWeight: 900,
            letterSpacing: "-0.5px", color: COLORS.gold,
          }}>
            JOB FAIR
          </span>
          <span style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: 11, color: COLORS.muted, letterSpacing: 3,
          }}>
            MAY 10–13 · 2022
          </span>
        </div>

        {/* Nav */}
        {user && (
          <nav style={{ display: "flex", gap: 6, alignItems: "center" }}>
            {[
              { id: "companies", label: "Companies" },
              { id: "interviews", label: "My Bookings" },
            ].map((n) => (
              <button key={n.id} onClick={() => setPage(n.id)} style={{
                background: page === n.id ? COLORS.gold : "transparent",
                color: page === n.id ? COLORS.ink : COLORS.paper,
                border: `1px solid ${page === n.id ? COLORS.gold : "#444"}`,
                padding: "7px 18px", cursor: "pointer",
                fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 1,
                borderRadius: 2, transition: "all .2s",
              }}>
                {n.label}
              </button>
            ))}

            <div style={{ width: 1, height: 24, background: "#444", margin: "0 8px" }} />

            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 12, color: COLORS.muted }}>
              {user.name}
            </span>

            <button onClick={onChangePassword} style={{
              background: "transparent", color: COLORS.paper,
              border: `1px solid #444`,
              padding: "7px 14px", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              borderRadius: 2,
            }}>
              🔑 Password
            </button>

            <button onClick={onLogout} style={{
              background: "transparent", color: COLORS.rust,
              border: `1px solid ${COLORS.rust}`,
              padding: "7px 14px", cursor: "pointer",
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              borderRadius: 2,
            }}>
              Logout
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
