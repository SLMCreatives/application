import { AppSidebar } from "@/components/app-sidebar";
import SiteHeader from "@/components/site-header";
import RawTable from "@/components/sms/RawTable";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const { data, error } = await supabase
  .from("student")
  .select("*, prog_info(prog_name)")
  .order("id");
if (error) {
  console.error(error);
}

/* export const iframeHeight = "800px";

export const description = "A sidebar with a header and a search form."; */

export default function Page() {
  return (
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col ring-2">
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <SiteHeader />
            <div className="flex flex-1 flex-col gap-4 p-4 ">
              <RawTable data={data ?? []} />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}
