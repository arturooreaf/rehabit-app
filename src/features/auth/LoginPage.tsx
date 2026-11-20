function LoginPage() {

function handleSubmit(e: React.FormEvent<HTMLFormElement>){ 
  e.preventDefault();
  console.log("Form submitted")
}

  return (
    <form onSubmit={handleSubmit}>
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
