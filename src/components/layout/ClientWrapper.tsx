"use client";

import { ReactNode, useState } from "react";
import Preloader from "../layout/Preloader";

export default function ClientWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {children}

      {loading && <Preloader onFinish={() => setLoading(false)} />}
    </>
  );
}