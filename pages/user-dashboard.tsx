import React from 'react';

import { useAuth } from '@context/auth-context';
import Container, { ContainerStyle } from '@layouts/Container';

const UserDashboard = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      {isAuthenticated ? (
        <div>
          <Container style={ContainerStyle.Light}>UserDashboard test</Container>
        </div>
      ) : (
        <Container style={ContainerStyle.Light}>
          <div>Sign In</div>
        </Container>
      )}
    </>
  );
};

export default UserDashboard;
