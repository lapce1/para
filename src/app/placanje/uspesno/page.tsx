import type { Metadata } from "next";
import SuccessClient from "./success-client";

export const metadata: Metadata = {
  title: "Plaćanje uspešno — PARA",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SuccessClient />;
}
