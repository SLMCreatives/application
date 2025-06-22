import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] py-12 px-4 text-center">
      <CheckCircle className="h-16 w-16 text-green-500 mb-6" />
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4">
        Thank You!
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        Your submission has been received. We appreciate your interest and will
        get back to you shortly.
      </p>
      <Link href="https://unwwt.vercel.app" passHref>
        <Button className="bg-black text-white hover:bg-gray-800">
          Go to Homepage
        </Button>
      </Link>
    </div>
  );
}
