import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { Products } from '@/components/Products';
import { Trust } from '@/components/Trust';
import { FullCycle } from '@/components/FullCycle';
import { WhyUs } from '@/components/WhyUs';
import { ContactForm } from '@/components/ContactForm';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Products />
        <Trust />
        <WhyUs />
        <FullCycle />
      </main>
      <ContactForm />
    </>
  );
}
