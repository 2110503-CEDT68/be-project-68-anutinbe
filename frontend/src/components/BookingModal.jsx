import { useState } from "react";
import { COLORS } from "../styles/theme";
import { api } from "../utils/api";

const ALL_DATES = ["2022-05-10", "2022-05-11", "2022-05-12", "2022-05-13"];

export default function BookingModal({ company, token, onClose, onBooked, userInterviews = [] }) {
  // หาวันที่ถูก book กับบริษัทนี้แล้ว
  const bookedDates = userInterviews
    .filter((i) => i.company?._id === company._id || i.company === company._id)
    .map((i) => i.sessionDate?.split("T")[0]);

  const availableDates = ALL_DATES.filter((d) => !bookedDates.includes(d));

  const [bookDate, setBookDate] = useState(availableDates[0] || "");
  const [booking, setBooking] = useState(false);

  const confirm = async () => {
    setBooking(true);
    const data = await api(
      `/companies/${company._id}/interviews`,
      { method: "POST", body: JSON.stringify({ sessionDate: bookDate }) },
      token
    );
    setBooking(false);
    if (data.success) {
      onBooked(data.data, company.name);
    } else {
      onClose(data.message || "Booking failed");
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
          BOOK INTERVIEW
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 24, fontWeight: 700, marginBottom: 24,
        }}>
          {company.name}
        </h3>

        <label style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: 11, letterSpacing: 2,
          color: COLORS.muted, display: "block", marginBottom: 8,
        }}>
          SELECT DATE
        </label>

        {availableDates.length === 0 ? (
          <div style={{
            background: COLORS.cream, border: `1px solid #D4C9B0`,
            padding: "16px", borderRadius: 2, marginBottom: 28,
            fontFamily: "'DM Mono', monospace", fontSize: 12, color: COLORS.muted,
            textAlign: "center",
          }}>
            ไม่มีวันที่ว่างสำหรับบริษัทนี้แล้ว
          </div>
        ) : (
          <select
            value={bookDate}
            onChange={(e) => setBookDate(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px",
              background: COLORS.paper, border: `1px solid #D4C9B0`,
              fontFamily: "'Libre Baskerville', serif", fontSize: 14,
              color: COLORS.ink, borderRadius: 2, marginBottom: 28,
              appearance: "none",
            }}
          >
            {availableDates.map((d) => (
              <option key={d} value={d}>
                {new Date(d).toLocaleDateString("en-US", {
                  weekday: "long", month: "long", day: "numeric", year: "numeric",
                })}
              </option>
            ))}
          </select>
        )}

        <div style={{ display: "flex", gap: 12 }}>
          <button onClick={() => onClose()} style={{
            flex: 1, padding: "12px", background: "none",
            border: `1px solid #D4C9B0`, cursor: "pointer",
            fontFamily: "'DM Mono', monospace", fontSize: 12, borderRadius: 2,
          }}>
            Cancel
          </button>
          <button
            onClick={confirm}
            disabled={booking || availableDates.length === 0}
            style={{
              flex: 2, padding: "12px",
              background: booking || availableDates.length === 0 ? COLORS.muted : COLORS.ink,
              color: COLORS.gold, border: "none",
              cursor: booking || availableDates.length === 0 ? "not-allowed" : "pointer",
              fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 700,
              borderRadius: 2,
            }}>
            {booking ? "Booking…" : "Confirm Booking"}
          </button>
        </div>
      </div>
    </div>
  );
}