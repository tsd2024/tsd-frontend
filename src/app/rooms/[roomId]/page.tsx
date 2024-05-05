"use client"

import React from 'react'
import { Button } from '@/components/ui/button';

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { GoTasklist } from "react-icons/go";
import { useSearchParams } from 'next/navigation'

import { LobbyResultSheet } from './LobbyResultSheet';
import useGameLogic from './use-game-logic';

export default function RoomPage({ params }: { params: { roomId: string } }) {
    const searchParams = useSearchParams()
    const playerId = searchParams.get('playerId')
    const isAdmin = searchParams.get('admin') === 'true';
    const roomId = params.roomId;

    const {
        joinedPlayers,
        selectedCard,
        roundConcluded,
        isResultSheetOpen,
        cards,
        handleCardSelection,
        revealCards,
        openResultsSheet,
        setIsResultSheetOpen
    } = useGameLogic(roomId, playerId);

    return (
        <div className="flex flex-row w-full h-screen">
            <div className="flex flex-col border-r w-1/5 p-4">
                <h1 className="text-2xl font-bold pb-4">
                    Players
                </h1>
                {/* Players' cards */}
                <div className="flex flex-col space-y-4">
                    {joinedPlayers.map((player) => (
                        <Card key={player.player_id}>
                            <CardHeader>
                                <CardTitle>{player.player_id}</CardTitle>
                                <CardDescription>
                                    <div className="flex flex-row space-x-4 items-center">
                                        <p>{player.ready ? 'Ready' : 'Choosing card'}</p>
                                        <div className={`w-3 h-3 rounded-full ${player.ready ? 'bg-green-400' : 'bg-yellow-300'}`}></div>
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
                    <div className="flex flex-row space-x-2">
                        {isAdmin && (
                            <Button variant="default" onClick={revealCards} className={roundConcluded ? "w-1/2" : "w-full"} >
                                Show cards
                            </Button>
                        )}
                        {roundConcluded && (
                            <Button variant="default" className={!isAdmin ? "w-full" : "w-1/2"} onClick={openResultsSheet}>
                                Results
                            </Button>
                        )}
                        <LobbyResultSheet
                            joinedPlayers={joinedPlayers}
                            isAdmin={isAdmin}
                            isOpen={isResultSheetOpen}
                            onOpenChange={setIsResultSheetOpen}
                            roundConcluded={roundConcluded}
                        />
                    </div>

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
