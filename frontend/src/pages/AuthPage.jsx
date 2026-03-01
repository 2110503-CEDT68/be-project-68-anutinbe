import { useState } from "react";
import { COLORS } from "../styles/theme";
import { api } from "../utils/api";

export default function AuthPage({ onLogin, showToast }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", tel: "", password: "" });
  const [loading, setLoading] = useState(false);

  const set = (key) => (e) => setForm((p) => ({ ...p, [key]: e.target.value }));

  const handle = async () => {
    setLoading(true);
    try {
      const path = mode === "login" ? "/auth/login" : "/auth/register";
      const body =
        mode === "login"
          ? { email: form.email, password: form.password }
          : { name: form.name, email: form.email, tel: form.tel, password: form.password };

      const data = await api(path, { method: "POST", body: JSON.stringify(body) });

      if (data.success) {
        showToast(mode === "login" ? "Welcome back!" : "Account created!", "success");
        onLogin(data.token, data);
      } else {
        showToast(data.message || data.msg || "Authentication failed", "error");
      }
    } catch {
      showToast("Connection error", "error");
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    background: COLORS.white, border: `1px solid #D4C9B0`,
    borderRadius: 2, fontSize: 14,
    fontFamily: "'Libre Baskerville', serif",
    color: COLORS.ink, outline: "none",
  };

  return (
    <div style={{
      minHeight: "100vh", background: COLORS.paper,
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 20,
    }}>
      <div style={{ animation: "fadeUp .5s ease" }}>
        {/* Masthead */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 4, color: COLORS.muted, marginBottom: 12 }}>
            ANNUAL
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 52, fontWeight: 900, lineHeight: 1, color: COLORS.ink, marginBottom: 8 }}>
            Job Fair
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "center" }}>
            <div style={{ height: 1, width: 48, background: COLORS.gold }} />
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: COLORS.gold }}>
              MAY 10–13 · 2022
            </span>
            <div style={{ height: 1, width: 48, background: COLORS.gold }} />
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: COLORS.white, border: `1px solid #D4C9B0`,
          borderTop: `3px solid ${COLORS.gold}`,
          padding: "40px 48px", width: 420,
          boxShadow: "0 8px 48px rgba(0,0,0,.08)",
        }}>
          {/* Mode tabs */}
          <div style={{ display: "flex", marginBottom: 32, borderBottom: `1px solid #D4C9B0` }}>
            {["login", "register"].map((m) => (
              <button key={m} onClick={() => setMode(m)} style={{
                flex: 1, padding: "10px 0", background: "none",
                border: "none",
                borderBottom: `2px solid ${mode === m ? COLORS.gold : "transparent"}`,
                fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600,
                color: mode === m ? COLORS.gold : COLORS.muted,
                cursor: "pointer", textTransform: "capitalize",
                transition: "all .2s", marginBottom: -1,
              }}>
                {m}
              </button>
            ))}
          </div>

          {/* Fields */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {mode === "register" && (
              <input style={inputStyle} type="text" placeholder="Full Name" value={form.name} onChange={set("name")} />
            )}
            <input style={inputStyle} type="email" placeholder="Email Address" value={form.email} onChange={set("email")} />
            {mode === "register" && (
              <input style={inputStyle} type="tel" placeholder="Telephone Number" value={form.tel} onChange={set("tel")} />
            )}
            <input
              style={inputStyle} type="password" placeholder="Password"
              value={form.password} onChange={set("password")}
              onKeyDown={(e) => e.key === "Enter" && handle()}
            />
          </div>

          <button onClick={handle} disabled={loading} style={{
            width: "100%", marginTop: 24,
            background: loading ? COLORS.muted : COLORS.ink,
            color: COLORS.gold, border: "none",
            padding: "14px", cursor: loading ? "not-allowed" : "pointer",
            fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 700,
            letterSpacing: 1, borderRadius: 2, transition: "background .2s",
          }}>
            {loading ? "Please wait…" : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </div>
      </div>
    </div>
  );
}
