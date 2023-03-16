import React, { useContext } from "react";
import { RepoContext } from "@/context/RepoContext";
import styles from "@/styles/Search.module.css";
import Select from "react-select/async";
import { useRouter } from "next/router";

export default function Search(props: any) {
  const router = useRouter();
  const { owner, repo } = router.query;
  const [filter, setFilter] = React.useState("");
  const { repos, params, loading, searchReposDebounce } =
    useContext(RepoContext);

  const toOptionsPromise = (query: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      searchReposDebounce({ ...params, query })
        .then((items: any[]) => {
          const options = items.map(({ full_name }: any) => ({
            label: full_name,
            value: full_name,
          }));
          return resolve(options);
        })
        .catch((e: Error) => reject(e));
    });
  };

  const options = repos
    .map((repo) => ({
      label: repo.full_name,
      value: repo.full_name,
    }))
    .filter(({ value }) => value.indexOf(filter) !== -1);

  return (
    <div className={styles.search} {...(props || {})}>
      <Select
        cacheOptions={true}
        placeholder="Search for repos"
        options={options}
        loadOptions={toOptionsPromise}
        defaultOptions={options}
        defaultValue={
          owner && repo
            ? { value: `${owner}/${repo}`, label: `${owner}/${repo}` }
            : null
        }
        isLoading={loading}
        loadingMessage={() => "loading..."}
        onInputChange={(input) => setFilter(input)}
        onChange={(selected: any) => {
          if (selected?.value)
            router.push(
              `/issues?owner=${selected.value.split("/")[0]}&repo=${
                selected.value.split("/")[1]
              }`
            );
        }}
        isClearable
      />
    </div>
  );
}
