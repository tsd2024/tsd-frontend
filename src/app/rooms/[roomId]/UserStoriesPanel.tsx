import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import UserStory from "@/types/UserStory";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { BsThreeDotsVertical } from "react-icons/bs";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { GoTasklist, GoPlus } from "react-icons/go";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

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

interface UserStoriesPanelProps {
  userStories: UserStory[];
  createUserStory: (userStory: UserStory) => void;
  deleteUserStory: (userStory: UserStory) => void;
  setSelectedUserStory: (userStory: UserStory) => void;
}

export const UserStoriesPanel = (props: UserStoriesPanelProps) => {
  const formSchema = z.object({
    title: z.string().min(3),
    tickets: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      tickets: [],
    },
  });

  const generateId = () => {
    return uuidv4(); // <-- Generate UUID
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const userStoryId = generateId();
    const newUserStory: UserStory = {
      user_story_id: userStoryId,
      title: values.title,
      points: 0,
      tickets: values.tickets.map((ticketName: string) => ({
        ticket_name: ticketName,
      })),
    };
    props.createUserStory(newUserStory);
    console.log(newUserStory);
    form.reset();
  }

  const [ticket, setTicket] = useState("");
  const [isOpen, setIsOpen] = useState<{ [key: string]: boolean }>({});

  const addTicket = () => {
    if (ticket.trim() !== "") {
      form.setValue("tickets", [...form.getValues("tickets"), ticket]);
      setTicket("");
    }
  };

  const toggleCollapsible = (userStoryId: string) => {
    setIsOpen((prevState) => ({
      ...prevState,
      [userStoryId]: !prevState[userStoryId],
    }));
  };

  return (
    <>
      {/*User Stories*/}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant={"outline"}>
            <GoTasklist className="h-full w-auto" />
          </Button>
        </SheetTrigger>
        <SheetContent className="overflow-auto">
          <SheetHeader className="my-4">
            <SheetTitle>User Stories</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col space-y-4">
            {props.userStories.map((userStory) => (
              <Card
                key={userStory.user_story_id}
                className="bg-primary-foreground"
              >
                <CardHeader>
                  <div className="flex justify-between">
                    <CardTitle className="text-lg">{userStory.title}</CardTitle>
                    <div className="flex-shrink-0">
                      <DropdownMenu>
                        <DropdownMenuTrigger>
                          <BsThreeDotsVertical className="h-10 w-10 hover:cursor-pointer p-2 mr-2 hover:bg-accent2 rounded-md" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem>Update</DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => props.deleteUserStory(userStory)}
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/*Tickets*/}
                  {userStory.tickets.length !== 0 && (
                    <Collapsible
                      open={isOpen[userStory.user_story_id]}
                      onOpenChange={() =>
                        toggleCollapsible(userStory.user_story_id)
                      }
                      className="w-[280px] space-y-2"
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
                  <div className="flex justify-between items-center w-full">
                    <div className="space-x-2 flex items-center">
                      <SheetClose asChild>
                        <Button
                          variant={"outline"}
                          onClick={() => props.setSelectedUserStory(userStory)}
                        >
                          {" "}
                          Vote this now{" "}
                        </Button>
                      </SheetClose>
                    </div>
                    <p className="font-bold"> Points: {userStory.points} </p>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"} className="w-full my-4">
                <GoPlus className="h-full w-auto" />
                Add user story
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] ">
              <DialogHeader>
                <DialogTitle>Add new user story</DialogTitle>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter user story title"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tickets"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ticket Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Please enter ticket name"
                            {...field}
                            value={ticket}
                            onChange={(e) => setTicket(e.target.value)}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="button" onClick={addTicket}>
                    Add Ticket
                  </Button>
                  <DialogFooter>
                    <DialogTrigger asChild>
                      <Button type="submit">Save</Button>
                    </DialogTrigger>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
          <SheetFooter></SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
};
