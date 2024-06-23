import { Dashboard } from "@/components/dashboard/dashboard";
import { createFileRoute } from "@tanstack/react-router";

const sleep = (ms: number, data: unknown = undefined): Promise<unknown> =>
  // eslint-disable-next-line no-promise-executor-return
  new Promise(resolve => setTimeout(() => resolve(data), ms));

const loader = async () => {
  await sleep(100);

  return new Promise(resolve => resolve({ id: "Q" })) as Promise<{
    id: string;
  }>;
};

export const Route = createFileRoute("/_auth/dashboard/")({
  component: Dashboard,
  loader,
  notFoundComponent: () => (
    <div>user with that specific id could not be found</div>
  ),
  pendingComponent: () => <div>Loading...</div>,

  // loaderDeps: ({ search: { userId } }) => ({ userId }),
  // onEnter(match) {},
  // onError(err) {},
  // onLeave(match) {
  //   throw new Error("Something went wrong");
  // },
  // beforeLoad(opts) {},
});
