import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import {
  Mail,
  Linkedin,
  MapPin,
  Download,
  ArrowDown,
  Terminal,
  Server,
  Cloud,
  Database,
  Shield,
  Wrench,
  GraduationCap,
  Languages,
  Briefcase,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

// ---------- Data ----------

const NAV = [
  { id: "about", label: "Stack" },
  { id: "experience", label: "Experiencia" },
  { id: "education", label: "Educación" },
  { id: "languages", label: "Idiomas" },
  { id: "contact", label: "Contacto" },
];

const STACK: { title: string; icon: typeof Server; items: string[] }[] = [
  { title: "Backend", icon: Server, items: ["Python", "Java", "Spring Boot", "FastAPI", ".NET", "SQLAlchemy"] },
  { title: "Arquitectura", icon: Terminal, items: ["Microservicios", "APIs REST", "Cloud-Native"] },
  { title: "Cloud & DevOps", icon: Cloud, items: ["AWS Lambda", "EC2", "S3", "SQS", "DynamoDB", "CloudWatch", "CloudFormation", "Docker", "CI/CD"] },
  { title: "Bases de datos", icon: Database, items: ["PostgreSQL", "MySQL", "SQL Server", "SQLite", "DynamoDB"] },
  { title: "Seguridad / TI", icon: Shield, items: ["Active Directory", "Fortinet", "FortiClient"] },
  { title: "Herramientas", icon: Wrench, items: ["Git", "Jenkins", "MySQL Workbench", "Bruno", "Postman"] },
];

type Job = {
  company: string;
  role: string;
  period: string;
  bullets: string[];
};

const EXPERIENCE: Job[] = [
  {
    company: "F1-Connecting",
    role: "Practicante Backend",
    period: "Mar 2026 — Actualidad",
    bullets: [
      "Desarrollo backend con Python y FastAPI.",
      "Trabajo con PostgreSQL y SQLAlchemy como ORM.",
      "Diseño y desarrollo de endpoints REST propios e integración con APIs/servicios externos.",
      "Participación en integraciones de medios de pago con Redsys y Bizum.",
      "Uso de Bruno y Postman para testing, y flujo de trabajo con Git/GitLab (PRs, code review).",
    ],
  },
  {
    company: "Pagos Digitales Peruanos",
    role: "Analista Programadora",
    period: "09/03/2023 — 16/06/2026",
    bullets: [
      "Cambio del core de la aplicación, incrementando capacidad y rendimiento transaccional.",
      "Migración de servicios Python hacia microservicios en Java con Spring Boot.",
      "Diseño y desarrollo de microservicios REST aplicando arquitectura limpia.",
      "Implementación del sistema de pago de servicios vía hub de Western Union.",
      "Gestión proactiva de incidentes para prevenir pérdidas financieras.",
      "Desarrollo en AWS (Lambda, EC2, CloudFormation, SQS, DynamoDB, CloudWatch) y Docker.",
    ],
  },
  {
    company: "Pagos Digitales Peruanos",
    role: "Analista Programadora Junior",
    period: "09/03/2022 — 08/03/2023",
    bullets: [
      "Desarrollo de funcionalidades backend en Python para billetera digital.",
      "Soporte en administración AWS (EC2) y contenerización con Docker.",
      "Optimización de consultas en MySQL y DynamoDB.",
    ],
  },
  {
    company: "Austral Group S.A.A.",
    role: "Practicante de Sistemas",
    period: "15/03/2021 — 14/03/2022",
    bullets: [
      "Soporte técnico en plataformas Microsoft.",
      "Administración de herramientas de seguridad TI (Fortinet, FortiClient).",
      "Gestión de incidentes mediante Aranda Service Desk.",
    ],
  },
  {
    company: "Outsourcing Empresarial S.A.C.",
    role: "Asistente de Tasaciones",
    period: "16/09/2020 — 31/03/2021",
    bullets: [
      "Desarrollo y mantenimiento de módulos en .NET.",
      "Administración de bases de datos SQL Server.",
    ],
  },
  {
    company: "ONPE",
    role: "Coordinador Técnico de Mesa",
    period: "26/12/2019 — 31/01/2020",
    bullets: ["Coordinación de equipos durante jornadas electorales."],
  },
  {
    company: "Atos",
    role: "Soporte al Área de Resultados e Información",
    period: "17/07/2019 — 11/08/2019",
    bullets: ["Monitoreo en tiempo real de datos en competencias deportivas."],
  },
];

const EDUCATION = [
  {
    title: "Máster Universitario en Ingeniería Informática",
    org: "Universidad Politécnica de Valencia, España",
    period: "09/2025 – Actual",
    note: "En curso",
  },
  {
    title: "Programa de Especialización en Data Scientist",
    org: "Data Science Research Perú",
    period: "01/2025 – 12/2025",
  },
  {
    title: "Bachiller en Ciencias, mención Ingeniería Informática",
    org: "Pontificia Universidad Católica del Perú",
    period: "",
    note: "Tesis: aplicación offline para monitoreo automático del proceso de carga de material minero usando vistas aéreas.",
  },
];

// ---------- Hooks ----------

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// ---------- Components ----------

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono-tag inline-flex items-center rounded-md border border-border bg-surface px-2 py-1 text-muted-foreground transition-colors hover:border-primary/60 hover:text-primary">
      {children}
    </span>
  );
}

