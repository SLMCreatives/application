import { Hero } from "@/components/hero";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      {/* <Image
        src="/brand/bg_dark.jpg"
        width={1080}
        height={1920}
        alt="dark bg"
        className="w-full h-full object-cover  hidden lg:block absolute inset-0 rotate-180 -z-10"
      /> */}
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <div className="flex flex-col lg:grid grid-cols-2 lg:py-20 gap-6 lg:gap-20 lg:px-32 w-full p-5 lg:max-h-screen items-center justify-center bg-gradient-to-br from-stone-50 to-white min-h-screen">
          <Hero />
          <Image
            src="/brand/hero_image_2.jpg"
            loading="eager"
            width={1080}
            height={1920}
            alt="UNITAR Background"
            className="w-full h-[50vh] lg:h-full object-cover rounded-2xl drop-shadow-xl order-last"
          />
        </div>
      </div>
    </main>
  );
}
