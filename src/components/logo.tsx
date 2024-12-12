import { routes } from "@/lib/routes";
import { Link } from "react-router";

export default function Logo() {
  return (
    <Link
      to={routes.index}
      className="text-xl font-bh-bold text-primary line-through focus-visible:outline-none focus-visible:ring-0"
    >
      BH
    </Link>
  );
}
