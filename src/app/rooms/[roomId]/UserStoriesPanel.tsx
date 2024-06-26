import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import UserStory from "@/types/UserStory";
import { CiExport } from "react-icons/ci";

import { BsThreeDotsVertical } from "react-icons/bs";
import { GoTasklist } from "react-icons/go";
import {
  Sheet,
  SheetContent,
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import {
  DropdownMenu,
  DropdownMenuContent,
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
import ImportDialog from "./ImportDialog";

interface UserStoriesPanelProps {
  userStories: UserStory[];
  createUserStory: (userStory: UserStory) => void;
  deleteUserStory: (userStory: UserStory) => void;
  updateUserStory: (userStory: UserStory) => void;
  setSelectedUserStory: (userStory: UserStory) => void;
  exportUserStories: () => void;
  roomId: string;
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
            <div className="flex flex-row items-center space-x-4 justify-between">
              <SheetTitle>User Stories</SheetTitle>

              {/* Import and export buttons */}
              <div className="flex flex-row space-x-2">
                <ImportDialog roomId={props.roomId} />
                <Button variant="outline" onClick={props.exportUserStories}>
                  <CiExport />
                </Button>
              </div>
            </div>
          </SheetHeader>
          <div className="flex flex-col space-y-4">
            {props.userStories.map((userStory) => (
              <Card key={userStory.story_id} className="bg-primary-foreground">
                <CardHeader className="py-2 bg-header rounded-t-md pr-2">
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
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant={"outline"}
                                className="border-none"
                              >
                                Delete
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>
                                  Are you sure you want to delete this user story?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                  This action cannot be undone. This will
                                  permanently delete your user story.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => props.deleteUserStory(userStory)}>Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
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
