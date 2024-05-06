import Ticket from "./Ticket";

type UserStory = {
    story_id: string;
    story_name: string;
    story_points: number;
    tickets: Ticket[]; 
};

export default UserStory;