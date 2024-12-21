import { AddEditPostForm } from "@/components/forms";
import { useToast } from "@/hooks/use-toast";
import { getPost } from "@/services/posts";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function EditPost() {
  const { id_post } = useParams();
  const { toast } = useToast();
  const [postData, setPostData] = useState<Post | null>(null);

  async function getPostData() {
    await getPost(id_post!)
      .then((res) => {
        setPostData(res);
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: error.response.data.message ?? error.message,
        });
      });
  }

  useEffect(() => {
    getPostData();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-2 md:px-8 w-full max-w-3xl mx-auto board-content">
      <h1 className="text-2xl font-bh-bold">Edit post {id_post} </h1>
      <AddEditPostForm postData={postData} />
    </div>
  );
}
