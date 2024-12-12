import { useParams } from "react-router";

export default function Post() {
  const { id_post } = useParams();

  console.log(id_post);
  return <div>Post {id_post}</div>;
}
