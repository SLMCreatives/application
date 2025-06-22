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
        <div className="flex-1 flex flex-col lg:hidden gap-20 max-w-5xl p-5 min-h-[80vh] items-center justify-center">
          <Image
            src="/brand/building.png"
            width={1080}
            height={1920}
            alt="UNITAR Background"
            className="w-full h-full object-cover brightness-75 rounded-[40px]"
          />
          <Hero />
        </div>
        <div className="sm:hidden lg:grid grid-cols-2 lg:py-20 gap-20 lg:px-32 w-full p-5 max-h-screen items-center justify-center bg-gradient-to-br from-stone-50 to-white">
          <Hero />
          <Image
            src="/brand/hero_image_2.jpg"
            width={1080}
            height={1920}
            alt="UNITAR Background"
            className="w-full h-full object-cover rounded-2xl drop-shadow-xl"
          />
        </div>
      </div>
    </main>
  );
}
