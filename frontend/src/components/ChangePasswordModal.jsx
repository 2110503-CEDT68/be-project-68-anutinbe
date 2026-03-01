import { useState } from "react";
import { COLORS } from "../styles/theme";
import { api } from "../utils/api";

export default function ChangePasswordModal({ token, onClose, showToast }) {
  const [form, setForm] = useState({ oldPassword: "", newPassword: "", confirmPassword: "" });
  const [saving, setSaving] = useState(false);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handle = async () => {
    if (form.newPassword !== form.confirmPassword) {
      showToast("New passwords do not match", "error");
      return;
    }
    if (form.newPassword.length < 6) {
      showToast("New password must be at least 6 characters", "error");
      return;
    }

    setSaving(true);
    const data = await api(
      "/auth/changePassword",
      { method: "PUT", body: JSON.stringify({ oldPassword: form.oldPassword, newPassword: form.newPassword }) },
      token
    );
    setSaving(false);

    if (data.success) {
      showToast("Password changed successfully!", "success");
      onClose();
    } else {
      showToast(data.message || "Failed to change password", "error");
    }
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: COLORS.paper, border: `1px solid #D4C9B0`,
    borderRadius: 2, fontSize: 14,
    fontFamily: "'Libre Baskerville', serif",
    color: COLORS.ink, outline: "none",
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
          ACCOUNT
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24, fontWeight: 700, marginBottom: 28,
        }}>
          Change Password
        </h3>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.muted, display: "block", marginBottom: 6 }}>
              CURRENT PASSWORD
            </label>
            <input
              type="password" style={inputStyle}
              placeholder="Enter current password"
              value={form.oldPassword} onChange={set("oldPassword")}
            />
          </div>
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.muted, display: "block", marginBottom: 6 }}>
              NEW PASSWORD
            </label>
            <input
              type="password" style={inputStyle}
              placeholder="At least 6 characters"
              value={form.newPassword} onChange={set("newPassword")}
            />
          </div>
          <div>
            <label style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 2, color: COLORS.muted, display: "block", marginBottom: 6 }}>
              CONFIRM NEW PASSWORD
            </label>
            <input
              type="password" style={inputStyle}
              placeholder="Repeat new password"
              value={form.confirmPassword} onChange={set("confirmPassword")}
              onKeyDown={(e) => e.key === "Enter" && handle()}
            />
          </div>
        </div>

        <div style={{ display: "flex", gap: 12, marginTop: 28 }}>
          <button onClick={onClose} style={{
            flex: 1, padding: "12px", background: "none",
            border: `1px solid #D4C9B0`, cursor: "pointer",
            fontFamily: "'DM Mono', monospace", fontSize: 12, borderRadius: 2,
          }}>
            Cancel
          </button>
          <button onClick={handle} disabled={saving} style={{
            flex: 2, padding: "12px",
            background: saving ? COLORS.muted : COLORS.ink,
            color: COLORS.gold, border: "none",
            cursor: saving ? "not-allowed" : "pointer",
            fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700,
            borderRadius: 2,
          }}>
            {saving ? "Saving…" : "Change Password"}
          </button>
        </div>
      </div>
    </div>
  );
}
