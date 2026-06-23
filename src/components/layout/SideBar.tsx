"use client";

import Link from "next/link";
import { GitHub, LinkedIn, Mail, FileText } from "@deemlol/next-icons";
import { useEffect, useState } from "react";

const navLinks = [
  {
    label: "home",
    href: "/",
    id: ""
  },
  {
    label: "projetos",
    href: "/#projects",
    id: "projects"
  },
  {
    label: "habilidades",
    href: "/#skills",
    id: "skills"
  },
  {
    label: "blog",
    href: "/#blog",
    id: "blog"
  },
];

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/brennodeveloper",
    icon: GitHub
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/brenno-modesto/",
    icon: LinkedIn
  },
  {
    label: "Email",
    href: "mailto:brennod17@icloud.com",
    icon: Mail,
  },
  {
    label: "Currículo",
    href: "/VouAdicionarDps",
    icon: FileText,
  },
];

export function SideBar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.filter(l => l.id); 
      const scrollPosition = window.scrollY + 200; 

      let current = "home";
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.offsetTop <= scrollPosition) {
          current = section.id;
        }
      }
      if (window.scrollY < 100) current = "home";
      
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <aside className="lg:sticky lg:top-0 lg:flex lg:h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <Link href="/" className="group inline-block">
          <h1 className="text-4xl font-bold tracking-tight text-slate-300 transition-colors sm:text-5xl">
            Brenno Souza
          </h1>
        </Link>

        <p className="mt-2 font-code text-lg font-medium text-cyan-300">
          Front-end software development
        </p>

        <p className="text-sm mt-3 max-w-xs leading-normal text-slate-400">
          Desenvolvedor Full Stack em formação. Crio projetos práticos voltados para
          soluções web modernas.
        </p>

        <nav className="mt-16 flex flex-col gap-3">
           {navLinks.map((link) => {
              const isHome = link.id === "";
              const isActive = isHome 
                ? activeSection === "home" 
                : activeSection === link.id; 
            
            return (
              <Link
                key={link.href}
                href={link.href}
                className="group flex w-fit items-center gap-4 text-lg font-medium"
              >
                <span
                  className={[
                    "h-0.5 transition-all duration-200",
                    isActive
                      ? "w-20 bg-cyan-300"
                      : "w-12 bg-slate-500 group-hover:w-20",
                  ].join(" ")}
                />

                <span
                  className={[
                    "transition-colors duration-200",
                    isActive
                      ? "text-slate-100"
                      : "text-slate-400 group-hover:text-slate-100",
                  ].join(" ")}
                >
                  {link.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-16 flex items-center gap-6">
        {socialLinks.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              aria-label={link.label}
              className="text-slate-400 transition duration-300 hover:scale-125 hover:text-cyan-300"
            >
            <Icon size={26} strokeWidth={1.8} />
            </Link>
        );
      })}
      </div>
    </aside>
  );
}   