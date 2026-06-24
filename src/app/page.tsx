import { SideBar } from "../components/layout/SideBar";
import { HeroSection } from "../components/sections/HeroSection";
import { ProjectsSection } from "../components/sections/ProjectsSection";
import { SkillSection } from "../components/sections/SkillsSection";
import { BlogSection } from "../components/sections/BlogSection";
import ClientWrapper from "../components/layout/ClientWrapper";

export default function Home() {
  return (
    <>
      <div className="mx-auto min-h-screen max-w-screen-xl px-6 py-12 md:px-12 md:py-16 lg:py-0">
        <ClientWrapper>
          <div className="lg:flex lg:justify-between lg:gap-4">
            <SideBar />
            <main className="pt-24 lg:w-[52%] lg:py-24">
              <HeroSection />
              <ProjectsSection />
              <SkillSection />
              <BlogSection />
            </main>
          </div>
        </ClientWrapper>
      </div>
    </>
  );
}
