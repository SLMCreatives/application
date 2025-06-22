import { AppSidebar } from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";
import ApplicationsTable from "@/components/sms/AppTable";
//import RawTable from "@/components/sms/RawTable";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
//import { createClient } from "@/lib/supabase/client";

//const supabase = createClient();

/* const { data, error } = await supabase
  .from("student")
  .select("*, prog_info(prog_name)")
  .order("id");
if (error) {
  console.error(error);
}
 */
export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col ring-2">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col gap-4 p-4 ">
              {/* <RawTable data={data ?? []} /> */}
              <ApplicationsTable />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
