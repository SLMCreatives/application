import { columns } from "./columnsapps";
import { DataTable } from "./data-tableapps";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export default async function ApplicationsTable() {
  const { data, error } = await supabase
    .from("apps")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    //console.log(data, columns);
    const structuredData = data?.map((item, index) => ({
      ...item,
      id: index,
      created_at: new Date(item.created_at).toLocaleString(),
      app_name: item.user_meta.firstName,
      phone: item.user_meta.phoneNumber,
      status: item.status,
      prog_info: item.prog_info.availableProgramme,
      intake: new Date(item.intake).toLocaleString("default", {
        month: "short",
        year: "numeric"
      }),
      remarks: item.remarks,
      action: "View"
    }));
    return (
      <div className="container mx-auto py-10">
        <h2 className="text-2xl font-bold mb-6">September Applications</h2>
        <DataTable columns={columns} data={structuredData} />
      </div>
    );
  }
}
