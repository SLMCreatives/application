"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress"; // Assuming Progress component is available from shadcn/ui
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default function PersonalInfoForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    nickname: "",
    phoneNumber: "",
    nationality: ""
  });

  const getUserID = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const formFields = [
    {
      id: "firstName",
      label: "First Name",
      type: "text",
      placeholder: "John",
      name: "firstName"
    },
    {
      id: "lastName",
      label: "Last Name",
      type: "text",
      placeholder: "Doe",
      name: "lastName"
    },
    {
      id: "nickname",
      label: "Nickname",
      type: "text",
      placeholder: "Johnny",
      name: "nickname"
    },
    {
      id: "phoneNumber",
      label: "Phone Number",
      type: "tel",
      placeholder: "123-456-7890",
      name: "phoneNumber"
    },
    {
      id: "nationality",
      label: "Nationality",
      type: "text",
      placeholder: "Malaysian",
      name: "nationality"
    }
  ];

  const totalSteps = formFields.length;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    // Basic validation for the current field before moving to the next step
    const currentFieldName = formFields[currentStep]
      .name as keyof typeof formData;
    if (!formData[currentFieldName]) {
      toast(
        `Please enter your ${formFields[currentStep].label.toLowerCase()}.`
      );
      return;
    }
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation for the last field
    const currentFieldName = formFields[currentStep]
      .name as keyof typeof formData;
    if (!formData[currentFieldName]) {
      toast(
        `Please enter your ${formFields[currentStep].label.toLowerCase()}.`
      );
      return;
    }

    const { data, error } = await supabase
      .from("apps")
      .insert([{ user_id: await getUserID(), user_meta: formData }]);

    if (error) {
      console.error(error);
    } else if (data) {
      console.log(data);
      toast("Personal information submitted successfully!");
      redirect("/setup/programme-info");
    }
  };

  const currentField = formFields[currentStep];
  const progressValue = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Card className="w-full max-w-2xl mx-auto drop-shadow-2xl">
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>
          Please provide your personal details to get started.
        </CardDescription>
        <div className="mt-4">
          <Progress value={progressValue} className="w-full" />
          <p className="text-sm text-muted-foreground text-right mt-1">
            Step {currentStep + 1} of {totalSteps}
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={currentField.id}>{currentField.label}</Label>
            <Input
              id={currentField.id}
              name={currentField.name}
              type={currentField.type}
              placeholder={currentField.placeholder}
              value={formData[currentField.name as keyof typeof formData]}
              onChange={handleInputChange}
              required
            />
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={handlePrevious}
          disabled={currentStep === 0}
          className="bg-white text-black"
        >
          Previous
        </Button>
        {currentStep < totalSteps - 1 ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button onClick={handleSubmit}>Submit</Button>
        )}
      </CardFooter>
    </Card>
  );
}
