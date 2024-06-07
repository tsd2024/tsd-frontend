"use client";

import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { MdExpandMore } from "react-icons/md";
import React from "react";


import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { ScrollArea } from "@/components/ui/scroll-area"

const dataUserStories = [
  {
    id: "lobby-1",
    story_name: "User Registration Flow",
    tickets: [
      { ticket_name: "Design registration form" },
      { ticket_name: "Implement form validation" },
      { ticket_name: "Set up user database" },
    ],
    points: 5,
  },
  {
    id: "lobby-2",
    story_name: "Implement Database Schema",
    tickets: [
      { ticket_name: "Design database schema" },
      { ticket_name: "Create initial migration scripts" },
      { ticket_name: "Set up database indexing" },
    ],
    points: 8,
  },
  {
    id: "lobby-3",
    story_name: "User Authentication System",
    tickets: [
      { ticket_name: "Implement login functionality" },
      { ticket_name: "Set up OAuth2 integration" },
      { ticket_name: "Create password recovery flow" },
    ],
    points: 13,
  },
  {
    id: "lobby-4",
    story_name: "Develop API Endpoints",
    tickets: [
      {
        ticket_name:
          "Develop user CRUD endpoints verrrrrrrry long the other day i went to the kitechen and saw some products in the fridge",
      },
      { ticket_name: "Implement JWT authentication" },
      { ticket_name: "Write API documentation" },
    ],
    points: 8,
  },
  {
    id: "lobby-5",
    story_name: "Frontend Integration",
    tickets: [
      { ticket_name: "Create reusable components" },
      { ticket_name: "Set up state management" },
      { ticket_name: "Integrate API with frontend" },
    ],
    points: 13,
  },
];

export type Game = {
  id: string;
  name: string;
  date: string;
};

export const columns: ColumnDef<Game>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Game Name
          <CaretSortIcon className="h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Last Played
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("date")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <Popover>
          <PopoverTrigger asChild>
      <Button variant="outline" size="sm">
        Show details
      </Button>
      </PopoverTrigger>
      <PopoverContent>
      <ScrollArea className="h-72 w-72 rounded-md border">
        {dataUserStories.map((story, index) => (
          <React.Fragment key={index}>
            <div className="py-2 px-2">
            <div className="story-label mb-2">
              <strong>{story.story_name} - {story.points} points</strong>
            </div>
            <div className="story-tickets">
              <ul>
                {story.tickets.map((ticket, ticketIndex) => (
                  <li key={ticketIndex}>- {ticket.ticket_name}</li>
                ))}
              </ul>
            </div>
            <hr className="separator" />
            </div>
          </React.Fragment>
        ))}
      </ScrollArea>
      </PopoverContent>
      </Popover>
      );
    },
  },
];
