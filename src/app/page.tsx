'use client';
import image1 from '../../public/image1.jpg';
import image2 from '../../public/image2.jpg';
import image3 from '../../public/image3.jpg';
import Image, { StaticImageData } from 'next/image';
import Lenis from 'lenis';
import { useEffect, useRef } from 'react';
import {
  motion,
  MotionValue,
  useScroll,
  useTransform,
} from 'motion/react';

export default function Home() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
  }, []);

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  return (
    <main className="font-literata">
      <div className="h-[100vh]" />
      <div ref={ref}>
        <Slide
          image={image1}
          left={'-40%'}
          direction="left"
          progress={scrollYProgress}
        />
        <Slide
          image={image2}
          left={'-25%'}
          direction="right"
          progress={scrollYProgress}
        />
        <Slide
          image={image3}
          left={'-60%'}
          direction="left"
          progress={scrollYProgress}
        />
      </div>
      <div className="h-[100vh]" />
    </main>
  );
}

const Slide = ({
  image,
  left,
  direction,
  progress,
}: {
  image: StaticImageData;
  left: string;
  direction: string;
  progress: MotionValue<number>;
}) => {
  const orientation = direction === 'left' ? -1 : 1;
  const translateX = useTransform(
    progress,
    [0, 1],
    [250 * orientation, -250 * orientation]
  );

  return (
    <motion.div
      style={{ left: left, x: translateX }}
      className="relative flex whitespace-nowrap"
    >
      <Phrase image={image} />
      <Phrase image={image} />
      <Phrase image={image} />
    </motion.div>
  );
};

const Phrase = ({ image }: { image: StaticImageData }) => {
  return (
    <div className="relative flex items-center gap-5 px-5">
      <p className="text-[7.5vw]">CJ Corcoran</p>
      <span className="relative h-[7.5vw] aspect-2/1 overflow-hidden rounded-full">
        <Image
          src={image}
          alt="image"
          style={{ objectFit: 'cover' }}
          fill
        />
      </span>
    </div>
  );
};
