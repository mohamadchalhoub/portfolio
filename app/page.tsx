import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { LazyExperience } from "@/components/experience/LazyExperience";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Capabilities } from "@/components/sections/Capabilities";
import { Toolbox } from "@/components/sections/Toolbox";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { SecurityResearch } from "@/components/sections/SecurityResearch";
import { WorkingMethod } from "@/components/sections/WorkingMethod";
import { Contact } from "@/components/sections/Contact";
import { SystemHud } from "@/components/experience/SystemHud";

export default function Portfolio() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>

      <SiteHeader />
      <SystemHud />
      <LazyExperience />

      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <Capabilities />
        <Toolbox />
        <SelectedWork />
        <SecurityResearch />
        <WorkingMethod />
        <Contact />
      </main>

      <SiteFooter />
    </>
  );
}
