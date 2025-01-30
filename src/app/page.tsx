import { Header } from "./components/header"
import { HeroSection } from "./components/hero-section"
import { AboutSection } from "./components/about-section"
import { PortfolioSection } from "./components/portfolio-section"
import { ServicesSection } from "./components/services-section"
import { ContactSection } from "./components/contact-section"
import { CompanyLogo } from "./components/CompanyLogo";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <CompanyLogo/>
      <AboutSection />
      <PortfolioSection />
      <ServicesSection />
      <ContactSection />
    </>
  )
}

