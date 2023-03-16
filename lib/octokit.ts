import { Octokit } from "octokit";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  baseUrl: "http://localhost:3000/octokit", // <-- proxy to "https://api.github.com"
});
