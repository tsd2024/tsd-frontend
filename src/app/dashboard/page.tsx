"use client";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { Game, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "@/components/ui/button";

const data = [
  {
    id: "728ed5wf",
    name: "Game 1",
    date: "09-12-2021",
  },
  {
    id: "728ed52f",
    name: "aa",
    date: "09-12-2024",
  },
  {
    id: "728ed2f",
    name: "bb",
    date: "14-12-2024",
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-col w-full h-screen">
      <div className="flex h-nav w-full bg-primary-foreground">
        <div className="flex justify-end w-full p-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Julia Mularczyk</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[160px] gap-3 p-4 md:w-[150px] md:grid-cols-2 lg:w-[150px]">
                    <NavigationMenuLink>Sign out</NavigationMenuLink>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex h-5/6 w-full">
        <div className="ml-6 w-full flex flex-col gap-8 pt-6 pb-24">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
          </div>
          <div className="flex justify-center w-full gap-4">
            <Button variant="default" className="w-36 justify-center">
              Start new game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
