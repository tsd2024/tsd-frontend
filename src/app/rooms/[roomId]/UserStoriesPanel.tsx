import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import UserStory from "@/types/UserStory";
import { MdDeleteForever } from "react-icons/md";

import { BsThreeDotsVertical } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { CaretSortIcon } from "@radix-ui/react-icons";
import { FormUserStory } from "./FormUserStory";
import { UpdateUserStory } from "./UpdateUserStory";

interface UserStoriesPanelProps {
  userStories: UserStory[];
  createUserStory: (userStory: UserStory) => void;
  deleteUserStory: (userStory: UserStory) => void;
  updateUserStory: (userStory: UserStory) => void;
  setSelectedUserStory: (userStory: UserStory) => void;
}

export const UserStoriesPanel = (props: UserStoriesPanelProps) => {
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const toggleCollapsible = (userStoryId: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [userStoryId]: !prevState[userStoryId],
    }));
  };
  return (
    <>
      {/* User Stories */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            <GoTasklist className="h-full w-auto" />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto ">
          <SheetHeader className="my-4">
            <SheetTitle>User Stories</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4">
            {props.userStories.map((userStory) => (
              <Card key={userStory.story_id} className="bg-primary-foreground">
                <CardHeader className="py-2 bg-header rounded-md pr-2">
                  <div className="flex justify-between">
                    <CardTitle className="text-lg pt-2">
                      {userStory.story_name}
                    </CardTitle>
                    <div className="flex-shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BsThreeDotsVertical className="h-10 w-10 hover:cursor-pointer p-2 mr-2 hover:bg-accent2 rounded-md" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="flex-col flex">
                          <UpdateUserStory
                            userStory={userStory}
                            updateUserStory={props.updateUserStory}
                          />
                          <Button
                            variant={"outline"}
                            onClick={() => props.deleteUserStory(userStory)}
                            className="border-none"
                          >
                            Delete
                          </Button>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-2">
                  {/*Tickets*/}
                  {userStory.tickets.length !== 0 && (
                    <Collapsible
                      open={isOpen[userStory.story_id]}
                      onOpenChange={() => toggleCollapsible(userStory.story_id)}
                      className="w-[300px] space-y-2 m-0 p-2"
                    >
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm">
                          Tasks
                          <CaretSortIcon className="h-4 w-4" />
                          <span className="sr-only">Toggle</span>
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="space-y-2">
                        {userStory.tickets.map((ticket, index) => (
                          <div
                            key={index}
                            className="rounded-md border px-4 py-2 bg-accent text-sm shadow-sm"
                          >
                            {ticket.ticket_name}
                          </div>
                        ))}
                      </CollapsibleContent>
                    </Collapsible>
                  )}
                  {/*Tasks*/}
                </CardContent>
                <CardFooter>
                  <div className="flex justify-start items-center w-full">
                    <div className="space-x-2 flex items-center">
                      {/*Button to select user story to vote
                      <SheetClose asChild>
                        <Button
                          variant={"outline"}
                          onClick={() => props.setSelectedUserStory(userStory)}
                        >
                          {" "}
                          Vote this now{" "}
                        </Button>
                      </SheetClose>
                */}
                    </div>
                    <p> Points: {userStory.story_points} </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <FormUserStory
            createUserStory={props.createUserStory}
            updateUserStory={props.updateUserStory}
          />
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
