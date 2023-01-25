import { Company } from "./company";

export interface TableRow {
    userId: number;
    userName: string;
    userCompany: Company;
    postId: number;
    postTitle: string;
    postContent: string,
    isUserAuthenticated: boolean
}