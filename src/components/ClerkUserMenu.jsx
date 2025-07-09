import { UserButton, SignInButton, useUser } from '@clerk/clerk-react';
import React from 'react';

const ClerkUserMenu = ({ darkMode }) => {
  const { isSignedIn } = useUser();

  return (
    <div className="flex items-center space-x-2">
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" />
      ) : (
        <SignInButton mode="modal">
          <button
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 border focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500/50 ${
              darkMode
                ? 'bg-gray-800 text-cyan-300 border-gray-700 hover:bg-gray-700 hover:text-white'
                : 'bg-white text-indigo-600 border-gray-200 hover:bg-indigo-50 hover:text-indigo-800'
            }`}
          >
            Sign In
          </button>
        </SignInButton>
      )}
    </div>
  );
};

export default ClerkUserMenu;
