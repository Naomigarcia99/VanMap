import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Eye from "../assets/images/eye.png";
import Eye2 from "../assets/images/eye2.png";

const AuthPage = () => {
  const { registerUser, loginUser, loading, error, setError } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordShow = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordShow = () =>
    setShowConfirmPassword(!showConfirmPassword);

  useEffect(() => {
    if (error) {
      setError(null);
    }
  }, [email, name, password, isLogin, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (isLogin) {
      await loginUser({ email, password });
    } else {
      await registerUser({ email, password, name });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-r from-pastelBeige via-pastelBlue to-pastelGreen flex justify-center items-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
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

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              onClick={togglePasswordShow}
              className="absolute inset-y-0 right-4 bottom-5"
            >
              <img
                src={showPassword ? Eye2 : Eye}
                alt="Mostrar contraseña"
                className="h-5 w-5"
              />
            </button>
          </div>

          {!isLogin && (
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                className="w-full p-3 mb-6 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordShow}
                className="absolute inset-y-0 right-3 right-4 bottom-5"
              >
                <img
                  src={showConfirmPassword ? Eye2 : Eye}
                  alt="Mostrar contraseña"
                  className="h-5 w-5"
                />
              </button>
            </div>
          )}

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
