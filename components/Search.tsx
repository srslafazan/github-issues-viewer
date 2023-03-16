import React, { useContext } from "react";
import { debounce } from "lodash";

import { RepoContext } from "@/context/RepoContext";

export default function Search() {
  const { repos, searchRepos, params, loading } = useContext(RepoContext);

  const setSearchInputTextDebounce = debounce(
    (query) => searchRepos({ ...params, query }),
    500,
    {
      leading: false,
    }
  );

  return (
    <>
      <input
        type="text"
        onChange={(e) => setSearchInputTextDebounce(e.target.value)}
        placeholder="Search for repos"
      />
      <div>
        <div>{loading && <span>loading...</span>}</div>
        <div>
          {!loading &&
            repos.map((repo: any) => (
              <div key={repo.id} title={repo.id}>
                {repo.full_name}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
