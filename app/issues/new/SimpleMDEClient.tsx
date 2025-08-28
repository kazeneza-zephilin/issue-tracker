"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

export default function SimpleMDEClient({ field }: { field: any }) {
//   const [value, setValue] = useState("");
  return (
    <SimpleMDE value={field.value}
     onChange={(value) => field.onChange(value)} placeholder="add description" />
  );
}
