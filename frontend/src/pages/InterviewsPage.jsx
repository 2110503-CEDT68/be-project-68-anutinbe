import { useState, useEffect } from "react";
import { COLORS } from "../styles/theme";
import { api } from "../utils/api";
import InterviewCard from "../components/InterviewCard";
import EditModal from "../components/EditModal";
import Loader from "../components/Loader";

export default function InterviewsPage({ token, showToast }) {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);

  const load = () => {
    setLoading(true);
    api("/interviews", {}, token).then((d) => {
      if (d.success) setInterviews(d.data || []);
      setLoading(false);
    });
  };
  useEffect(load, [token]);

  const handleDelete = async (id) => {
    if (!confirm("Delete this booking?")) return;
    const d = await api(`/interviews/${id}`, { method: "DELETE" }, token);
    if (d.success) {
      showToast("Booking deleted", "success");
      setInterviews((p) => p.filter((i) => i._id !== id));
    } else {
      showToast(d.message || "Delete failed", "error");
    }
  };

  const handleSaved = (id, newDate) => {
    showToast("Booking updated!", "success");
    setInterviews((p) => p.map((i) => (i._id === id ? { ...i, sessionDate: newDate } : i)));
    setEditing(null);
  };

  const handleModalClose = (errMsg) => {
    if (errMsg) showToast(errMsg, "error");
    setEditing(null);
  };

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "48px 40px" }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: COLORS.muted, marginBottom: 8 }}>
          MY SCHEDULE
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900 }}>
          Interview Bookings
        </h2>
        {/* Slot indicators */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12 }}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{
              width: 40, height: 6, borderRadius: 3,
              background: i < interviews.length ? COLORS.gold : "#D4C9B0",
            }} />
          ))}
          <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: COLORS.muted, marginLeft: 8 }}>
            {interviews.length} of 3 slots used
          </span>
        </div>
      </div>

      {/* Empty state */}
      {interviews.length === 0 ? (
        <div style={{
          background: COLORS.white, border: `1px dashed #D4C9B0`,
          padding: "60px 40px", textAlign: "center",
        }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: COLORS.muted, marginBottom: 8 }}>
            No bookings yet
          </div>
          <p style={{ fontSize: 13, color: COLORS.muted }}>
            Browse companies to book your interview sessions
          </p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {interviews.map((iv, i) => (
            <InterviewCard
              key={iv._id}
              interview={iv}
              index={i}
              onEdit={setEditing}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Edit modal */}
      {editing && (
        <EditModal
          interview={editing}
          token={token}
          onSaved={handleSaved}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}
