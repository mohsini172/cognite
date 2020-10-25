import { Text } from "./text.model";
import { User } from "./user.model";

export interface Chat {
    _id: string;
    user1: User;
    user2: User;
    texts: Text[];
}
