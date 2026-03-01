import { COLORS } from "../styles/theme";

export default function CompanyCard({ company, index, isBooked, limitReached, onBook }) {
  return (
    <div
      style={{
        background: COLORS.white,
        border: `1px solid #D4C9B0`,
        borderLeft: `3px solid ${COLORS.gold}`,
        padding: "24px 28px",
        animation: `fadeUp .4s ease ${index * 0.05}s both`,
        transition: "box-shadow .2s, transform .2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,.1)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "none";
      }}
    >
      {/* Header row */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 18, fontWeight: 700, lineHeight: 1.3, flex: 1,
        }}>
          {company.name}
        </h3>
        {isBooked && (
          <span style={{
            fontFamily: "'DM Mono', monospace", fontSize: 10,
            background: COLORS.sage, color: "#fff",
            padding: "3px 8px", borderRadius: 2,
            marginLeft: 8, whiteSpace: "nowrap",
          }}>
            BOOKED
          </span>
        )}
      </div>

      {/* Description */}
      {company.description && (
        <p style={{ fontSize: 13, color: COLORS.muted, marginBottom: 16, lineHeight: 1.6 }}>
          {company.description.slice(0, 100)}
          {company.description.length > 100 ? "…" : ""}
        </p>
      )}

      {/* Info */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 20 }}>
        {company.addr && (
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.muted }}>
            📍 {company.addr}
          </span>
        )}
        {company.tel && (
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.muted }}>
            📞 {company.tel}
          </span>
        )}
        {company.website && (
          <a
            href={company.website}
            target="_blank" rel="noreferrer"
            style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.gold }}
          >
            🌐 {company.website}
          </a>
        )}
      </div>

      {/* Action */}
      <button
        onClick={() => !limitReached && onBook(company)}
        disabled={limitReached}
        style={{
          width: "100%", padding: "10px",
          background: limitReached ? "#eee" : COLORS.ink,
          color: limitReached ? COLORS.muted : COLORS.gold,
          border: "none",
          cursor: limitReached ? "not-allowed" : "pointer",
          fontFamily: "'DM Mono', monospace", fontSize: 12, letterSpacing: 1,
          borderRadius: 2,
        }}
      >
        {limitReached && !isBooked ? "Limit Reached" : "Book Interview →"}
      </button>
    </div>
  );
}