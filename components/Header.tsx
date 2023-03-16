import Image from "next/image";
import { useRouter } from "next/router";

import Search from "./Search";

export const Header = () => {
  const router = useRouter();
  return (
    <header style={{ padding: "10px 20px" }}>
      <div
        style={{
          color: "#ff5a60",
          margin: "0 0 20px 0",
        }}
      >
        <div
          onClick={() => router.push("/")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
        >
          <Image
            src="https://presencelearning.com/wp-content/themes/presence/favicons/favicon.svg"
            alt="logo"
            width="30"
            height="30"
            data-test-id="header-logo"
          />
          <h1 style={{ margin: "0 0 0 10px" }} data-test-id="header-title">
            Presence Learning
          </h1>
        </div>
        <div
          data-test-id="header-subtitle"
          style={{
            color: "black",
            margin: "5px 0 20px 41px",
            fontWeight: "500",
          }}
        >
          GitHub Issue Viewer
        </div>
      </div>
      <Search data-test-id="header-search" />
    </header>
  );
};
