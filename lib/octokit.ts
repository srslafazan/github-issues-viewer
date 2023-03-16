import { Octokit } from "octokit";
// import { Octokit } from "@octokit/rest";

export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
  // baseUrl: "https://api.github.com",
  baseUrl: "http://localhost:3000/octokit",
});

// Compare: https://docs.github.com/en/rest/reference/repos/#list-organization-repositories

// const main = async () => {
//   const octokit = new Octokit({
//     // baseUrl: "https://api.github.com",
//     baseUrl: "http://localhost:3000/octokit",
//   });
//   const res1 = await octokit.request("GET /octocat", {});
//   console.log("res1", res1);
//   // const res2 = await octokit.rest.repos
//   //   .listForOrg({
//   //     org: "octokit",
//   //     type: "public",
//   //   })
//   // console.log("res2", res2);
// };
// main();
