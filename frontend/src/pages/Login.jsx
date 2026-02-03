import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // TEMP: replace with real auth later
    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    // Simulate success login
    navigate("/"); // redirect back to app
  }

  return (
    <div className="min-h-dvh bg-zinc-950 text-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-sm">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-white/10 grid place-items-center text-lg font-semibold">
              ✓
            </div>
            <h1 className="text-2xl font-semibold">Welcome back</h1>
            <p className="text-sm text-white/60">
              Sign in to continue to your tasks
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm mb-1 text-white/70"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                           text-sm placeholder-white/40
                           focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm mb-1 text-white/70"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-md border border-white/10 bg-zinc-950 px-3 py-2
                           text-sm placeholder-white/40
                           focus:outline-none focus:ring-2 focus:ring-white/30"
              />
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between text-sm">
              <button
                type="button"
                className="text-white/60 hover:text-white transition"
              >
                Forgot password?
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full rounded-md bg-white text-zinc-950 py-2 text-sm font-medium
                         hover:bg-white/90 transition
                         focus:outline-none focus:ring-2 focus:ring-white/30"
            >
              Sign in
            </button>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-white/60">
          Don’t have an account?{" "}
          <button className="text-white hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
