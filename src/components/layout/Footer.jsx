import { MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import Container from "@/components/common/Container";
import Logo from "@/components/common/Logo";
import { categories } from "@/data/categories";
import { mainNavigation } from "@/data/navigation";
import { siteConfig } from "@/data/site";

const footerLinkClass = "text-[15px] text-ink-2 transition-colors hover:text-accent";

function FooterColumn({ title, className = "", children }) {
  return (
    <div className={className}>
      <h3 className="mb-3.5 font-display text-xl font-bold">{title}</h3>
      {children}
    </div>
  );
}

export default function Footer() {
  return (
    <footer id="contact" className="mt-24 border-t border-line pb-8 pt-14">
      <Container>
        <div className="grid grid-cols-2 gap-x-5 gap-y-9 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr]">
          <div className="col-span-2 max-w-[34ch] lg:col-span-1">
            <Logo />
            <p className="mt-3.5 text-ink-2">{siteConfig.tagline}</p>
          </div>

          <FooterColumn title="Navigation">
            <ul className="space-y-2.5">
              {mainNavigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={footerLinkClass}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Catégories">
            <ul className="space-y-2.5">
              {categories.slice(0, 6).map((category) => (
                <li key={category.slug}>
                  <Link to={`/categories/${category.slug}`} className={footerLinkClass}>
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Contact" className="col-span-2 lg:col-span-1">
            <ul className="space-y-2.5 text-[15px] text-ink-2">
              <li className="flex items-center gap-2.5">
                <Phone size={18} aria-hidden="true" className="text-accent" />
                {siteConfig.phone}
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={18} aria-hidden="true" className="text-accent" />
                {siteConfig.address}
              </li>
            </ul>
          </FooterColumn>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 text-sm text-ink-2">
          <ul className="flex flex-wrap gap-2" aria-label="Réseaux sociaux">
            {siteConfig.socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  className="block rounded-full border border-line-strong px-3.5 py-2 font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bg"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits réservés.
          </p>
        </div>
      </Container>
    </footer>
  );
}
