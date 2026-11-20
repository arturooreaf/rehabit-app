import {useState } from "react";

function LoginPage() {
const [email,setEmail] = useState("");
const [password, setPassword] =useState("");

function handleSubmit(e: React.FormEvent<HTMLFormElement>){ 
  e.preventDefault();

  console.log("Form submitted", email);


}

  return (
    <form onSubmit={handleSubmit}>
      <h1>Rehabit</h1>

      <label htmlFor="email">Email</label>
      <input id="email" type="email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
      <label htmlFor="password">Password</label>
      <input id="password" type ="password" value={password} onChange={(e)=> setPassword(e.target.value)} />
     <button type="submit">Log in</button>
    </form>
  );
}

export default LoginPage;
