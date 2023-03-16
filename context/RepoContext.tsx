import { octokit } from "@/lib/octokit";
import React, { Context } from "react";
import { debounce } from "lodash";

export type RepoContextType = {
  repos: any[];
  setRepos: Function;
  loading: boolean;
  setLoading: Function;
  params: SearchReposParams;
  searchRepos: Function;
  searchReposDebounce: Function;
};

const defaultContext: RepoContextType = {
  repos: [],
  setRepos: () => {},
  loading: false,
  setLoading: () => {},
  searchRepos: () => {},
  searchReposDebounce: () => {},
  params: {
    query: "",
    page: 1,
    per_page: 25,
  },
};

export const RepoContext: Context<RepoContextType> =
  React.createContext(defaultContext);

export type SearchReposParams = {
  query?: string;
  page?: number;
  per_page?: number;
};

export const sendSearchReposRequest = async ({
  query,
  page,
  per_page,
  ...rest
}: SearchReposParams): Promise<any> => {
  return octokit.rest.search.repos({
    q: query || "org:presencelearning",
    page,
    per_page,
    headers: {
      "x-github-api-version": "2022-11-28",
    },
    ...rest,
  });
};

export const RepoSearchProvider = (props: any) => {
  const [searchReposParams, setSearchReposParams]: [
    SearchReposParams,
    Function
  ] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [repos, setRepos] = React.useState([]);

  const searchRepos = async (params: SearchReposParams) => {
    return new Promise((resolve, _reject) => {
      setSearchReposParams(params);
      sendSearchReposRequest(params)
        .then((r) => {
          setRepos(r?.data?.items);
          resolve(r?.data?.items);
        })
        .catch((e) => {
          console.error(e);
          resolve([]);
        })
        .finally(() => setLoading(false));
    });
  };

  const searchReposDebounce = React.useCallback(
    debounce(searchRepos, 500, { leading: false, trailing: true }),
    []
  );
  return (
    <RepoContext.Provider
      value={{
        repos,
        setRepos,
        params: searchReposParams,
        loading,
        setLoading,
        searchRepos,
        searchReposDebounce,
      }}
    >
      {props.children}
    </RepoContext.Provider>
  );
};
