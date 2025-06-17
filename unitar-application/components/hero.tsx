import Link from "next/link";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <div className="flex flex-col gap-6 items-center ">
      <div className="flex flex-col gap-2 justify-center items-center">
        <h2 className="text-3xl font-bold text-center">
          UNITAR Online Application
        </h2>
        <p className="text-sm text-muted-foreground">
          Submit your application online with ease!
        </p>
      </div>
      <div className="flex flex-row gap-4 items-center">
        <Button variant={"default"} asChild>
          <Link href="/auth/sign-up">New Application</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href="/auth/login">Existing Student</Link>
        </Button>
      </div>
    </div>
  );
}
