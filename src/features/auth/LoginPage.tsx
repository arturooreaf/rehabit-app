import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(email);
  }
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100">
      <form
        className="flex flex-col gap-4 max-w-sm p-15 w-full rounded-xl  bg-white shadow "
        onSubmit={handleSubmit}
      >
        <h1 className="text-3xl font-bold">Rehabit</h1>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">password</label>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Log in</button>
      </form>
    </main>
  );
}

export default LoginPage;
