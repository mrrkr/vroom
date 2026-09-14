import NoteForm from "@/components/NoteForm";
import { PageTitle } from "@/components/Tabs";
import { Icon } from "@/components/Icons";
import { createNote } from "@/app/actions";

export const metadata = { title: "New note" };

export default function NewNote() {
  return (
    <>
      <PageTitle><Icon name="i-plus" className="text-pink" /> New note</PageTitle>
      <NoteForm action={createNote} submitLabel="Save" />
    </>
  );
}
