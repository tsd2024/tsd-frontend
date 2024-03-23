"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormDescription, FormMessage, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch"

const formSchema = z.object({
    roomname: z.string().min(3, {
        message: "Room name must be at least 3 characters.",
    }),
    allow_show_cards: z.boolean().default(false),
    auto_show_cards: z.boolean().default(false),
    max_players: z.number()
})

export default function CreateRoomPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roomname: "",
            max_players: 1,
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }
    return (
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
            <h1 className="text-4xl font-bold">Create Room</h1>
            <div className="max-w-md mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="roomname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Room name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your room name" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is the room name that will be displayed.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="max_players"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum players</FormLabel>
                                    <FormControl>
                                        <Input 
                                            placeholder="Max players" {...field} 
                                            type="number" 
                                            onChange={event => field.onChange(+event.target.value)}
                                            min={1}
                                            max={10}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Specify the maximum ammount of players in the room
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="allow_show_cards"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Allow all users to show cards
                                        </FormLabel>
                                        <FormDescription>
                                            All users will be able to flip cards.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="auto_show_cards"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            Allow to show cards automatically
                                        </FormLabel>
                                        <FormDescription>
                                            All cards will be revealed after everyone voted.
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
