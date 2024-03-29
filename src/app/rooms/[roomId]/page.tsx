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

    return (
        <div className="flex flex-col w-full h-screen">
            
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
                    <div className="flex flex-row w-full justify-between">
                        <h1 className="text-3xl font-bold">Room {roomId}</h1>
                        <div className="flex flex-row space-x-4 items-center">
                            <Button variant={"secondary"}>Invite players</Button>
                            <GoTasklist className="ml-4" style={{ height: '100%', width: 'auto' }}/>
                        </div>

                    </div>


                    {/* Planning Poker Section */}
                    <div className="relative w-full h-3/4 flex justify-center items-center">
                        {/* Planning Poker Rectangle */}
                        <div className="absolute inset-0 flex justify-center items-center">
                            {/* Content of the Rectangle */}
                            <div className="w-2/5 h-1/5 bg-blue-500 rounded-lg flex justify-center items-center">
                                <h1 className="text-white text-xl font-bold">Pick your cards!</h1>
                            </div>
                        </div>
                    </div>


                    <div className="space-y-4">
                        <p className="flex items-center justify-center">
                            Choose your card
                        </p>

                        {/* Cards */}
                        <div className="flex flex-row space-x-4 items-center justify-center">
                            {cards.map((card) => (
                                <Button
                                    variant={"secondary"}
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
        </div>
    )
}
