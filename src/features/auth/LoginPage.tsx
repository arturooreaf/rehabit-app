import { useState } from "react";
import { login } from "@/features/auth/auth.service";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const loginAuth = await login(email, password);
      console.log(loginAuth);
    } catch {
      setErrorMessage("Incorrect email or password");
    }
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        className="flex flex-col gap-4 max-w-sm p-15 w-full rounded-xl  bg-white shadow "
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold">Rehabit</h1>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="border rounded-lg px-3 py-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="border rounded-lg px-3 py-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700"
        >
          Log in
        </button>
        {errorMessage && <p className="text-red-600">{errorMessage} </p>}
      </form>
    </main>
  );
}

export default LoginPage;
