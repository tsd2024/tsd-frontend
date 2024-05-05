import { useState, useEffect } from 'react';
import useWebSocket from 'react-use-websocket';

import ActionType from '@/types/ActionType';
import Player from '@/types/Player';
import UserStory from '@/types/UserStory';

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
    const [userStories, setUserStories] = useState<UserStory[]>([]);
    const [selectedUserStory, setSelectedUserStory] = useState<UserStory | null>(null);


    const cards = [1, 2, 3, 5, 8, 13, 21]

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
                    setJoinedPlayers(players);
                    if (receiveData.value.reveal_ready) {
                        setRoundConcluded(true);
                    }
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

    const openResultsSheet = () => {
        setIsResultSheetOpen(true);
    };
    
      const createUserStory = (newUserStory: UserStory) => {
        setUserStories([...userStories, newUserStory]);
        console.log(newUserStory.title);
        console.log(newUserStory.user_story_id);
      };
    
      const deleteUserStory = (userStoryToDelete: UserStory) => {
        if (selectedUserStory?.user_story_id === userStoryToDelete.user_story_id) {
            setSelectedUserStory(null);
        }
        setUserStories(
          userStories.filter(userStory => userStory.user_story_id !== userStoryToDelete.user_story_id)
        );
      }; 

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
        createUserStory,
        deleteUserStory,
        userStories,
        setUserStories,
        selectedUserStory,
        setSelectedUserStory,
    };
};

export default useGameLogic;