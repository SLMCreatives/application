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
import { PlusIcon, Trash2Icon } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";

const supabase = createClient();

interface Qualification {
  id: string; // Unique ID for React keys and easy manipulation
  programmeName: string;
  institute: string;
  graduateYear: string;
  results: string;
  transcriptFile: File | null;
}

export default function QualificationInfoForm() {
  const [qualifications, setQualifications] = useState<Qualification[]>([
    {
      id: crypto.randomUUID(),
      programmeName: "",
      institute: "",
      graduateYear: "",
      results: "",
      transcriptFile: null
    }
  ]);

  const MAX_QUALIFICATIONS = 3;

  const handleAddQualification = () => {
    if (qualifications.length < MAX_QUALIFICATIONS) {
      setQualifications((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          programmeName: "",
          institute: "",
          graduateYear: "",
          results: "",
          transcriptFile: null
        }
      ]);
    }
  };

  const handleRemoveQualification = (idToRemove: string) => {
    setQualifications((prev) => prev.filter((q) => q.id !== idToRemove));
  };

  const handleQualificationChange = (
    id: string,
    field: keyof Omit<Qualification, "id" | "transcriptFile">,
    value: string
  ) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const handleFileChange = (id: string, file: File | null) => {
    setQualifications((prev) =>
      prev.map((q) => (q.id === id ? { ...q, transcriptFile: file } : q))
    );
  };

  const getUserID = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    const isValid = qualifications.every(
      (q) => q.programmeName && q.graduateYear && q.results && q.transcriptFile
    );

    if (!isValid) {
      toast(
        "Please fill in all fields and upload a transcript for each qualification."
      );
      return;
    }

    const { data, error } = await supabase
      .from("apps")
      .update([{ qual_info: qualifications }])
      .eq("user_id", await getUserID())
      .select();
    if (error) {
      console.error(error);
    }
    if (data) {
      uploadFile(qualifications[0].transcriptFile!);
      console.log(data);
      toast("Qualification information submitted successfully!");
      redirect("/profile");
    }
    // In a real application, you would upload files and send data to your backend here.
  };

  const uploadFile = async (file: File) => {
    const { data, error } = await supabase.storage
      .from("quals")
      .upload(file.name, file);
    if (error) {
      console.log(error);
    }
    return data?.path;
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Qualifications</CardTitle>
        <CardDescription>
          Add your academic qualifications (up to {MAX_QUALIFICATIONS}).
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {qualifications.map((qualification, index) => (
          <div
            key={qualification.id}
            className="border p-4 rounded-lg relative"
          >
            <h3 className="text-lg font-semibold mb-4">
              Qualification {index + 1}
            </h3>
            {qualifications.length > 1 && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveQualification(qualification.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                aria-label={`Remove qualification ${index + 1}`}
              >
                <Trash2Icon className="h-5 w-5" />
              </Button>
            )}
            <div className="space-y-4">
              <div>
                <Label htmlFor={`programmeName-${qualification.id}`}>
                  Programme Name
                </Label>
                <Input
                  id={`programmeName-${qualification.id}`}
                  type="text"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  value={qualification.programmeName}
                  onChange={(e) =>
                    handleQualificationChange(
                      qualification.id,
                      "programmeName",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor={`institute-${qualification.id}`}>
                  Institute
                </Label>
                <Input
                  id={`institute-${qualification.id}`}
                  type="text"
                  placeholder="e.g., UNITAR International University"
                  value={qualification.institute}
                  onChange={(e) =>
                    handleQualificationChange(
                      qualification.id,
                      "institute",
                      e.target.value
                    )
                  }
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label htmlFor={`graduateYear-${qualification.id}`}>
                    Graduate Year
                  </Label>
                  <Input
                    id={`graduateYear-${qualification.id}`}
                    type="number"
                    placeholder="e.g., 2023"
                    value={qualification.graduateYear}
                    onChange={(e) =>
                      handleQualificationChange(
                        qualification.id,
                        "graduateYear",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor={`results-${qualification.id}`}>Results</Label>
                  <Input
                    id={`results-${qualification.id}`}
                    type="text"
                    placeholder="e.g., CGPA 3.8"
                    value={qualification.results}
                    onChange={(e) =>
                      handleQualificationChange(
                        qualification.id,
                        "results",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor={`transcript-${qualification.id}`}>
                  Upload Transcript
                </Label>
                <Input
                  id={`transcript-${qualification.id}`}
                  type="file"
                  onChange={(e) =>
                    handleFileChange(
                      qualification.id,
                      e.target.files ? e.target.files[0] : null
                    )
                  }
                  required
                />
                {qualification.transcriptFile && (
                  <p className="text-sm text-muted-foreground mt-1">
                    File selected: {qualification.transcriptFile.name}
                  </p>
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  Note: File upload is simulated. In a real app, this would send
                  the file to a server.
                </p>
              </div>
            </div>
          </div>
        ))}
        {qualifications.length < MAX_QUALIFICATIONS && (
          <Button
            variant="outline"
            onClick={handleAddQualification}
            className="w-full"
          >
            <PlusIcon className="mr-2 h-4 w-4" /> Add Another Qualification
          </Button>
        )}
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit}>Submit Qualifications</Button>
      </CardFooter>
    </Card>
  );
}
