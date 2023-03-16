import { octokit } from "@/lib/octokit";
import React, { Context } from "react";

export type IssueContextType = {
  issues: any[];
  setIssues: Function;
  loading: boolean;
  setLoading: Function;
  params: FetchIssuesParams;
  fetchIssues: Function;
};

const defaultContext: IssueContextType = {
  issues: [],
  setIssues: () => {},
  loading: false,
  setLoading: () => {},
  fetchIssues: () => {},
  params: {
    owner: "",
    repo: "",
    page: 1,
    per_page: 25,
  },
};

export const IssueContext: Context<IssueContextType> =
  React.createContext(defaultContext);

export type FetchIssuesParams = {
  owner?: string;
  repo?: string;
  page?: number;
  per_page?: number;
};

export const sendFetchIssuesRequest = async ({
  owner,
  repo,
  page,
  per_page,
  ...rest
}: FetchIssuesParams): Promise<any> => {
  console.log("request for repo", owner, repo, page, per_page, rest);
  return octokit.rest.issues.listForRepo({
    owner: owner || "tensorflow",
    repo: repo || "tensorflow",
    page,
    per_page,
    headers: {
      "x-github-api-version": "2022-11-28",
    },
    ...rest,
  });
};

export const IssueProvider = (props: any) => {
  const [fetchIssuesParams, setFetchIssuesParams]: [
    FetchIssuesParams,
    Function
  ] = React.useState({});
  const [loading, setLoading] = React.useState(false);
  const [issues, setIssues] = React.useState([]);

  const fetchIssues = (params: FetchIssuesParams) => {
    setFetchIssuesParams(params);
    sendFetchIssuesRequest(params)
      .then((r) => {
        setIssues(r?.data);
      })
      .catch((e) => {
        console.error(e);
        setIssues([]);
      })
      .finally(() => setLoading(false));
  };
  return (
    <IssueContext.Provider
      value={{
        issues,
        setIssues,
        params: fetchIssuesParams,
        loading,
        setLoading,
        fetchIssues,
      }}
    >
      {props.children}
    </IssueContext.Provider>
  );
};
