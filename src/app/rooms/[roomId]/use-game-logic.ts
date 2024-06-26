import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import useWebSocket from 'react-use-websocket';

import ActionType from '@/types/ActionType';
import Player from '@/types/Player';
import UserStory from '@/types/UserStory';

import { useSession } from 'next-auth/react'

interface WebSocketMessage {
    action: ActionType;
    value: any;
}

const useGameLogic = (roomId: string, playerId: string | null, playerName: string | null) => {
    const BACKEND_URL = process.env.BACKEND_URL;
    const WEBSOCKET_PROTOCOL = process.env.WEBSOCKET_PROTOCOL;
    const BACKEND_PROTOCOL = process.env.BACKEND_PROTOCOL;
    const ENDPOINT_USER_STORIES = `${BACKEND_PROTOCOL}://${BACKEND_URL}/api/v1/story`

    const [adminId, setAdminId] = useState<string | null>(null);
    const [joinedPlayers, setJoinedPlayers] = useState<Player[]>([]);
    const [selectedCard, setSelectedCard] = useState<number | null>(null);
    const [roundConcluded, setRoundConcluded] = useState<boolean>(false);
    const [isResultSheetOpen, setIsResultSheetOpen] = useState<boolean>(false);
    const [firstResultSheetOpen, setFirstResultSheetOpen] = useState<boolean>(false);
    const [userStories, setUserStories] = useState<UserStory[]>([]);
    const [selectedUserStory, setSelectedUserStory] = useState<UserStory | null>(null);

    const cards = [1, 2, 3, 5, 8, 13, 21]
    const [currentRound, setCurrentRound] = useState<number>(1);
    const [numberOfRounds, setNumberOfRounds] = useState<number | null>(null);
    const [socketUrl, setSocketUrl] = useState<null | string>(null);

    const { data: session } = useSession()

    useEffect(() => {
        if (session?.id_token) {
            setSocketUrl(`${WEBSOCKET_PROTOCOL}://${BACKEND_URL}/api/v1/room?token=${session.id_token}`);
        }
    }, [session]);

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
        socketUrl,
        {
            shouldReconnect: () => true,
            onOpen: () => {
                const joinData: WebSocketMessage = {
                    action: ActionType.JOIN,
                    value: { lobby_id: roomId, player_id: playerId, player_name: playerName}
                };
                sendMessage(JSON.stringify(joinData));
            },
            onMessage: (event) => {
                let receiveData = JSON.parse(event.data) as WebSocketMessage;
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
                    const userStories = receiveData.value.user_stories as UserStory[];
                    setAdminId(receiveData.value.admin_id);
                    setUserStories(userStories);
                    setSelectedUserStory(userStories.find(story => story.story_id === receiveData.value.current_user_story_id) || null);
                    setNumberOfRounds(receiveData.value.number_of_rounds);
                    setCurrentRound(receiveData.value.round_number);
                    setJoinedPlayers(players);
                    if (receiveData.value.reveal_ready) {
                        setRoundConcluded(true);
                    }
                }
                if (receiveData.action === ActionType.NEXT_ROUND) {
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
      
    const updateUserStory = async (newUserStory: UserStory) => {
      const userStoryData = {
          lobby_id: roomId,
          story_id: newUserStory.story_id,
          story_name: newUserStory.story_name,
          tickets: newUserStory.tickets.map(ticket => ({
            ticket_name: ticket.ticket_name
          }))
        };
      try {
        const response = await fetch(`${ENDPOINT_USER_STORIES}/update`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session?.id_token}`
          },
          body: JSON.stringify(userStoryData)
        });
        //setUserStories([...userStories, newUserStory]);
        const data = await response.json();
      } catch (error) {
        console.error('Error:', error);
      }
    };

      const createUserStory = async (newUserStory: UserStory) => {
        const userStoryData = {
            lobby_id: roomId,
            story_name: newUserStory.story_name,
            tickets: newUserStory.tickets.map(ticket => ({
              ticket_name: ticket.ticket_name
            }))
          };
        try {
          const response = await fetch(`${ENDPOINT_USER_STORIES}/add`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.id_token}`
            },
            body: JSON.stringify(userStoryData)
          });
          const data = await response.json();
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      const deleteUserStory = async (newUserStory: UserStory) => {
        const userStoryData = {
            lobby_id: roomId,
            story_id: newUserStory.story_id,   
        };
        try {
          const response = await fetch(`${ENDPOINT_USER_STORIES}/delete`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${session?.id_token}`
            },
            body: JSON.stringify(userStoryData)
          });
          const data = await response.json();
        } catch (error) {
          console.error('Error:', error);
        }
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
        router.push(`/dashboard`)
    }

    const openResultsSheet = () => {
        setIsResultSheetOpen(true);
    };

    const copyInviteLink = () => {
        const lobbyLink = `${window.location.origin}/join/?roomId=${roomId}`;
        navigator.clipboard.writeText(lobbyLink);
    }

    const exportUserStories = async () => {
        const response = await fetch(`${ENDPOINT_USER_STORIES}/download_csv/${roomId}`);
        if (response.ok) {
          const csvContent = await response.text();
        
          const blob = new Blob([csvContent], { type: 'text/csv' });
          const url = window.URL.createObjectURL(blob);
          
          const a = document.createElement('a');
          a.href = url;
          a.download = 'user_stories.csv';
          document.body.appendChild(a);
        
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
      } else {
          console.error('Failed to download file:', response.statusText);
      }
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
        createUserStory,
        deleteUserStory,
        userStories,
        setUserStories,
        selectedUserStory,
        setSelectedUserStory,
        updateUserStory,
        copyInviteLink,
        goToNextRound,
        currentRound,
        navigateAtTheEndOfGame,
        numberOfRounds,
        exportUserStories,
        adminId
    };
};

export default useGameLogic;

