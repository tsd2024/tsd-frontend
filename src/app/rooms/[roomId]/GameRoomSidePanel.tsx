import React from 'react'

import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import Player from '@/types/Player';

interface GameRoomSidePanelProps {
    joinedPlayers: Player[];
}

export const GameRoomSidePanel = (props: GameRoomSidePanelProps) => {
    return (
        <>
            {/* SidePanel */}
            <div className="flex flex-col border-r w-1/5 p-4">
                <h1 className="text-2xl font-bold pb-4">
                    Players
                </h1>
                {/* Players' cards */}
                <div className="flex flex-col space-y-4">
                    {props.joinedPlayers.map((player) => (
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
        </>
    )
}