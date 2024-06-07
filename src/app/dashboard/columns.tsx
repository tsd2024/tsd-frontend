import React from "react";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";

export type Lobby = {
  lobby_id: string;
  admin_id: string;
  user_stories: { story_name: string; tickets: { ticket_name: string }[]; points: number }[];
};

export const columns: ColumnDef<Lobby>[] = [
  {
    accessorKey: "lobby_id",
    header: "Lobby ID",
    cell: ({ row }) => <div>{row.getValue("lobby_id")}</div>,
  },
  {
    accessorKey: "admin_id",
    header: "Admin",
    cell: ({ row }) => <div>{row.getValue("admin_id")}</div>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const userStories = row.original.user_stories;
      return (
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="sm">
              Show Details
            </Button>
          </PopoverTrigger>
          <PopoverContent style={userStories.length > 0 ? { width: '32rem' } : { padding: '1rem' }}>
            {userStories.length > 0 ? (
              <ScrollArea className="h-72 rounded-md border p-4" >
                {userStories.map((story, index) => (
                  <div key={index} className="mb-4">
                    <div className="font-semibold mb-2">
                      {story.story_name} - {story.points} points
                    </div>
                    <ul className="list-disc list-inside">
                      {story.tickets.map((ticket, ticketIndex) => (
                        <li key={ticketIndex}>{ticket.ticket_name}</li>
                      ))}
                    </ul>
                    {index < userStories.length - 1 && <hr className="my-2" />}
                  </div>
                ))}
              </ScrollArea>
            ) : (
              <div>No user stories in this session.</div>
            )}
          </PopoverContent>
        </Popover>
      );
    },
  },
];
