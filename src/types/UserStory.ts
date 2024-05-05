import Ticket from "./Ticket";

type UserStory = {
    user_story_id: string;
    title: string;
    points: number;
    tickets: Ticket[]; 
};

export default UserStory;