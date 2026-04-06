import React from 'react';

const LoadingScreen = ({ title = 'Please Wait...', message = 'Preparing your RedBridge experience' }) => {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-linear-to-br from-base-100 via-base-200 to-base-300 px-4">
      <div className="relative flex w-full max-w-md flex-col items-center rounded-3xl border border-base-300 bg-base-100/90 p-8 text-center shadow-2xl backdrop-blur">
        <div className="absolute -left-10 -top-10 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <div className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full bg-error/10 blur-2xl" />

        <div className="relative mb-5 flex h-24 w-24 items-center justify-center rounded-full border border-primary/20 bg-base-100 shadow-lg">
          <span className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
          <img
            src="/logo.png"
            alt="RedBridge logo"
            className="h-14 w-14 animate-pulse object-contain"
          />
        </div>
        <h2 className="text-2xl font-black text-base-content">{title}</h2>
        <p className="mt-2 max-w-sm text-sm text-base-content/70">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;