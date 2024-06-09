import React, { Dispatch, SetStateAction } from 'react';
import { GiCardJoker } from "react-icons/gi";
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
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import { Button } from "@/components/ui/button";

import Player from "@/types/Player";

interface LobbyResultSheetProps {
    joinedPlayers: Player[];
    isAdmin: boolean;
    isOpen: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    roundConcluded: boolean;
    currentRound: number;
    goToNextRound: () => void;
    navigateAtTheEndOfGame: () => void;
    numberOfRounds: number | null;
}

export const LobbyResultSheet = (props: LobbyResultSheetProps) => {
    return (
        <Sheet open={props.isOpen} onOpenChange={props.onOpenChange}>
            <SheetTrigger asChild>
            </SheetTrigger>
            <SheetContent side="bottom">
                <SheetHeader>
                    <SheetTitle>Round results</SheetTitle>
                    <SheetDescription>
                        The round results are in! Take a look at what each player has chosen for this round. You can review their selections and proceed to the next round when ready.
                    </SheetDescription>
                </SheetHeader>
                <div className="flex flex-row space-x-4 m-5">
                    {props.joinedPlayers.map((player) => (
                        <Card key={player.player_id} className="bg-primary-foreground">
                            <CardHeader className="py-2 bg-header rounded-t-md">
                                <CardTitle className="flex items-center justify-center">{player.player_name}</CardTitle>
                            </CardHeader>
                            <CardContent className="p-2">
                                <div className="flex flex-row space-x-4 items-center m-4">
                                    <p>Chosen card: </p>
                                    <p className="text-white font-bold text-xl">{props.roundConcluded ? player.card : ''}</p>
                                    <GiCardJoker className="w-12 h-12"/>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
                <SheetFooter className="">
                    <SheetClose asChild>
                        {props.currentRound !== props.numberOfRounds && props.isAdmin ? (
                            <Button type="submit" onClick={props.goToNextRound}>
                                Next round
                            </Button>
                        ) : props.currentRound === props.numberOfRounds ? (
                            <Button type="submit" onClick={props.navigateAtTheEndOfGame}>
                                End game
                            </Button>
                        ) : null}
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
