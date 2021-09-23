import React from "react";
import Header from "./Header";

export interface LayoutProps {
  children: JSX.Element;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
}
