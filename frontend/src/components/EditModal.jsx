import { useState } from "react";
import { COLORS } from "../styles/theme";
import { api } from "../utils/api";

const DATE_OPTIONS = ["2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13"];

export default function EditModal({ interview, token, onClose, onSaved }) {
  const [editDate, setEditDate] = useState(
    interview.sessionDate?.split("T")[0] || "2022-05-10"
  );
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const data = await api(
      `/interviews/${interview._id}`,
      { method: "PUT", body: JSON.stringify({ sessionDate: editDate }) },
      token
    );
    setSaving(false);
    if (data.success) {
      onSaved(interview._id, editDate);
    } else {
      onClose(data.message || "Update failed");
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0,
        background: "rgba(13,13,13,.7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 100,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div style={{
        background: COLORS.white,
        borderTop: `3px solid ${COLORS.gold}`,
        padding: "40px 48px", width: 420,
        animation: "fadeUp .3s ease",
      }}>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, letterSpacing: 3,
          color: COLORS.muted, marginBottom: 8,
        }}>
          RESCHEDULE
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 22, fontWeight: 700, marginBottom: 24,
        }}>
          {interview.company?.name || "Interview"}
        </h3>

        <label style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, letterSpacing: 2,
          color: COLORS.muted, display: "block", marginBottom: 8,
        }}>
          NEW DATE
        </label>
        <select
          value={editDate}
          onChange={(e) => setEditDate(e.target.value)}
          style={{
            width: "100%", padding: "12px 16px",
            background: COLORS.paper, border: `1px solid #D4C9B0`,
            fontFamily: "'Libre Baskerville', serif", fontSize: 14,
            color: COLORS.ink, borderRadius: 2, marginBottom: 28,
          }}
        >
          {DATE_OPTIONS.map((d) => (
            <option key={d} value={d}>
              {new Date(d).toLocaleDateString("en-US", {
                weekday: "long", month: "long", day: "numeric", year: "numeric",
              })}
            </option>
          ))}
        </select>

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => onClose()} style={{
            flex: 1, padding: "12px", background: "none",
            border: `1px solid #D4C9B0`, cursor: "pointer",
            fontFamily: "'DM Mono', monospace", fontSize: 12, borderRadius: 2,
          }}>
            Cancel
          </button>
          <button onClick={save} disabled={saving} style={{
            flex: 2, padding: "12px",
            background: saving ? COLORS.muted : COLORS.ink,
            color: COLORS.gold, border: "none",
            cursor: saving ? "not-allowed" : "pointer",
            fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700,
            borderRadius: 2,
          }}>
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
