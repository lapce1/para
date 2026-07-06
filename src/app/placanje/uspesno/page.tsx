import type { Metadata } from "next";
import SuccessClient from "./success-client";

export const metadata: Metadata = {
  title: "Plaćanje uspešno",
  robots: { index: false, follow: false },
};

export default function Page() {
  return <SuccessClient />;
}
