import { useState } from "react";
import { globalStyle } from "./styles/theme";
import { api } from "./utils/api";

import Header from "./components/Header";
import Toast from "./components/Toast";
import ChangePasswordModal from "./components/ChangePasswordModal";
import AuthPage from "./pages/AuthPage";
import CompaniesPage from "./pages/CompaniesPage";
import InterviewsPage from "./pages/InterviewsPage";

export default function App() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("companies");
  const [toast, setToast] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);

  const showToast = (msg, type = "success") => setToast({ msg, type });

  const handleLogin = (tok, data) => {
    setToken(tok);
    setUser(data);
    setPage("companies");
  };

  const handleLogout = async () => {
    if (token) await api("/auth/logout", {}, token);
    setToken(null);
    setUser(null);
  };

  return (
    <>
      <style>{globalStyle}</style>

      {toast && (
        <Toast
          msg={toast.msg}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {!token ? (
        <AuthPage onLogin={handleLogin} showToast={showToast} />
      ) : (
        <>
          <Header
            user={user}
            onLogout={handleLogout}
            onChangePassword={() => setShowChangePassword(true)}
            page={page}
            setPage={setPage}
          />
          {page === "companies" ? (
            <CompaniesPage token={token} showToast={showToast} />
          ) : (
            <InterviewsPage token={token} showToast={showToast} />
          )}
          {showChangePassword && (
            <ChangePasswordModal
              token={token}
              onClose={() => setShowChangePassword(false)}
              showToast={showToast}
            />
          )}
        </>
      )}
    </>
  );
}
