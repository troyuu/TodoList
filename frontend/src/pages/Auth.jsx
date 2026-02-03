import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function Field({ label, id, type = "text", value, onChange, placeholder }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm mb-1 text-white/70">
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                   text-sm placeholder-white/40
                   focus:outline-none focus:ring-2 focus:ring-white/30"
      />
    </div>
  );
}

export default function Auth() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, register } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectTo = useMemo(() => {
    return location.state?.from || "/";
  }, [location.state]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    try {
      if (mode === "login") {
        await login({ email, password });
      } else {
        await register({ email, password });
      }
      navigate(redirectTo, { replace: true });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-white/10 grid place-items-center text-lg font-semibold">
              ✓
            </div>
            <h1 className="text-2xl font-semibold">
              {mode === "login" ? "Welcome back" : "Create an account"}
            </h1>
            <p className="text-sm text-white/60">
              {mode === "login"
                ? "Sign in to continue to your tasks"
                : "Register to start managing tasks"}
            </p>
          </div>

          <div className="mb-5 grid grid-cols-2 rounded-lg border border-white/10 bg-zinc-950 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={[
                "rounded-md py-2 text-sm transition",
                mode === "login"
                  ? "bg-white text-zinc-950"
                  : "text-white/70 hover:text-white",
              ].join(" ")}
            >
              Login
            </button>

            <button
              type="button"
              onClick={() => setMode("register")}
              className={[
                "rounded-md py-2 text-sm transition",
                mode === "register"
                  ? "bg-white text-zinc-950"
                  : "text-white/70 hover:text-white",
              ].join(" ")}
            >
              Register
            </button>
          </div>

          {error && (
            <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Field
              label="Email"
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />

            <Field
              label="Password"
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />

            <button
              type="submit"
              className="w-full rounded-md bg-white text-zinc-950 py-2 text-sm font-medium
                         hover:bg-white/90 transition
                         focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              {mode === "login" ? "Sign in" : "Create account"}
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-white/50">
          This is a UI-only auth flow for now. Replace login/register with API calls later.
        </p>
      </div>
    </div>
  );
}
