"use client";

import { TabBar } from "@/components/shell/TabBar";

export function AppFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-[#f3efe6] text-[#1c1915] lg:flex">
      <TabBar />
      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
