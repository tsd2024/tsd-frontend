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
  
  import React, { useState, useEffect } from "react";
  import { Input } from "@/components/ui/input";
  import { z } from "zod";
  import { zodResolver } from "@hookform/resolvers/zod";
  import { useForm } from "react-hook-form";
  import { v4 as uuidv4 } from "uuid";
  import UserStory from "@/types/UserStory";
  import { Button } from "@/components/ui/button";
  import { GoPlus } from "react-icons/go";
  
  interface FormUserStoryProps {
    createUserStory: (userStory: UserStory) => void;
    updateUserStory: (userStory: UserStory) => void;
    userStory?: UserStory;
  }
  
  export const FormUserStory = (props: FormUserStoryProps) => {
    const formSchema = z.object({
      story_name: z.string().min(3),
      tickets: z.array(z.string()),
      story_points: z.number().min(0).default(0),
    });
  
    // Use existing UserStory values as default values for the form
    const defaultValues = props.userStory
      ? {
          story_name: props.userStory.story_name,
          story_points: props.userStory.story_points,
          tickets: props.userStory.tickets.map((ticket) => ticket.ticket_name),
        }
      : {
          story_name: "",
          tickets: [],
        };
  
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: defaultValues, // Set default values
    });
  
    const [ticket, setTicket] = useState("");
  
    useEffect(() => {
      if (props.userStory) {
        form.reset(defaultValues);
      }
    }, [props.userStory]); // Reset form when userStory prop changes
  
    const generateId = () => {
      return uuidv4(); // <-- Generate UUID
    };
  
    const addTicket = () => {
      if (ticket.trim() !== "") {
        const updatedTickets = [...form.getValues("tickets"), ticket];
        setTicket("");
        form.setValue("tickets", updatedTickets);
      }
    };
  
    function onSubmit(values: z.infer<typeof formSchema>) {
      const userStoryId = props.userStory ? props.userStory.story_id : generateId();
      const updatedUserStory: UserStory = {
        story_id: userStoryId,
        story_name: values.story_name,
        story_points: values.story_points,
        tickets: values.tickets.map((ticketName: string) => ({
          ticket_name: ticketName,
        })),
      };
      if (props.userStory) {
        props.updateUserStory(updatedUserStory);
      } else {
        props.createUserStory(updatedUserStory);
      }
      form.reset();
      setTicket("");
    }
  
    return (
      <>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"} className="w-full my-4">
              <GoPlus className="h-full w-auto" />
              Add user story
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] overflow-y-auto sm:max-h-[600px]">
            <DialogHeader>
              <DialogTitle>{props.userStory ? "Update" : "Add"} user story</DialogTitle>
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
                {props.userStory && (
                  <FormField
                    control={form.control}
                    name="story_points"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Story Points</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Please enter story points"
                            {...field}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                )}
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
                    <Button type="submit">Save</Button>
                  </DialogTrigger>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </>
    );
  };
  