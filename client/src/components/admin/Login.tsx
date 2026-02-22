import { useState } from "react";

function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = () => {};
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-fullvmax-w-sm p-6 max-md:m-6 border border-(--color-primary)/30 shadow-xl shadow-(--color-primary)/15 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="w-full py-6 text-center">
            <h1 className="text-3xl font-bold">
              <span className="text-(--color-primary)">admin</span>Login
            </h1>
            <p className="font-light">
              Enter your credentials to access the admin panel
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col">
              <label> Email </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="your email id"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <div className="flex flex-col">
              <label> Password </label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="your password"
                className="border-b-2 border-gray-300 p-2 outline-none mb-6"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 font-medium bg-(--color-primary)
text-white rounded cursor-pointer hover:bg-(--color-primary)/90
transition-all"
            >
              {" "}
              Login{" "}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
