"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { FaRegUser } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiPokerChip } from "react-icons/pi";
import { Switch } from "@/components/ui/switch";
import { useTheme } from "next-themes";
import { useSession, signOut } from "next-auth/react";

export const TopBar = () => {
    const { theme, setTheme } = useTheme();
    const { data: session } = useSession();
    const userName = session?.user?.name;

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    if (!session){
        return;
    }

    return (
        <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-primary-foreground px-4 md:px-6">
            <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
                <Link
                    href="#"
                    className="flex items-center gap-2 text-lg font-semibold md:text-base"
                >
                    <PiPokerChip className="h-6 w-6" />
                    <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                    href="/dashboard"
                    className="text-foreground transition-colors hover:text-foreground"
                >
                    Dashboard
                </Link>
                <Link
                    href="/create-room"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Create
                </Link>
                <Link
                    href="/join"
                    className="text-muted-foreground transition-colors hover:text-foreground"
                >
                    Join
                </Link>
            </nav>
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline" size="icon" className="shrink-0 md:hidden">
                        <RxHamburgerMenu className="h-5 w-5" />
                        <span className="sr-only">Toggle navigation menu</span>
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">
                    <nav className="grid gap-6 text-lg font-medium">
                        <Link
                            href="#"
                            className="flex items-center gap-2 text-lg font-semibold"
                        >
                            <PiPokerChip className="h-6 w-6" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        <Link href="/dashboard" className="hover:text-foreground">
                            Dashboard
                        </Link>
                        <Link
                            href="/create-game"
                            className="text-muted-foreground hover:text-foreground"
                        >
                            Create game
                        </Link>
                    </nav>
                </SheetContent>
            </Sheet>
            <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
                <div className="flex items-center space-x-2 p-4">
                    <Switch
                        id="dark-mode"
                        onCheckedChange={toggleTheme}
                        checked={theme === "dark"}
                    />
                </div>
                <form className="ml-auto flex-1 sm:flex-initial">
                    <div className="relative"></div>
                </form>
                <div>
                    {userName}
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="secondary" size="icon" className="rounded-full">
                            <FaRegUser className="h-5 w-5" />
                            {/* <span >{userName}</span> */}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() =>
                            signOut({ callbackUrl: "/", redirect: true })
                        }>Logout</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};
