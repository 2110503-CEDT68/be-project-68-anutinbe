import { useState, useEffect } from "react";
import { COLORS } from "../styles/theme";
import { api } from "../utils/api";
import CompanyCard from "../components/CompanyCard";
import BookingModal from "../components/BookingModal";
import Loader from "../components/Loader";

export default function CompaniesPage({ token, showToast }) {
  const [companies, setCompanies] = useState([]);
  const [userInterviews, setUserInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null); // company to book

  useEffect(() => {
    Promise.all([
      api("/companies", {}, token),
      api("/interviews", {}, token),
    ]).then(([c, i]) => {
      if (c.success) setCompanies(c.data || []);
      if (i.success) setUserInterviews(i.data || []);
      setLoading(false);
    });
  }, [token]);

  const isBooked = (cid) =>
    userInterviews.some((i) => i.company?._id === cid || i.company === cid);

  const handleBooked = (newInterview, companyName) => {
    showToast(`Booked interview with ${companyName}!`, "success");
    setUserInterviews((p) => [...p, newInterview]);
    setSelected(null);
  };

  const handleModalClose = (errMsg) => {
    if (errMsg) showToast(errMsg, "error");
    setSelected(null);
  };

  if (loading) return <Loader />;

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "48px 40px" }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, letterSpacing: 3, color: COLORS.muted, marginBottom: 8 }}>
          PARTICIPATING COMPANIES
        </div>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900 }}>
          Browse &amp; Book Interviews
        </h2>
        <p style={{ color: COLORS.muted, marginTop: 8, fontSize: 14 }}>
          You may book up to 3 interview sessions · {userInterviews.length}/3 used
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {companies.map((c, i) => (
          <CompanyCard
            key={c._id}
            company={c}
            index={i}
            isBooked={isBooked(c._id)}
            limitReached={userInterviews.length >= 3}
            onBook={setSelected}
          />
        ))}
      </div>

      {/* Booking modal */}
      {selected && (
        <BookingModal
          company={selected}
          token={token}
          onBooked={handleBooked}
          onClose={handleModalClose}
          userInterviews={userInterviews}
        />
      )}
    </div>
  );
}