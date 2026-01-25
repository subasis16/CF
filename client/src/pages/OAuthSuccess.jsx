import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function OAuthSuccess() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      login(token);
      navigate("/", { replace: true });
    }
  }, [token]);

  return null;
}
