"use client";

import { SessionProvider } from "next-auth/react";
import { ReduxProvider } from "./ReduxProvider";

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </SessionProvider>
  );
}