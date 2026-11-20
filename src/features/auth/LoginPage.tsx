function LoginPage() {
  return (
    <form>
      <h1>Rehabit</h1>

      <label htmlFor="email">Email</label>
      <input id="email" type="email" />
      <label htmlFor="password">Password</label>
      <input id="password" type ="password" />
     <button type="submit">Log in</button>
    </form>
  );
}

export default LoginPage;
