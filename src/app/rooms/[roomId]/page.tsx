"use client"

import React from 'react'
import { Button } from '@/components/ui/button';

import { GoTasklist } from "react-icons/go";
import { useSearchParams } from 'next/navigation'

import { LobbyResultSheet } from './LobbyResultSheet';
import useGameLogic from './use-game-logic';
import { GameTable } from './GameTable';
import { GameRoomSidePanel } from './GameRoomSidePanel';

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
            <GameRoomSidePanel 
                joinedPlayers={joinedPlayers} 
            />
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
                    <GameTable />
                    {/* Show cards and results buttons*/}
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
