import { fetchNoteById } from "@/lib/api";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import NotePreviewClient from "./NotePreview.client";

type Props = {
  params: Promise<{ id: string }>;
};

const NotePreview = async ({ params }: Props) => {
  const { id } = await params;

const queryClient = getQueryClient();
await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById({id})
})
return <HydrationBoundary state={dehydrate(queryClient)}>
<NotePreviewClient/>
</HydrationBoundary>
};

export default NotePreview;
