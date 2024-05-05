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
    CardDescription,
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
                        <Card key={player.player_id} className="">
                            <CardHeader>
                                <CardTitle className="flex items-center justify-center">{player.player_id}</CardTitle>
                                <CardDescription>
                                    <div className="flex flex-row space-x-4 items-center">
                                        {/* <GiCardJoker className="w-12 h-12"/> */}
                                        <p>Chosen card: </p>
                                        <p className="text-white font-bold">{props.roundConcluded ? player.card : ''}</p>
                                    </div>
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
                <SheetFooter className="">
                    <SheetClose asChild>
                        <Button type="submit">Next round</Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    )
}
