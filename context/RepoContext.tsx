import { octokit } from "@/lib/octokit";
import React, { Context } from "react";

export type RepoContextType = {
  repos: any[];
  setRepos: Function;
  loading: boolean;
  setLoading: Function;
  params: SearchReposParams;
  searchRepos: Function;
};

const defaultContext: RepoContextType = {
  repos: [],
  setRepos: () => {},
  loading: false,
  setLoading: () => {},
  searchRepos: () => {},
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
    q: query || "",
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

  const searchRepos = (params: SearchReposParams) => {
    setSearchReposParams(params);
    sendSearchReposRequest(params).then((r) => {
      setLoading(false);
      setRepos(r?.data?.items);
    });
  };
  return (
    <RepoContext.Provider
      value={{
        repos,
        setRepos,
        params: searchReposParams,
        loading,
        setLoading,
        searchRepos,
      }}
    >
      {props.children}
    </RepoContext.Provider>
  );
};
