import { User } from "../../entities/user.entity.ts";

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}

export { };