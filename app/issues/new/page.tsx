import React from "react";
import { TextArea, TextField } from "@radix-ui/themes";

const newIssuePage = () => {
    return (
        <div className="max-w-2xl space-y-4">
            <TextField.Root placeholder="Issue Title">
                <TextField.Slot />
            </TextField.Root>
            <TextArea placeholder="add description" />
        </div>
    );
};

export default newIssuePage;
