"use client"

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { GoTasklist } from "react-icons/go";
import useWebSocket from 'react-use-websocket';


export default function RoomPage({ params }: { params: { roomId: string } }) {
    const roomId = params.roomId;
    const [joinedPlayers, setJoinedPlayers] = useState<string[]>([]);

    useEffect(() => {
        setJoinedPlayers(['Player 1', 'Player 2']);
    }, []);
    const cards = [0, 1, 2, 3, 5, 8, 13, 21, 34, "?"]

    const [selectedCard, setSelectedCard] = useState<number | string | null>(null);

    const handleCardSelection = (card: number | string) => {
        if (selectedCard === card) {
            setSelectedCard(null);
        } else {
            setSelectedCard(card);
        }
    };

    const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:8009/api/v1/room', {
        shouldReconnect: () => true,
        onOpen: () => {
            console.log("opened");
            sendMessage(JSON.stringify({ action: "join", value: { lobby_id: roomId, player_id: "player1" } }));
        },
        onMessage: (event) => {
            console.log("received", event.data);
            let data = JSON.parse(event.data);
            console.log(data)

        },

    });

    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex flex-col border-r w-1/5 p-4">
                <h1 className="text-2xl font-bold pb-4">
                    Players
                </h1>
                {/* Players' cards */}
                <div className="flex flex-col space-y-4">
                    {joinedPlayers.map((player) => (
                        <Card key={player}>
                            <CardHeader>
                                <CardTitle>{player}</CardTitle>
                                <CardDescription>
                                    <div className="flex flex-row space-x-4 items-center">
                                        <p>choosing card</p>
                                        <div className="w-3 h-3 rounded-full bg-yellow-300"></div>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
            <div className='flex flex-col w-4/5 p-4'>
                {/* Header */}
                <div className="flex flex-row w-full justify-between">
                    <h1 className="text-3xl font-bold">Room {roomId}</h1>
                    <div className="flex flex-row space-x-4 items-center mr-2">
                        <Button variant={"outline"}>Invite players</Button>
                        <Button variant={"outline"}>
                            <GoTasklist className="h-full w-auto" />
                        </Button>
                    </div>
                </div>
                {/* Planning Poker Section */}
                <div className="relative w-full h-3/4 flex justify-center items-center flex-col space-y-6">
                    <div className="w-2/5 rounded-3xl p-px bg-gradient-to-b from-blue-300 to-pink-300 dark:from-blue-800 dark:to-purple-800 ">
                        <div className="rounded-[calc(1.5rem-1px)] p-10 bg-white dark:bg-gray-900 flex items-center justify-center">
                            <p className="text-gray-700 dark:text-gray-300">Pick your cards!</p>
                        </div>
                    </div>
                    {/* This button should be only available for lobby admin*/}
                    <Button variant="default">
                        Show cards
                    </Button>
                </div>
                {/* Cards */}
                <div className="space-y-4">
                    <p className="flex items-center justify-center">
                        Choose your card
                    </p>
                    <div className="flex flex-row space-x-4 items-center justify-center">
                        {cards.map((card) => (
                            <Button
                                variant={"outline"}
                                key={card}
                                className={`w-12 h-20 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1.5 ${selectedCard === card ? 'bg-green-400 hover:bg-green-400' : ''
                                    }`}
                                onClick={() => handleCardSelection(card)}
                            >
                                {card}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
