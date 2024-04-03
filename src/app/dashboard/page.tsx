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
import Link from "next/link";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

const data = [
  {
    id: "lobby-1",
    name: "Alpha Squad",
    date: "09-12-2021",
  },
  {
    id: "lobby-2",
    name: "Shadow Walkers",
    date: "09-12-2024",
  },
  {
    id: "lobby-3",
    name: "Phoenix Rising",
    date: "14-12-2024",
  },
  {
    id: "lobby-4",
    name: "Stormbreakers",
    date: "03-05-2023",
  },
  {
    id: "lobby-5",
    name: "Mystic Legion",
    date: "20-08-2022",
  },
  {
    id: "lobby-6",
    name: "Eclipse Vanguard",
    date: "17-10-2023",
  },
  {
    id: "lobby-7",
    name: "Chrono Knights",
    date: "05-02-2025",
  },
  {
    id: "lobby-8",
    name: "Spectral Guardians",
    date: "21-11-2022",
  },
  {
    id: "lobby-9",
    name: "Titan Syndicate",
    date: "12-09-2023",
  },
  {
    id: "lobby-10",
    name: "Astral Reapers",
    date: "08-04-2024",
  },
  {
    id: "lobby-11",
    name: "Nova Elite",
    date: "30-06-2025",
  },
  {
    id: "lobby-12",
    name: "Galactic Sentinels",
    date: "15-03-2023",
  },
  {
    id: "lobby-13",
    name: "Nebula Nomads",
    date: "18-07-2022",
  },
];

export default function DashboardPage() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const userName = session?.user?.name;

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  return (
    <div className="flex-col w-full h-screen">
      <div className="flex h-nav w-full bg-primary-foreground z-10 sticky top-0">
        <div className="flex justify-end w-full p-4">
          <div className="flex items-center space-x-2 p-4">
            <Switch
              id="dark-mode"
              onCheckedChange={toggleTheme}
              checked={theme === "dark"}
            />
          </div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem className="pr-8 pl-2">
                <NavigationMenuTrigger >{userName}</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[110px] gap-3 p-4 md:w-[100px] hover:bg-primary-foreground cursor-pointer md:grid-cols-2 lg:w-[100px] text-nowrap text-sm">
                    <NavigationMenuLink
                      onClick={() =>
                        signOut({ callbackUrl: "http://localhost:3000/" })
                      }
                    >
                      Sign out
                    </NavigationMenuLink>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex h-5/6 w-full">
        <div className="ml-6 w-full flex flex-col gap-8 pt-6 pb-20">
          <h1 className="text-4xl font-bold">Dashboard</h1>
          <div className="container mx-auto py-4">
            <DataTable columns={columns} data={data} />
          </div>
          <div className="flex justify-center w-full gap-4 pb-8">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="default" className="w-36 justify-center">
                  Join the game
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className="mb-2">
                    Join the game
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="flex w-full max-w items-center space-x-2">
                      <Input type="text" placeholder="Provide the link" />
                      <Button type="submit">Join</Button>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="w-7/12 justify-center">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            <Link href="/create-room" legacyBehavior passHref>
              <Button variant="default" className="w-36 justify-center">
                Start new game
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