function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="mb-10 flex items-baseline gap-3">
      <span className="font-mono-tag text-primary">{index}</span>
      <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
        {children}
      </h2>
      <div className="ml-2 h-px flex-1 bg-border" />
    </div>
  );
}

function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono-tag flex items-center gap-2 text-foreground">
          <span className="text-primary">~/</span>
          <span>alejandra.dev</span>
        </a>
        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((n, i) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                className="font-mono-tag text-muted-foreground transition-colors hover:text-primary"
              >
                <span className="text-primary/70">0{i + 1}.</span> {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="font-mono-tag rounded-md border border-primary/60 px-3 py-1.5 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          hello()
        </a>
      </nav>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 sm:pt-44 sm:pb-32">
      <div className="mx-auto max-w-6xl px-6">
        <p className="font-mono-tag mb-6 flex items-center gap-2 text-primary animate-fade-up">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_currentColor]" />
          <MapPin className="h-3.5 w-3.5" /> España · Valencia
        </p>
        <h1
          className="animate-fade-up text-4xl font-bold leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-7xl"
          style={{ animationDelay: "80ms" }}
        >
          Alejandra Arévalo
          <br />
          <span className="text-muted-foreground">Ficher.</span>
        </h1>
        <p
          className="animate-fade-up font-mono-tag mt-5 text-base text-primary sm:text-lg"
          style={{ animationDelay: "160ms" }}
        >
          {"<"} Backend Engineer · AI &amp; Data Science {"/>"}
        </p>
        <p
          className="animate-fade-up mt-8 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          style={{ animationDelay: "240ms" }}
        >
          Analista Programadora Backend con más de 3 años de experiencia en plataformas de pagos
          digitales y sistemas transaccionales de alta demanda. Especializada en{" "}
          <span className="text-foreground">Python</span>,{" "}
          <span className="text-foreground">AWS</span> y arquitecturas de microservicios.
          Actualmente ampliando su perfil hacia <span className="text-foreground">AI / Data Science</span>.
        </p>
        <div
          className="animate-fade-up mt-10 flex flex-wrap gap-3"
          style={{ animationDelay: "320ms" }}
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
          >
            Ver experiencia
            <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
          >
            Contacto
          </a>
        </div>
      </div>
    </section>
  );
}

