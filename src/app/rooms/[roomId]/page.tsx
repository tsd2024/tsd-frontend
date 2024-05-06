"use client";

import React from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

import { useSearchParams } from "next/navigation";
import { GoTasklist } from "react-icons/go";
import { BsCheckCircle } from 'react-icons/bs';

import { LobbyResultSheet } from "./LobbyResultSheet";
import useGameLogic from "./use-game-logic";
import { GameTable } from "./GameTable";
import { GameRoomSidePanel } from "./GameRoomSidePanel";
import { UserStoriesPanel } from "./UserStoriesPanel";
import { IoClose } from "react-icons/io5";

export default function RoomPage({ params }: { params: { roomId: string } }) {
    const searchParams = useSearchParams();
    const playerId = searchParams.get("playerId");
    const isAdmin = searchParams.get("admin") === "true";
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
        setIsResultSheetOpen,
        userStories,
        createUserStory,
        deleteUserStory,
        setSelectedUserStory,
        selectedUserStory,
        updateUserStory,
        copyInviteLink,
        goToNextRound,
        navigateAtTheEndOfGame,
        numberOfRounds,
        currentRound,
        exportUserStories
    } = useGameLogic(roomId, playerId);

    return (
        <div className="flex flex-row w-full h-screen">
            <GameRoomSidePanel joinedPlayers={joinedPlayers} />
            <div className="flex flex-col w-4/5 p-4">
                {/* Header */}
                <div className="flex flex-row w-full justify-between">
                    <h1 className="text-3xl font-bold">Room {roomId}</h1>
                    <div className="flex flex-row space-x-4 items-center mr-2">
                        <Button
                            variant={"outline"}
                            onClick={() => {
                                copyInviteLink();
                                toast("Invite link has been copied!", {
                                    duration: 3000,
                                    position: 'bottom-left',
                                    icon: <BsCheckCircle className="text-green-500" />
                                });
                            }}>
                            Invite players
                        </Button>
                        <UserStoriesPanel
                            userStories={userStories}
                            createUserStory={createUserStory}
                            deleteUserStory={deleteUserStory}
                            setSelectedUserStory={setSelectedUserStory}
                            updateUserStory={updateUserStory}
                            roomId={roomId}
                            exportUserStories={exportUserStories}
                        />
                    </div>
                </div>

                {/* Planning Poker Section */}
                <div className="relative w-full h-3/4 flex justify-center items-center flex-col space-y-6">
                    {selectedUserStory && (
                        <div className="flex items-center space-x-3">
                            <h3 className="font-bold">
                                Voting now: {selectedUserStory.story_name}
                            </h3>

                            {/* Button to unselect user story
                            <Button variant={"destructive"} className="h-6 p-1" onClick={() => setSelectedUserStory(null)}>
                                <IoClose className="h-full w-auto" />
                            </Button> */}

                        </div>
                    )}
                    <GameTable />
                    {/* Show cards and results buttons*/}
                    <div className="flex flex-row space-x-2">
                        {isAdmin && (
                            <Button
                                variant="default"
                                onClick={revealCards}
                                className={roundConcluded ? "w-1/2" : "w-full"}
                            >
                                Show cards
                            </Button>
                        )}
                        {roundConcluded && (
                            <Button
                                variant="default"
                                className={!isAdmin ? "w-full" : "w-1/2"}
                                onClick={openResultsSheet}
                            >
                                Results
                            </Button>
                        )}
                        <LobbyResultSheet
                            joinedPlayers={joinedPlayers}
                            isAdmin={isAdmin}
                            isOpen={isResultSheetOpen}
                            onOpenChange={setIsResultSheetOpen}
                            roundConcluded={roundConcluded}
                            goToNextRound={goToNextRound}
                            currentRound={currentRound}
                            navigateAtTheEndOfGame={navigateAtTheEndOfGame}
                            numberOfRounds={numberOfRounds}
                        />
                    </div>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                    <p className="flex items-center justify-center">Choose your card</p>
                    <div className="flex flex-row space-x-4 items-center justify-center">
                        {cards.map((card) => (
                            <Button
                                variant={"outline"}
                                key={card}
                                className={`w-12 h-20 rounded-lg shadow-md transition-transform duration-300 transform hover:-translate-y-1.5 ${selectedCard === card ? "bg-green-400 hover:bg-green-400" : ""
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
    );
}
