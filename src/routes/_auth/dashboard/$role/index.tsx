import { useAbilityContext } from "@/lib/access";
import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "antd";

export const Route = createFileRoute("/_auth/dashboard/$role/")({
  component: function C() {
    const params = Route.useParams();
    const v = useAbilityContext();

    return (
      <div>
        Hello /dashboard/{params.role}/!
        {v.can("read", "Comment") ? "can read comments" : "cant read comments"}
        <Button
          onClick={() => {
            if (v.can("read", "Comment")) {
              v.update([]);
            } else {
              v.update([{ action: "read", subject: "Comment" }]);
            }
          }}
        >
          Revoke permission
        </Button>
        <Link
          to="/dashboard/$role/comments"
          params={p => ({ ...p, role: p.role as string })}
        >
          to comments
        </Link>
      </div>
    );
  },
  beforeLoad(opts) {},
});
