export interface Note {
  id: string;
  title: string;
  content: string;
  tag: NoteTag; 
  createdAt: string;
  updatedAt: string;
}

export type NoteTag = "" | "Work" | "Personal" | "Meeting" | "Shopping" | "Todo";

export interface CreateNoteHttpResponse {
    title: string;
    content: string;
    tag: NoteTag;
}

export interface NotesClientProps {
    tag: NoteTag | null;
}