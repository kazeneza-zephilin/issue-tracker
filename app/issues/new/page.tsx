"use client";

import { Button, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

const SimpleMDEClient = dynamic(() => import("./SimpleMDEClient"), {
    ssr: false,
});

const newIssuePage = () => {
    const router = useRouter();
    interface issueForm {
        title: string;
        description: string;
    }
    const { register, control, handleSubmit } = useForm<issueForm>();
    return (
        <form
            className="max-w-2xl space-y-4"
            onSubmit={handleSubmit(async (data) => {
                await axios.post("/api/issues", data);
                router.push("/issues");
            })}
        >
            <TextField.Root placeholder="Issue Title" {...register("title")}>
                <TextField.Slot />
            </TextField.Root>
            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDEClient field={field} />}
            />
            <Button>Submit</Button>
        </form>
    );
};

export default newIssuePage;
