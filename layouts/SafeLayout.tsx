import React from "react";

// react node element
export interface SafeLayoutProps {
  children: React.ReactNode;
}

export default function SafeLayout({ children }: SafeLayoutProps) {
  return <div className="safe-layout">{children}</div>;
}
