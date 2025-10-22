import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { Note } from '../../types/note';
import css from './NoteList.module.css';
import { deleteNote } from '@/lib/api';
import Link from 'next/link';
interface NoteListProps {
  notes?: Note[];
}
const NoteList: React.FC<NoteListProps> = ({ notes }) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDelete = (noteId: string) => {
    mutation.mutate(noteId);
  };
  return (
    <>
      {notes && (
        <ul className={css.list}>
          {notes.map((note) => (
            <li key={note.id} className={css.listItem}>
              <h2 className={css.title}>{note.title}</h2>
              <p className={css.content}>{note.content}</p>
              <div className={css.footer}>
                <span className={css.tag}>{note.tag}</span>
                <Link href={`/notes/${note.id}`}>View details</Link>
                <button
                  disabled={mutation.isPending}
                  onClick={() => {
                    handleDelete(note.id);
                  }}
                  className={css.button}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default NoteList;
