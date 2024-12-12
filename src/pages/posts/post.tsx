import { useParams } from "react-router";

export default function Post() {
  const { id_post } = useParams();

  return <div>Post {id_post}</div>;
}