function Stack() {
  return (
    <section id="about" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal">
          <SectionLabel index="01.">Sobre mí · Stack técnico</SectionLabel>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STACK.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.title}
                className="reveal group rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40"
              >
                <div className="mb-4 flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-border bg-background text-primary transition-colors group-hover:border-primary/60">
                    <Icon className="h-4 w-4" />
                  </span>
                  <h3 className="font-semibold text-foreground">{cat.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((it) => (
                    <Tag key={it}>{it}</Tag>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ExperienceItem({ job }: { job: Job }) {
  return (
    <li className="reveal relative pl-8 sm:pl-10">
      {/* timeline line + dot */}
      <span className="absolute left-2 top-2 grid h-3 w-3 place-items-center rounded-full bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--color-primary)_18%,transparent)]" />
      <div className="rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3 sm:flex sm:items-baseline sm:justify-between sm:gap-6">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold text-foreground">{job.role}</h3>
            <p className="font-mono-tag mt-1 text-primary">@ {job.company}</p>
          </div>
          <span className="font-mono-tag shrink-0 rounded-md border border-border bg-background px-2 py-1 text-muted-foreground">
            {job.period}
          </span>
        </div>
        <ul className="mt-4 space-y-2">
          {job.bullets.map((b, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2 inline-block h-1 w-1 shrink-0 rounded-full bg-primary/70" />
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </li>
  );
}

function Experience() {
  return (
    <section id="experience" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal">
          <SectionLabel index="02.">
            <span className="inline-flex items-center gap-3">
              <Briefcase className="h-6 w-6 text-primary" /> Experiencia
            </span>
          </SectionLabel>
        </div>
        <ol className="relative space-y-6 before:absolute before:left-[10px] before:top-2 before:bottom-2 before:w-px before:bg-border">
          {EXPERIENCE.map((j, i) => (
            <ExperienceItem key={i} job={j} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function Education() {
  return (
    <section id="education" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal">
          <SectionLabel index="03.">
            <span className="inline-flex items-center gap-3">
              <GraduationCap className="h-6 w-6 text-primary" /> Educación
            </span>
          </SectionLabel>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {EDUCATION.map((e, i) => (
            <div
              key={i}
              className="reveal rounded-xl border border-border bg-surface/60 p-6 transition-colors hover:border-primary/40"
            >
              <h3 className="text-lg font-semibold text-foreground">{e.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{e.org}</p>
              {e.period && (
                <p className="font-mono-tag mt-3 text-primary">{e.period}</p>
              )}
              {e.note && <p className="mt-3 text-sm text-muted-foreground">{e.note}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LanguagesSection() {
  const items = [
    { name: "Español", level: "Nativo", value: 100 },
    { name: "Inglés", level: "B2", value: 72 },
  ];
  return (
    <section id="languages" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal">
          <SectionLabel index="04.">
            <span className="inline-flex items-center gap-3">
              <Languages className="h-6 w-6 text-primary" /> Idiomas
            </span>
          </SectionLabel>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          {items.map((l) => (
            <div
              key={l.name}
              className="reveal rounded-xl border border-border bg-surface/60 p-6"
            >
              <div className="flex items-baseline justify-between">
                <h3 className="text-lg font-semibold text-foreground">{l.name}</h3>
                <span className="font-mono-tag text-primary">{l.level}</span>
              </div>
              <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-background">
                <div
                  className="h-full rounded-full bg-primary transition-[width] duration-1000"
                  style={{ width: `${l.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const items = [
    { icon: Mail, label: "aleja.5642@gmail.com", href: "mailto:aleja.5642@gmail.com" },
    {
      icon: Linkedin,
      label: "linkedin.com/in/alejandra-beatriz-arevalo-ficher",
      href: "https://www.linkedin.com/in/alejandra-beatriz-arevalo-ficher/",
    },
    { icon: MapPin, label: "Valencia, España", href: null },
  ];
  return (
    <section id="contact" className="py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="reveal">
          <SectionLabel index="05.">Contacto</SectionLabel>
        </div>
        <div className="reveal grid gap-8 rounded-2xl border border-border bg-surface/60 p-8 sm:p-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="font-mono-tag text-primary">// next.step()</p>
            <h3 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              ¿Trabajamos juntos?
            </h3>
            <p className="mt-4 max-w-md text-muted-foreground">
              Siempre abierta a oportunidades en backend, plataformas distribuidas y proyectos
              donde converjan ingeniería de datos e IA.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="mailto:aleja.5642@gmail.com"
                className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
              >
                <Mail className="h-4 w-4" /> Escríbeme
              </a>
              <a
                href={`${import.meta.env.BASE_URL}CV_Alejandra_Arevalo_Ficher.pdf`}
                download
                className="inline-flex items-center gap-2 rounded-md border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:border-primary/60 hover:text-primary"
              >
                <Download className="h-4 w-4" /> Descargar CV
              </a>
            </div>
          </div>
          <ul className="space-y-3">
            {items.map((it, i) => {
              const Icon = it.icon;
              const Inner = (
                <div className="group flex items-center gap-4 rounded-lg border border-border bg-background p-4 transition-colors hover:border-primary/60">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border text-primary transition-colors group-hover:border-primary/60">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="font-mono-tag truncate text-foreground group-hover:text-primary">
                    {it.label}
                  </span>
                </div>
              );
              return (
                <li key={i}>
                  {it.href ? (
                    <a href={it.href} target={it.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                      {Inner}
                    </a>
                  ) : (
                    Inner
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border/60 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <p className="font-mono-tag text-muted-foreground">
          © {year} Alejandra Arévalo Ficher
        </p>
        <p className="font-mono-tag text-muted-foreground">
          built with <span className="text-primary">▲</span> code &amp; coffee
        </p>
      </div>
    </footer>
  );
}

// ---------- Page ----------

function Portfolio() {
  const ref = useRef<HTMLDivElement>(null);
  useReveal();
  return (
    <div ref={ref} className="min-h-screen bg-background">
      <Nav />
      <main>
        <Hero />
        <Stack />
        <Experience />
        <Education />
        <LanguagesSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
