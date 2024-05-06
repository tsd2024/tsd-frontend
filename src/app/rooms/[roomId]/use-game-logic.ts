import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'
import useWebSocket from 'react-use-websocket';

import ActionType from '@/types/ActionType';
import Player from '@/types/Player';

interface WebSocketMessage {
    action: ActionType;
    value: any;
}

const useGameLogic = (roomId: string, playerId: string | null) => {
    const BACKEND_URL = process.env.BACKEND_URL;
    const WEBSOCKET_PROTOCOL = process.env.WEBSOCKET_PROTOCOL;

    const [joinedPlayers, setJoinedPlayers] = useState<Player[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [roundConcluded, setRoundConcluded] = useState<boolean>(false);
    const [isResultSheetOpen, setIsResultSheetOpen] = useState<boolean>(false);
    const [firstResultSheetOpen, setFirstResultSheetOpen] = useState<boolean>(false);
    const [currentRound, setCurrentRound] = useState<number>(1);
    const [numberOfRounds, setNumberOfRounds] = useState<number | null>(null);

    const cards = [1, 2, 3, 5, 8, 13, 21]
    const router = useRouter();

    const handleCardSelection = (card: number) => {
        if (selectedCard === card) {
            setSelectedCard(null);
            cancelCard();
        } else {
            setSelectedCard(card);
            playCard(card);
        }
    };

    const { sendMessage, lastMessage, readyState } = useWebSocket<WebSocketMessage>(
        `${WEBSOCKET_PROTOCOL}://${BACKEND_URL}/api/v1/room`,
        {
            shouldReconnect: () => true,
            onOpen: () => {
                const joinData: WebSocketMessage = {
                    action: ActionType.JOIN,
                    value: { lobby_id: roomId, player_id: playerId }
                };
                sendMessage(JSON.stringify(joinData));
            },
            onMessage: (event) => {
                let receiveData = JSON.parse(event.data) as WebSocketMessage;
                console.log(receiveData);

                if (
                    receiveData.action === ActionType.LOBBY_STATE &&
                    receiveData.value.reveal_ready &&
                    !firstResultSheetOpen
                ) {
                    setFirstResultSheetOpen(true);
                    openResultsSheet();
                }

                if (receiveData.action === ActionType.LOBBY_STATE) {
                    const players = receiveData.value.players as Player[];
                    setNumberOfRounds(receiveData.value.number_of_rounds);
                    setCurrentRound(receiveData.value.round_number);
                    setJoinedPlayers(players);
                    if (receiveData.value.reveal_ready) {
                        setRoundConcluded(true);
                    }
                }

                if (receiveData.action === ActionType.NEXT_ROUND) {
                    console.log("HERE")
                    setSelectedCard(null);
                    // reset results sheet open
                    setFirstResultSheetOpen(false);
                    // reset roundConcluded to close the results sheet
                    setRoundConcluded(false);
                    setIsResultSheetOpen(false);
                }

            }
        }
    );

    const playCard = (card: number) => {
        const playCardData: WebSocketMessage = {
            action: ActionType.PLAY_CARD,
            value: { lobby_id: roomId, player_id: playerId, card: card }
        };
        sendMessage(JSON.stringify(playCardData));
    };

    const revealCards = () => {
        const revealData: WebSocketMessage = {
            action: ActionType.REVEAL,
            value: { lobby_id: roomId, player_id: playerId }
        };
        sendMessage(JSON.stringify(revealData));
    };

    const cancelCard = () => {
        const cancelCardData: WebSocketMessage = {
            action: ActionType.CANCEL,
            value: { lobby_id: roomId, player_id: playerId }
        };
        sendMessage(JSON.stringify(cancelCardData));
    };

    const goToNextRound = () => {
        const nextRoundData: WebSocketMessage = {
            action: ActionType.NEXT_ROUND,
            value: { lobby_id: roomId, player_id: playerId }
        };
        sendMessage(JSON.stringify(nextRoundData));

        // unclick all cards
        setSelectedCard(null);
        // reset results sheet open
        setFirstResultSheetOpen(false);
        // reset roundConcluded to close the results sheet
        setRoundConcluded(false);
    };

    const navigateAtTheEndOfGame = () => {
        router.push(`/create-room`)
    }

    const openResultsSheet = () => {
        setIsResultSheetOpen(true);
    };

    const copyInviteLink = () => {
        const lobbyLink = `${window.location.origin}/join/?roomId=${roomId}`;
        navigator.clipboard.writeText(lobbyLink);
    }

    return {
        joinedPlayers,
        setJoinedPlayers,
        selectedCard,
        setSelectedCard,
        roundConcluded,
        setRoundConcluded,
        isResultSheetOpen,
        setIsResultSheetOpen,
        handleCardSelection,
        revealCards,
        cancelCard,
        readyState,
        cards,
        openResultsSheet,
        copyInviteLink,
        goToNextRound,
        currentRound,
        navigateAtTheEndOfGame,
        numberOfRounds
    };
};

export default useGameLogic;
