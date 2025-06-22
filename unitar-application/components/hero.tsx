"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import { useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

export function Hero() {
  const supabase = createClient();
  useEffect(() => {
    async function fetchSession() {
      const { data, error } = await supabase.auth.getSession();
      console.log(data, error);
      if (data) {
        redirect("/dashboard");
      }
    }
    fetchSession();
  }, [supabase]);
  return (
    <div className="flex flex-col gap-6 items-center ">
      <div className="flex flex-col justify-center items-start gap-4 lg:gap-6">
        <h2 className="text-3xl lg:text-6xl font-bold">UNITAR Quick Apply</h2>
        <h4 className="text-xl lg:text-3xl font-thin">
          Intake:{" "}
          <span className="bg-yellow-100 px-4 font-medium">
            {" "}
            September 2025{" "}
          </span>
        </h4>
        <p className="text-sm lg:text-lg text-muted-foreground">
          Submit your application online with ease and secure your position at
          UNITAR. Complete your application now and get:
        </p>
        <ul className="list-disc list-inside">
          <li>RM 200 Grab Voucher</li>
          <li>Early Bird Discount</li>
          <li>Priority Admission</li>
        </ul>
      </div>
      <div className="flex flex-row gap-4 items-left w-full">
        <Button variant={"default"} asChild>
          <Link href="/auth/sign-up">Start Now</Link>
        </Button>
        <Button variant={"outline"} asChild>
          <Link href="/auth/login">Resume</Link>
        </Button>
      </div>
    </div>
  );
}
