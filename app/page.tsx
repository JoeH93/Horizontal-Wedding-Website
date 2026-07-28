"use client"
import { Suspense, useEffect } from "react";
import NavHorizontal from "@/components/Navbar/NavHorizontal";
import BackgroundSlideshow from "@/components/BackgroundSlideShow/BackGroundSlideShow";
import HorizontalScrollContainer from "@/components/HorizontalScrollContainer";
import GallerySection1 from "@/components/Pages/GallerySection1";
import GallerySection2 from "@/components/Pages/GallerySection2";
import GallerySection3 from "@/components/Pages/GallerySection3";
import GallerySection5 from "@/components/Pages/GallerySection5";
import GallerySection6 from "@/components/Pages/GallerySection6";
import GallerySection4 from "@/components/Pages/GallerySection4";
import GallerySection7 from "@/components/Pages/GallerySection7";


export default function GalleryPage() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden">
    
      <BackgroundSlideshow />
      <NavHorizontal />
      
      <HorizontalScrollContainer>
        <GallerySection1 />
        <GallerySection2 />
        <GallerySection7 />
        {/* <GallerySection3 /> */}
        <Suspense fallback={null}>
          <GallerySection4 />
        </Suspense>
        <GallerySection6 />
        <GallerySection5 />
      </HorizontalScrollContainer>
    </main>
  );
}