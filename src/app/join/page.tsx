"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormDescription, FormMessage, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import { useEffect } from "react";

const formSchema = z.object({
    lobby_id: z.string().min(3, {
        message: "Lobby ID must be at least 3 characters.",
    }),
    nickname: z.string().min(3, {
        message: "Nickname must be at least 3 characters.",
    }),
})

export default function JoinRoomPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nickname: "",
        },
    });

    const router = useRouter();
    const searchParams = useSearchParams()
    let roomId = searchParams.get('roomId') ?? "";

    useEffect(() => {
        if (roomId) {
            form.setValue('lobby_id', roomId);
        }
    }, [roomId, form]);

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
        router.push(`/rooms/${values.lobby_id}/?playerId=${values.nickname}&admin=false`);
    }

    return (
        <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
            <h1 className="text-4xl font-bold">Join Room</h1>
            <div className="max-w-md mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="lobby_id"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lobby ID</FormLabel>
                                    <FormControl>
                                        <Input 
                                        placeholder="Enter lobby ID" 
                                        defaultValue={roomId}
                                        {...field} 
                                    />
                                    </FormControl>
                                    <FormDescription>
                                        Enter the ID of the lobby you want to join.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="nickname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nickname</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your nickname" {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        Enter your nickname to be displayed in the lobby.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Join</Button>
                    </form>
                </Form>
            </div>
        </div>
    );
}
