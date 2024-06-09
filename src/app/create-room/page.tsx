"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormLabel, FormDescription, FormMessage, FormItem, FormControl } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from 'uuid';
import useWebSocket from 'react-use-websocket';
import { useRouter } from 'next/navigation'
import ActionType from "@/types/ActionType";

import { useSession } from 'next-auth/react'
import { useEffect, useState } from "react";

const formSchema = z.object({
    roomname: z.string().min(3, {
        message: "Room name must be at least 3 characters.",
    }),
    max_players: z.number(),
    max_rounds: z.number()
})

export default function CreateRoomPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            roomname: "",
            max_players: 1,
            max_rounds: 1,
        },
    });

    const router = useRouter();
    const BACKEND_URL = process.env.BACKEND_URL;
    const WEBSOCKET_PROTOCOL = process.env.WEBSOCKET_PROTOCOL;

    const generateId = () => {
        return uuidv4(); // <-- Generate UUID
    };

    const { data: session } = useSession();
    const [socketUrl, setSocketUrl] = useState<null | string>(null);

    useEffect(() => {
        if (session?.id_token) {
            setSocketUrl(`${WEBSOCKET_PROTOCOL}://${BACKEND_URL}/api/v1/room?token=${session.id_token}`);
        }
    }, [session]);

    const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl, {
        shouldReconnect: () => true,
        onOpen: () => console.log("opened"),
        onMessage: (event) => {
            const data = JSON.parse(event.data);

            if (data.action === "create") {
                const roomId = data.lobby_id;
                router.push(`/rooms/${roomId}/`);
            }
        },

    });

    const createLobby = (maxPlayers: number, numberOfRounds: number, lobbyName: string) => {
        let data = {
            action: ActionType.CREATE,
            value: { max_players: maxPlayers, number_of_rounds: numberOfRounds, lobby_name: lobbyName, admin_id: session?.user?.email, admin_name: session?.user?.name}
        }
        sendMessage(JSON.stringify(data));
    };

    function onSubmit(values: z.infer<typeof formSchema>) {
        const lobbyId = generateId();
        const adminId = generateId();
        createLobby(values.max_players, values.max_rounds, values.roomname);
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
                            name="max_rounds"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Maximum rounds</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Max rounds" {...field}
                                            type="number"
                                            onChange={event => field.onChange(+event.target.value)}
                                            min={1}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        Specify the maximum ammount of rounds
                                    </FormDescription>
                                    <FormMessage />
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

