"use client";

import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    const [error, setError] = useState<string | null>(null);
    return (
        <div className="max-w-2xl">
            {error && (
                <Callout.Root color="red" className="mb-4">
                    <Callout.Text>{error}</Callout.Text>
                </Callout.Root>
            )}
            <form
                className="space-y-4"
                onSubmit={handleSubmit(async (data) => {
                    try {
                        await axios.post("/api/issues", data);
                        router.push("/issues");
                    } catch (error) {
                        setError("Something went wrong");
                    }
                })}
            >
                <TextField.Root
                    placeholder="Issue Title"
                    {...register("title")}
                >
                    <TextField.Slot />
                </TextField.Root>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDEClient field={field} />}
                />
                <Button>Submit</Button>
            </form>
        </div>
    );
};

export default newIssuePage;
