import { RequestInit } from "node-fetch";

export type Fetch = (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>;