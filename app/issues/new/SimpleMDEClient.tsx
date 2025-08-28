"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), { ssr: false });
import "easymde/dist/easymde.min.css";

export default function SimpleMDEClient() {
  const [value, setValue] = useState("");
  return (
    <SimpleMDE value={value} onChange={setValue} placeholder="add description" />
  );
}
