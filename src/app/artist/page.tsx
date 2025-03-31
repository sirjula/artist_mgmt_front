"use client";
import { AppSidebar } from "@/components/app-sidebar";
import  Breadcrumb  from "@/components/breadcrumb";

import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import TableComp from "@/components/artist/artist_table";
import { Card } from "@/components/ui/card";

export default function Page() {
  
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
       <Breadcrumb />
        <div className="flex flex-1 flex-col gap-4 p-10  ">
          <Card className="p-10 mx-40">
            <TableComp />
          </Card>
        </div>{" "}
      </SidebarInset>
    </SidebarProvider>
  );
}