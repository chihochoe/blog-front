export interface Post {
    id: number;
    title: string;
    content: string;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface PostInput {
    title: string;
    content: string;
    author: string;
} 