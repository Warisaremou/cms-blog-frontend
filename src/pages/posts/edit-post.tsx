import { AddEditPostForm } from "@/components/forms";
import api from "@/lib/axios-instance";
import { Post } from "@/types";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function EditPost() {
  const { id_post } = useParams();
  const [postData, setPostData] = useState<Post | null>(null);

  async function getPost() {
    await api
      .get(`/posts/${id_post}`)
      .then((res) => {
        setPostData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  useEffect(() => {
    getPost();
  }, []);

  return (
    <div className="flex flex-col gap-5 px-2 md:px-8 w-full max-w-3xl mx-auto board-content">
      <h1 className="text-2xl font-bh-bold">Edit post {id_post} </h1>
      <AddEditPostForm postData={postData} />
    </div>
  );
}
