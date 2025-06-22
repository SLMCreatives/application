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
import { Separator } from "@/components/ui/separator";
import { createClient } from "@/lib/supabase/client";
import { redirect } from "next/navigation";
import Link from "next/link";

// Define interfaces for the data structure
interface PersonalInfo {
  firstName: string;
  lastName: string;
  nickname: string;
  phoneNumber: string;
  email: string;
  nationality: string;
}

interface ProgrammeInfo {
  areaOfStudy: string;
  level: string;
  availableProgramme: string;
  studyMode: string;
}

interface Qualification {
  id: string;
  programmeName: string;
  graduateYear: string;
  results: string;
  institute: string; // Added based on SQL data
  transcriptFile: Record<string, unknown>; // Representing the {} from SQL
}

/* const mockPersonalInfo: PersonalInfo = {
  firstName: "Sulaiman Shafiq",
  lastName: "Abdul Munaff",
  nickname: "Man",
  phoneNumber: "01121292383",
  email: "sulaiman@slmcreatives.com",
  nationality: "Malaysian"
};
 */
/* const mockProgrammeInfo: ProgrammeInfo = {
  level: "Foundation",
  studyMode: "Online Distance Learning (ODL)",
  areaOfStudy: "Business",
  availableProgramme: "Foundation in Business Studies"
};

const mockQualificationInfo: Qualification[] = [
  {
    id: "50191fbc-40f1-46c3-8c8d-da2cdfd86625",
    results: "CGPA 3.85",
    institute: "Taylors Uni",
    graduateYear: "2021",
    programmeName: "Bachelor of Mass Comm (2)",
    transcriptFile: {}
  },
  {
    id: "4183fbaa-a81e-4f06-a451-47cdf94dd4f6",
    results: "12As",
    institute: "SMKDJ",
    graduateYear: "2017",
    programmeName: "SPM",
    transcriptFile: {}
  }
]; */

const supabase = createClient();

const getUserID = async () => {
  const user = await supabase.auth.getUser();
  return user.data.user?.id;
};

const userEmail = async () => {
  const user = await supabase.auth.getUser();
  return user.data.user?.email;
};

const getAppData = async () => {
  const { data, error } = await supabase
    .from("apps")
    .select()
    .eq("user_id", await getUserID());

  if (error) {
    console.log(error);
  }
  return data;
};

const PersonalInfoDb = await getAppData();

const mockData = {
  email: await userEmail(),
  personalInfo: PersonalInfoDb?.[0]?.user_meta ?? {
    firstName: "",
    lastName: "",
    nickname: "",
    phoneNumber: "",
    nationality: ""
  },
  programmeInfo: PersonalInfoDb?.[0]?.prog_info ?? {
    level: "",
    studyMode: "",
    areaOfStudy: "",
    availableProgramme: ""
  },
  qualificationInfo: PersonalInfoDb?.[0]?.qual_info ?? [
    {
      id: "",
      results: "",
      institute: "",
      graduateYear: "",
      programmeName: "",
      transcriptFile: {}
    }
  ]
};

export default function ApplicationForm() {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(
    mockData.personalInfo
  );
  const [programmeInfo, setProgrammeInfo] = useState<ProgrammeInfo>(
    mockData.programmeInfo
  );
  const [qualificationInfo, setQualificationInfo] = useState<Qualification[]>(
    mockData.qualificationInfo
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPersonalInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleProgrammeInfoChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setProgrammeInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleQualificationChange = (
    id: string,
    field: keyof Omit<Qualification, "id" | "transcriptFile">,
    value: string
  ) => {
    setQualificationInfo((prev) =>
      prev.map((q) => (q.id === id ? { ...q, [field]: value } : q))
    );
  };

  const getUserID = async () => {
    const { data } = await supabase.auth.getUser();
    return data.user?.id;
  };

  const handleSubmitApplication = async () => {
    setIsSubmitting(true);
    const { data, error } = await supabase
      .from("apps")
      .update({ status: "TRUE" })
      .eq("user_id", await getUserID())
      .select();
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setIsSubmitting(false);
      redirect("/thankyou");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Application Preview</CardTitle>
          <CardDescription>
            Review and make any necessary edits to your application before
            submitting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Personal Information Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  disabled
                  id="firstName"
                  name="firstName"
                  value={personalInfo.firstName}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  disabled
                  id="lastName"
                  name="lastName"
                  value={personalInfo.lastName}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="nickname">Nickname</Label>
                <Input
                  disabled
                  id="nickname"
                  name="nickname"
                  value={personalInfo.nickname}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  disabled
                  id="phoneNumber"
                  name="phoneNumber"
                  value={personalInfo.phoneNumber}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  disabled
                  id="email"
                  name="email"
                  value={mockData.email}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  disabled
                  id="nationality"
                  name="nationality"
                  value={personalInfo.nationality}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Programme Information Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">
              Programme Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="areaOfStudy">Area of Study</Label>
                <Input
                  disabled
                  id="areaOfStudy"
                  name="areaOfStudy"
                  value={programmeInfo.areaOfStudy}
                  onChange={handleProgrammeInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <Input
                  disabled
                  id="level"
                  name="level"
                  value={programmeInfo.level}
                  onChange={handleProgrammeInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="availableProgramme">Available Programme</Label>
                <Input
                  disabled
                  id="availableProgramme"
                  name="availableProgramme"
                  value={programmeInfo.availableProgramme}
                  onChange={handleProgrammeInfoChange}
                />
              </div>
              <div>
                <Label htmlFor="studyMode">Study Mode</Label>
                <Input
                  disabled
                  id="studyMode"
                  name="studyMode"
                  value={programmeInfo.studyMode}
                  onChange={handleProgrammeInfoChange}
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Qualifications Section */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Qualifications</h2>
            <div className="space-y-6">
              {qualificationInfo.map((q, index) => (
                <div key={index} className="border p-4 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">
                    Qualification {index + 1}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor={`qual-programmeName-${index}`}>
                        Programme Name
                      </Label>
                      <Input
                        disabled
                        id={`qual-programmeName-${index}`}
                        name="programmeName"
                        value={q.programmeName}
                        onChange={(e) =>
                          handleQualificationChange(
                            q.id,
                            "programmeName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`qual-institute-${index}`}>
                        Institute
                      </Label>
                      <Input
                        disabled
                        id={`qual-institute-${index}`}
                        name="institute"
                        value={q.institute}
                        onChange={(e) =>
                          handleQualificationChange(
                            q.id,
                            "institute",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`qual-graduateYear-${index}`}>
                        Graduate Year
                      </Label>
                      <Input
                        disabled
                        id={`qual-graduateYear-${index}`}
                        name="graduateYear"
                        type="number"
                        value={q.graduateYear}
                        onChange={(e) =>
                          handleQualificationChange(
                            q.id,
                            "graduateYear",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label htmlFor={`qual-results-${index}`}>Results</Label>
                      <Input
                        disabled
                        id={`qual-results-${index}`}
                        name="results"
                        value={q.results}
                        onChange={(e) =>
                          handleQualificationChange(
                            q.id,
                            "results",
                            e.target.value
                          )
                        }
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label>Transcript</Label>
                      <p className="text-sm text-muted-foreground">
                        Transcript uploaded (placeholder). Re-upload
                        functionality not available on this page.
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-4">
          <Button variant={"outline"} asChild>
            <Link href="/setup">Reset</Link>
          </Button>
          <Button onClick={handleSubmitApplication} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit Application"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
