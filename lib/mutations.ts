import fetcher from "./fetcher";

export function auth(
  mode: "signin" | "signup",
  body: { email: string; password: string }
) {
  return fetcher(`${mode}`, body);
}
