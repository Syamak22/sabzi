import VideoLite from "@/components/VideoLite";
import { Stars } from "@/components/Sections";
import { services, site, testimonials } from "@/lib/site";
import Link from "next/link";

// Hero commun à l'accueil et aux pages locales : seuls le bandeau, le titre et le sous-titre changent.
export default function Hero({ badge, title, subtitle }: { badge: string; title: React.ReactNode; subtitle: React.ReactNode }) {
  return (
    <section className="container-site flex flex-col items-center gap-12 pb-14 pt-8 lg:pt-10">
      <div className="flex max-w-[900px] flex-col items-center gap-5 text-center">
        <p className="rounded-full bg-peach px-[18px] py-2 text-sm font-semibold text-brand-deep">{badge}</p>
        <h1 className="h-display">{title}</h1>
        <p className="max-w-[620px] text-xl text-muted">{subtitle}</p>
      </div>
      <div className="grid w-full items-center gap-8 lg:grid-cols-[1fr_auto_1fr]">
        <figure className="card order-2 mx-auto flex w-full max-w-[360px] flex-col gap-4 !rounded-[20px] p-7 lg:order-1 lg:justify-self-end">
          <Stars />
          <blockquote>« Syamak a le sens du détail et s’assure que ce qu’il crée s’adapte au besoin réel. »</blockquote>
          <figcaption className="text-sm text-muted">
            <strong className="text-ink">{testimonials.featured.name}</strong>
            <br />
            {testimonials.featured.role}
          </figcaption>
        </figure>
        <div className="order-1 w-full lg:order-2 lg:w-[290px]">
          <VideoLite videoId={site.videoId} title="Sabzi, notre approche en vidéo" />
        </div>
        <div className="order-3 mx-auto flex w-full max-w-[360px] flex-col gap-3 lg:justify-self-start">
          {services.map((s) => (
            <Link key={s.slug} href={`/${s.slug}`} className="flex items-center justify-between gap-3 rounded-2xl border border-line bg-white px-[22px] py-[18px] font-semibold transition hover:border-brand">
              {s.label}
              <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b8401c" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </Link>
          ))}
          <a href={site.booking} className="btn-primary !rounded-2xl">Programmer une réunion</a>
        </div>
      </div>
    </section>
  );
}
