import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { CaseStudies } from "@/components/sections/CaseStudies";
import { TechStack } from "@/components/sections/TechStack";
import { FeaturedProject } from "@/components/sections/FeaturedProject";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <About />
      <Experience />
      <CaseStudies />
      <TechStack />
      <FeaturedProject />
      <Certifications />
      <Contact />
    </>
  );
}
