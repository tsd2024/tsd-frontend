import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

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
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import UserStory from "@/types/UserStory";
import { Button } from "@/components/ui/button";
import { GoPlus } from "react-icons/go";

interface UpdateUserStoryProps {
  updateUserStory: (userStory: UserStory) => void;
  userStory: UserStory;
}

export const UpdateUserStory = (props: UpdateUserStoryProps) => {
  const formSchema = z.object({
    story_name: z.string().min(3),
    tickets: z.array(z.string()),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      story_name: props.userStory.story_name,
      tickets: props.userStory.tickets.map((ticket) => ticket.ticket_name),
    },
  });

  const [ticket, setTicket] = useState("");

  const addTicket = () => {
    if (ticket.trim() !== "") {
      const updatedTickets = [...form.getValues("tickets"), ticket];
      setTicket("");
      form.setValue("tickets", updatedTickets);
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const userStoryId = props.userStory.story_id;
    const updatedUserStory: UserStory = {
      story_id: userStoryId,
      story_name: values.story_name,
      story_points: props.userStory.story_points,
      tickets: values.tickets.map((ticketName: string) => ({
        ticket_name: ticketName,
      })),
    };
    props.updateUserStory(updatedUserStory);
  }

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="border-none">
            Update
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] overflow-y-auto sm:max-h-[600px]">
          <DialogHeader>
            <DialogTitle>Update user story</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="story_name"
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
              {form.getValues("tickets").map((_, index) => (
                <FormField
                  key={index}
                  control={form.control}
                  name={`tickets.${index}`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Please enter task name"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              ))}
              <FormItem>
                <FormLabel>Task name</FormLabel>
                <div className="flex items-center space-x-2">
                  <FormControl>
                    <Input
                      placeholder="Please enter task name"
                      value={ticket}
                      onChange={(e) => setTicket(e.target.value)}
                    />
                  </FormControl>
                  <Button type="button" onClick={addTicket}>
                    Add Task
                  </Button>
                </div>
              </FormItem>
              <DialogFooter className=" flex sm:justify-center">
                <DialogTrigger asChild>
                  <Button type="submit">Update</Button>
                </DialogTrigger>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
