import { Link } from "react-router-dom";

interface Props {
  to: string;
  message: string;
  where: string;
}

export default function AuthNavigator({ to, message, where }: Props) {
  return (
    <div className="py-4 text-sm font-semibold flex justify-center">
      <div>{message}</div>
      <Link className="pointer pl-1 cursor-pointer" to={to}>
        {where}
      </Link>
    </div>
  );
}
