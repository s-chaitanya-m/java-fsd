import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-lg p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-2xl font-bold">
              ✓
            </div>

            <h1 className="text-3xl font-bold text-slate-800">
              TaskTracker
            </h1>

            <p className="text-slate-500 mt-2">
              Manage projects and tasks efficiently
            </p>
          </div>

          {/* Login Button */}
          <a
            href={
              import.meta.env.VITE_BACKEND_URL +
              "/oauth2/authorize/google"
            }
            className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-slate-300 rounded-lg hover:bg-slate-50 transition font-medium text-slate-700"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFC107"
                d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
              />
              <path
                fill="#FF3D00"
                d="M6.3 14.7l6.6 4.8C14.7 15 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
              />
              <path
                fill="#4CAF50"
                d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.8 36 24 36c-5.2 0-9.6-3.3-11.2-8l-6.5 5C9.6 39.5 16.2 44 24 44z"
              />
              <path
                fill="#1976D2"
                d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.5-6.1 7.1l6.2 5.2C39 37.1 44 31.2 44 24c0-1.3-.1-2.4-.4-3.5z"
              />
            </svg>

            Continue with Google
          </a>

          <div className="mt-6 text-center text-sm text-slate-500">
            Secure authentication powered by Google OAuth
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;