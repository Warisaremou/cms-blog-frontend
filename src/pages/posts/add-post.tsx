import { AddEditPostForm } from "@/components/forms";

export default function AddPost() {
  return (
    <div className="flex flex-col gap-5">
      <h1 className="text-2xl font-bh-bold px-2 md:px-8">Add a new post</h1>

      <AddEditPostForm />
    </div>
  );
}
