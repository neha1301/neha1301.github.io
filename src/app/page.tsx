import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { About } from "@/components/sections/About";
import { EngineeringWork } from "@/components/sections/EngineeringWork";
import { Experience } from "@/components/sections/Experience";
import { TechStack } from "@/components/sections/TechStack";
import { Certifications } from "@/components/sections/Certifications";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Metrics />
      <About />
      <EngineeringWork />
      <Experience />
      <TechStack />
      <Certifications />
      <Contact />
    </>
  );
}
