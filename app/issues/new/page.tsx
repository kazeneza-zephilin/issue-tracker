"use client";

import { Button, TextField } from "@radix-ui/themes";

import dynamic from "next/dynamic";
const SimpleMDEClient = dynamic(() => import("./SimpleMDEClient"), { ssr: false });

const newIssuePage = () => {
    return (
        <div className="max-w-2xl space-y-4">
            <TextField.Root placeholder="Issue Title">
                <TextField.Slot />
            </TextField.Root>
            <SimpleMDEClient />
            <Button>Submit</Button>
        </div>
    );
};

export default newIssuePage;
