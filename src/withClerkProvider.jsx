import { ClerkProvider } from '@clerk/clerk-react';
import React from 'react';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

export function withClerkProvider(Component) {
  return function ClerkWrapped(props) {
    return (
      <ClerkProvider publishableKey={clerkPubKey}>
        <Component {...props} />
      </ClerkProvider>
    );
  };
}
