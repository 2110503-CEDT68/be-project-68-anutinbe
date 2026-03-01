import { COLORS } from "../styles/theme";

export default function InterviewCard({ interview, index, onEdit, onDelete }) {
  const company = interview.company || {};
  const date = new Date(interview.sessionDate);
  const day = date.getUTCDate();
  const month = date.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });

  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid #D4C9B0`,
      borderLeft: `4px solid ${COLORS.gold}`,
      padding: "24px 28px",
      display: "flex", alignItems: "center", gap: 24,
      animation: `fadeUp .4s ease ${index * 0.07}s both`,
    }}>
      {/* Date badge */}
      <div style={{
        background: COLORS.ink, color: COLORS.gold,
        padding: "12px 16px", textAlign: "center",
        minWidth: 64, flexShrink: 0, borderRadius: 2,
      }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 10, letterSpacing: 2 }}>
          {month.toUpperCase()}
        </div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 900, lineHeight: 1 }}>
          {day}
        </div>
      </div>

      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 700, marginBottom: 4 }}>
          {company.name || "Company"}
        </h3>
        <div style={{ display: "flex", gap: 16 }}>
          {company.tel && (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.muted }}>
              📞 {company.tel}
            </span>
          )}
          {company.description && (
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.muted }}>
              {company.description.slice(0, 50)}
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
        <button onClick={() => onEdit(interview)} style={{
          padding: "8px 16px", background: "none",
          border: `1px solid ${COLORS.gold}`, color: COLORS.gold,
          cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11,
          borderRadius: 2,
        }}>
          Edit
        </button>
        <button onClick={() => onDelete(interview._id)} style={{
          padding: "8px 16px", background: "none",
          border: `1px solid ${COLORS.rust}`, color: COLORS.rust,
          cursor: "pointer", fontFamily: "'DM Mono', monospace", fontSize: 11,
          borderRadius: 2,
        }}>
          Delete
        </button>
      </div>
    </div>
  );
}