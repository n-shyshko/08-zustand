'use client';
import css from './NotesClient.module.css';

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import SearchBox from '@/components/SearchBox/SearchBox';
import { fetchNotes } from '@/lib/api';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';
type NotesClientProps = {
  category?: string;
};

const NotesClient = ({ category }: NotesClientProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchValue] = useDebounce(searchQuery, 1000);
  const [page, setPage] = useState(1);
  const queryParams = {
    category,
    searchValue,
    page,
  };
  const { data, isLoading, error } = useQuery({
    queryKey: ['notes', searchValue, page],
    queryFn: () => fetchNotes(queryParams),
    placeholderData: keepPreviousData,
  });
  const notes = data?.notes ?? [];
  const totalPages = data?.totalPages ?? 1;
  if (isLoading)
    return <p style={{ textAlign: 'center' }}>Loading, please wait...</p>;
  if (error) {
    return (
      <p style={{ textAlign: 'center' }}>
        Could not fetch the list of notes. {error.message}
      </p>
    );
  }
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onChange={setSearchQuery} />
        <Pagination totalPages={totalPages} setPage={setPage} />
        <Link href={'/notes/action/create'} className={css.button}>
          Create note +
        </Link>
      </header>
      <NoteList notes={notes} />
    </div>
  );
};

export default NotesClient;
