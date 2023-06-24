import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from '@/components/ui/button';

function Login() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <Button
        className="w-[250px]"
        onClick={() => loginWithRedirect()}
      >
        Log In
      </Button>
    </div>
  );
}

export default Login;
