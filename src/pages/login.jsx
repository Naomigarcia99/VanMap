import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const AuthPage = () => {
  const { registerUser, loginUser, loading, error, setError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, name, password, isLogin]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLogin) {
      await loginUser({ email, password });
    } else {
      await registerUser({ email, password, name });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-pastelBeige via-pastelBlue to-pastelGreen flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isLogin ? "Iniciar sesión" : "Registrarse"}
        </h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Nombre"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white p-3 rounded-xl font-semibold focus:outline-none transition hover:bg-blue-600"
          >
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 underline hover:text-blue-700"
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default AuthPage;
