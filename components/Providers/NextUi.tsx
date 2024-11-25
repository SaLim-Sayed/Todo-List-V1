"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { NextUIProvider } from "@nextui-org/react"; 

export default function NextUi({ children }: { children: React.ReactNode }) {
 
  const router = useRouter();

  return (
    <NextUIProvider navigate={router.push}>
      
        {children}
     
    </NextUIProvider>
  );
}
