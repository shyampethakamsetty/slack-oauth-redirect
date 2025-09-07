export default async function handler(req, res) {
  const { code, state, error } = req.query;

  const target = new URL("http://localhost:8000/integrations/slack/oauth2callback");

  if (error) target.searchParams.set("error", error);
  if (code) target.searchParams.set("code", code);
  if (state) target.searchParams.set("state", state);

  return res.redirect(target.toString());
} 