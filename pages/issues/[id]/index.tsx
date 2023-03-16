import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { octokit } from "@/lib/octokit";

export default function Issue() {
  const router = useRouter();
  const { id, owner, repo, number } = router.query;
  console.log(router);
  console.log(router.query);
  const [issue, setIssue] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (owner && repo && number) {
      setLoading(true);
      octokit.rest.issues
        .get({
          owner: owner as string,
          repo: repo as string,
          issue_number: parseInt(number as string),
        })
        .then((r: any) => {
          console.log("r", r);
          setIssue(r?.data);
        })
        .catch((e) => console.error(e))
        .finally(() => setLoading(false));
    }
  }, [owner, repo, number]);

  return (
    <main>
      <button onClick={() => router.back()}>&lt;</button>
      <h2>Issue #{number}</h2>
      <div>
        {loading && "loading..."}
        {issue && <pre>{JSON.stringify(issue, null, 2)}</pre>}
        {!loading && !issue && "no issue"}
      </div>
    </main>
  );
}
