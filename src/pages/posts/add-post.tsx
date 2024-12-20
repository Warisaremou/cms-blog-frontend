import { AddEditPostForm } from "@/components/forms";

export default function AddPost() {
  return (
    <div className="flex flex-col gap-5 px-2 md:px-8 w-full max-w-3xl mx-auto board-content">
      <h1 className="text-2xl font-bh-bold">Add new post</h1>
      <AddEditPostForm />
    </div>
  );
}
