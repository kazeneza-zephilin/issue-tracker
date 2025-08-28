import { z } from "zod";

export const CreateIssueSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(255),
    description: z.string().min(3, "Description must be at least 3 characters"),
});
