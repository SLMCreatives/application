"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

// Mock data for available programmes
const allProgrammes = [
  {
    area: "Business",
    level: "Foundation",
    name: "Foundation in Business Studies"
  },
  {
    area: "Business",
    level: "Diploma",
    name: "Diploma in Business Management"
  },
  { area: "Business", level: "Bachelor", name: "BSc Business Administration" },
  { area: "Business", level: "Master", name: "MBA" },
  { area: "Business", level: "Doctorate", name: "PhD in Business" },

  { area: "Education", level: "Foundation", name: "Foundation in Education" },
  {
    area: "Education",
    level: "Diploma",
    name: "Diploma in Early Childhood Education"
  },
  { area: "Education", level: "Bachelor", name: "BEd Primary Education" },
  { area: "Education", level: "Master", name: "MEd Educational Leadership" },
  { area: "Education", level: "Doctorate", name: "EdD Educational Psychology" },

  {
    area: "IT",
    level: "Foundation",
    name: "Foundation in Information Technology"
  },
  { area: "IT", level: "Diploma", name: "Diploma in Computer Networking" },
  { area: "IT", level: "Bachelor", name: "BSc Computer Science" },
  { area: "IT", level: "Master", name: "MSc Software Engineering" },
  { area: "IT", level: "Doctorate", name: "PhD in Artificial Intelligence" },

  {
    area: "Art & Design",
    level: "Foundation",
    name: "Foundation in Art & Design"
  },
  { area: "Art & Design", level: "Diploma", name: "Diploma in Graphic Design" },
  { area: "Art & Design", level: "Bachelor", name: "BA Fine Arts" },
  { area: "Art & Design", level: "Master", name: "MA Fashion Design" },
  { area: "Art & Design", level: "Doctorate", name: "PhD in Art History" }
];

export default function ProgrammeInfoForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    areaOfStudy: "",
    level: "",
    availableProgramme: "",
    studyMode: ""
  });

  const formFields = [
    {
      id: "areaOfStudy",
      label: "Area of Study",
      name: "areaOfStudy",
      type: "select",
      options: ["Business", "Education", "IT", "Art & Design"]
    },
    {
      id: "level",
      label: "Level",
      name: "level",
      type: "select",
      options: ["Foundation", "Diploma", "Bachelor", "Master", "Doctorate"]
    },
    {
      id: "availableProgramme",
      label: "Available Programmes",
      name: "availableProgramme",
      type: "select",
      options: [] // This will be dynamically populated
    },
    {
      id: "studyMode",
      label: "Study Mode",
      name: "studyMode",
      type: "select",
      options: ["Physical", "Online Distance Learning (ODL)"]
    }
  ];

  const totalSteps = formFields.length;

  // Filter available programmes based on selected area and level
  const filteredProgrammes = useMemo(() => {
    const { areaOfStudy, level } = formData;
    if (areaOfStudy && level) {
      return allProgrammes
        .filter((p) => p.area === areaOfStudy && p.level === level)
        .map((p) => p.name);
    }
    return [];
  }, [formData]);

  // Update the options for the 'availableProgramme' field dynamically
  if (formFields[2].id === "availableProgramme") {
    formFields[2].options = filteredProgrammes;
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => {
      const newState = { ...prev, [name]: value };
      // Reset availableProgramme if areaOfStudy or level changes
      if (
        (name === "areaOfStudy" || name === "level") &&
        prev.availableProgramme
      ) {
        newState.availableProgramme = "";
      }
      return newState;
    });
  };

  const handleNext = () => {
    const currentFieldName = formFields[currentStep]
      .name as keyof typeof formData;
    if (!formData[currentFieldName]) {
      toast(
        `Please select your ${formFields[currentStep].label.toLowerCase()}.`
      );
      return;
    }
    // Special validation for Available Programmes
    if (
      currentFieldName === "availableProgramme" &&
      filteredProgrammes.length === 0
    ) {
      toast(
        "No programmes available for the selected Area of Study and Level. Please adjust your choices."
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

  const getUserID = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const currentFieldName = formFields[currentStep]
      .name as keyof typeof formData;
    if (!formData[currentFieldName]) {
      toast(
        `Please select your ${formFields[currentStep].label.toLowerCase()}.`
      );
      return;
    }
    const { data, error } = await supabase
      .from("apps")
      .update([{ prog_info: formData }])
      .eq("user_id", await getUserID())
      .select();

    console.log(data, error);
    if (error) {
      console.log(error);
    } else {
      toast("Programme information submitted successfully");
      redirect("/qualification-info");
    }
    // Here you would typically send the formData to your backend
  };

  const currentField = formFields[currentStep];
  const progressValue = ((currentStep + 1) / totalSteps) * 100;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Programme Information</CardTitle>
        <CardDescription>
          {`Tell us about the programme you're interested in.`}
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
            {currentField.type === "select" && (
              <Select
                name={currentField.name}
                value={formData[currentField.name as keyof typeof formData]}
                onValueChange={(value) =>
                  handleSelectChange(currentField.name, value)
                }
                disabled={
                  currentField.id === "availableProgramme" &&
                  filteredProgrammes.length === 0 &&
                  (!formData.areaOfStudy || !formData.level)
                }
                required
              >
                <SelectTrigger id={currentField.id}>
                  <SelectValue
                    placeholder={`Select your ${currentField.label.toLowerCase()}`}
                  />
                </SelectTrigger>
                <SelectContent>
                  {currentField.options.length > 0 ? (
                    currentField.options.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="" disabled>
                      {currentField.id === "availableProgramme"
                        ? "Select Area & Level first"
                        : "No options available"}
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
            )}
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
