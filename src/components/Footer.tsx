import Link from "next/link";
import { site } from "@/data/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t-[3px] border-ink bg-board">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Logo />
          <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed text-ink/80">
            Vijetnamska phở kuhinja u {site.cityLoc}. Čorba se krčka šest sati, svakog
            dana.
          </p>
        </div>

        <div className="md:col-span-3">
          <h2 className="stamp text-paprika">Lokal</h2>
          <address className="mt-3 space-y-1 text-[0.9375rem] not-italic text-ink/80">
            <p className="font-semibold text-ink">{site.address}</p>
            <p>{site.city}</p>
            <p className="font-data tabular-nums">{site.hours}</p>
          </address>
          <ul className="mt-3 space-y-1 text-[0.9375rem]">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="inline-block py-1 text-ink underline decoration-paprika decoration-2 underline-offset-4 hover:text-paprika">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="inline-block py-1 text-ink underline decoration-paprika decoration-2 underline-offset-4 hover:text-paprika">
                {site.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h2 className="stamp text-paprika">Dostava</h2>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-ink/80">
            {site.zones.join(" · ")}
          </p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/meni" className="stamp inline-block py-1.5 text-ink hover:text-paprika">
              Meni
            </Link>
            <Link href="/pho" className="stamp inline-block py-1.5 text-ink hover:text-paprika">
              Šta je phở
            </Link>
            <Link href="/poruci" className="stamp inline-block py-1.5 text-ink hover:text-paprika">
              Poruči
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-ink/25">
        <p className="stamp mx-auto max-w-6xl px-5 py-5 text-inksoft">
          © {new Date().getFullYear()} {site.name} — {site.address}, {site.city}
        </p>
      </div>
    </footer>
  );
}
