# Presence GitHub Issues Viewer

## Requirements

- Create a GitHub issue viewer
- It must have both a frontend and backend component
- The backend shall act as a proxy on behalf of the frontend
- The frontend shall act as the presentation layer

## Approach

- Use a well-supported library (octokit) to form GitHub API requests
- Proxy the destination from this library through my backend
- Use an io-performant backend (NodeJS) for proxies
- Use standard React state management to fetch
- Push request formatting logic to the frontend to allow maximum utility, reduce logic duplciation and re-work, etc.

## Improvements

- Better search querying for repos
- Load-more functionality
- Expand Tests (unit)
- Route guards to handle issues such as rate-limiting
- Reduce bundle size
- Clean up inline styles
- Improve edge-cases and user experience around search component & debounce, etc
- UX improvements

## Setup

```bash
pnpm install
```

Create a `.env` file with a GitHub access token.

```bash
GITHUB_TOKEN="ghp_vfd1PgiAiD___________________"
```

NextJS automatically loads this environment file.

## Start (dev)

```bash
pnpm dev
```

## Build

```bash
pnpm build
```

## Start

```bash
pnpm start
```

## Test

Tests will run with Cypress.

```bash
pnpm test
```

```bash
pnpmp test:ci
```
