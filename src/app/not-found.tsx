import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="max-w-xl mx-auto px-4 py-20 text-center">
        <p className="font-pixel text-2xl text-status-apocalyptic mb-4 animate-flash-red">
          404
        </p>
        <p className="font-mono text-crt-green-bright mb-2">
          RECORD NOT FOUND IN DATABASE
        </p>
        <p className="font-mono text-sm text-crt-green-dim mb-8">
          No compensation filing exists at this terminal address.
        </p>
        <Link
          href="/"
          className="font-mono text-sm text-cake-gold-bright hover:underline"
        >
          &lt; RETURN TO TERMINAL
        </Link>
      </main>
    </>
  );
}
