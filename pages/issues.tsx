import React, { useContext } from "react";
import { useRouter } from "next/router";

import { IssueContext } from "@/context/IssueContext";

import styles from "@/styles/Issues.module.css";

export default function Issues() {
  const router = useRouter();
  const { owner, repo, page, per_page } = router.query;
  const { issues, loading, fetchIssues, params } = useContext(IssueContext);

  React.useEffect(() => {
    if (owner && repo) {
      fetchIssues({
        ...params,
        owner,
        repo,
        page: page || 1,
        per_page: per_page || 25,
        state: "all",
      });
    }
  }, [owner, repo, page, per_page]);

  return (
    <main>
      <button onClick={() => router.back()}>&lt;</button>
      <h2>Issues</h2>
      <div>
        {loading && <span>loading...</span>}
        {issues.length === 0 && !loading && <span>no issues</span>}
        {!loading && owner && repo && (
          <ul>
            {issues.map((issue) => (
              <li
                key={issue.id}
                className={styles.issue}
                onClick={() =>
                  router.push(
                    `/issues/${issue.id}?owner=${owner}&repo=${repo}&number=${issue.number}`
                  )
                }
              >
                {issue.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
