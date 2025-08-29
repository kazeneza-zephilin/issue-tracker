"use client";

import { Button, Callout, Text, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateIssueSchema } from "../../validationSchema";
import { set, z } from "zod";
import ErrorMessage from "../../components/ErrorMessage";
import Spinner from "../../components/Spinner";

const SimpleMDEClient = dynamic(() => import("./SimpleMDEClient"), {
    ssr: false,
});

const NewIssuePage = () => {
    const router = useRouter();
    type IssueForm = z.infer<typeof CreateIssueSchema>;
    const {
        register,
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<IssueForm>({
        resolver: zodResolver(CreateIssueSchema),
    });
    const [error, setError] = useState<string | null>(null);
    const [isSubmiting, setIsSubmiting] = useState(false);
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
                        setIsSubmiting(true);
                        await axios.post("/api/issues", data);
                        router.push("/issues");
                    } catch (error) {
                        setIsSubmiting(false);
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
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDEClient field={field} />}
                />
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={isSubmiting}>
                    {isSubmiting && <Spinner />}
                    Submit
                </Button>
            </form>
        </div>
    );
};

export default NewIssuePage;
