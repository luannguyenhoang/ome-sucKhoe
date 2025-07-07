import React from "react";

export default function LayoutDefault({
  children
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-7xl mx-auto md:px-2">{children}</div>;
}
