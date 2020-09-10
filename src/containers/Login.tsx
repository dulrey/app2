import React, { useState } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { useAppContext } from "../libs/contextLib";
import { Auth } from "aws-amplify";
import "./Login.css";

function Login() {
  const { userHasAuthenticated } = useAppContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return username.length > 0 && password.length > 0;
  }

  // function handlePassword()

  async function handleSubmit(event: any) {
    event.preventDefault();
  
    try {
      const user = await Auth.signIn(username, password);
      userHasAuthenticated(true);
      Auth.currentSession().then(res=>{
        let refreshToken = res.getRefreshToken()
        console.log(`myIdToken: ${res.getIdToken().getJwtToken()}`)
        let jwt = res.getAccessToken().getJwtToken()
        console.log(`myJwt: ${jwt}`)
      })
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup controlId="username" bsSize="large">
          <ControlLabel>Username</ControlLabel>
          <FormControl
            autoFocus
            type="username"
            value={username}
            onChange={(event: React.FormEvent<FormControl>) => setUsername((event.target as any).value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <ControlLabel>Password</ControlLabel>
          <FormControl
            value={password}
            onChange={(event: React.FormEvent<FormControl>) => setPassword((event.target as any).value)}
            type="password"
          />
        </FormGroup>
        <Button block bsSize="large" disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
  }

  export default Login;