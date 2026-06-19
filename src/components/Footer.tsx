import { site } from "@/data/site";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-charsoft">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-bone/60">
            {site.tagline} {site.support}
          </p>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-broth">
            Kontakt
          </h4>
          <ul className="mt-3 space-y-1 text-sm text-bone/70">
            <li>
              <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="hover:text-broth">
                {site.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-broth">
                {site.email}
              </a>
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-bold uppercase tracking-wider text-broth">
            Dostava
          </h4>
          <p className="mt-3 text-sm text-bone/70">{site.zones.join(" · ")}</p>
          <div className="mt-3 flex gap-3 text-sm">
            <a href={site.aggregators.wolt} className="text-bone/70 hover:text-broth">Wolt</a>
            <a href={site.aggregators.glovo} className="text-bone/70 hover:text-broth">Glovo</a>
            <a href={site.aggregators.mrd} className="text-bone/70 hover:text-broth">mr.D</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-5 text-center text-xs text-bone/40">
        © {new Date().getFullYear()} {site.name} — vijetnamska phở kuhinja i dostava, {site.city}.
        Sva prava zadržana.
      </div>
    </footer>
  );
}
