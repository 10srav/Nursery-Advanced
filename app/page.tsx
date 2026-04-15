import { Hero } from '@/components/sections/hero';
import { MarqueeRibbon } from '@/components/sections/marquee-ribbon';
import { Categories } from '@/components/sections/categories';
import { Features } from '@/components/sections/features';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { Testimonials } from '@/components/sections/testimonials';
import { CTA } from '@/components/sections/cta';

export default function Home() {
  return (
    <>
      <Hero />
      <MarqueeRibbon />
      <Categories />
      <Features />
      <FeaturedProducts />
      <Testimonials />
      <CTA />
    </>
  );
}
