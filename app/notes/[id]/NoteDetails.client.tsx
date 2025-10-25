"use client";

import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

export default function NoteDetailsClient() {
    const { id } = useParams<{ id: string }>();
    const { data: note, isLoading, error } = useQuery({
        queryKey: ["note", id],
        queryFn: () => fetchNoteById(id),
        enabled: !!id,
        refetchOnMount: false,
    });

    if (!id || isLoading) {return <p>Loading, please wait...</p>;}
    if (error || !note) {throw error || new Error("Failed to load note details.");}

    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.header}>
                    <h2>{note.title}</h2>
                </div>
                <p className={css.content}>{note.content}</p>
                <p className={css.date}>{new Date(note.createdAt).toLocaleString()}</p>
            </div>
        </div>
     );
}