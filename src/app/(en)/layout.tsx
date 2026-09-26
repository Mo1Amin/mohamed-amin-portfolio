import type { ReactNode } from "react";
import { Document, metadataFor } from "../document";

export { viewport } from "../document";
export const metadata = metadataFor("en");

export default function EnglishLayout({ children }: { children: ReactNode }) {
  return <Document locale="en">{children}</Document>;
}
