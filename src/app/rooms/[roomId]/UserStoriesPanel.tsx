import React from "react";

import { Button } from "@/components/ui/button";
import UserStory from "@/types/UserStory";
import { MdDeleteForever } from "react-icons/md";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";


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

  interface UserStoriesPanelProps {
    userStories: UserStory[];
    createUserStory: (userStory: UserStory) => void;
    deleteUserStory: (userStory: UserStory) => void;
    setSelectedUserStory: (userStory: UserStory) => void;
}

export const UserStoriesPanel = (props: UserStoriesPanelProps) => {

    const formSchema = z.object({
        title: z.string().min(3),
      });
    
      const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          title: "",
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
        };
        props.createUserStory(newUserStory);
        console.log(newUserStory);
        form.reset();
      }
      
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
                    <Card key={userStory.user_story_id} className="hover:cursor-pointer">
                      <CardHeader>      
                     <CardTitle className="text-lg">{userStory.title}</CardTitle>
                     </CardHeader>
                        <CardContent>
                          {/*Tasks*/}
                          <div className="flex flex-row my-4 items-center"></div>
                          {/*Tasks*/}
                          </CardContent>
                          <CardFooter>
                          <div className="flex justify-between items-center w-full">
                            <div className="space-x-2 flex items-center">
                            <SheetClose asChild>
                              <Button variant={"outline"} onClick={() => props.setSelectedUserStory(userStory)}> Vote this now </Button>
                            </SheetClose>
                            <Button variant={"outline"} className="p-1 h-9" onClick={() => props.deleteUserStory(userStory)}>
                              <MdDeleteForever className="h-full w-auto" />
                            </Button>
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
}
