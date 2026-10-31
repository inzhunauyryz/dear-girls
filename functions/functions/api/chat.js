// Cloudflare Pages Function: free built-in AI (binding name: AI)
const SYS = "You are Dear, a warm, gentle companion inside a body-neutral wellbeing app for girls and young women, including some who struggle with eating disorders. Reply in the user's language, default English. Keep replies short (2-4 sentences), kind, never preachy. Validate feelings, suggest tiny calming steps (breathing, grounding, talking to someone trusted). NEVER mention or give calories, weights, numbers about the body, diets, exercise targets, or food rules, and never praise or criticize appearance. If asked for those, kindly decline and redirect to feelings. You are not a therapist. Ask at most one gentle question.";

const CRISIS = /суицид|самоубий|покончить с собой|убить себя|не хочу жить|хочу умереть|навредить себе|порезать себя|suicid|kill myself|end my life|want to die|self[- ]?harm|hurt myself/i;
const CRISIS_REPLY = "I’m really glad you told me, and I’m taking it seriously. You deserve support from a real person right now. If you are in danger, please call 112. You can also call 111 or 150 (free, in Kazakhstan), or tell someone you trust who is near you. I’m here with you too. Can you reach one of them now? / Я рада, что ты об этом сказала. Тебе нужна поддержка живого человека прямо сейчас. Если ты в опасности, позвони 112. Также можно позвонить 111 или 150 либо рассказать близкому человеку рядом. Ты не одна.";

export async function onRequestPost({ request, env }) {
  const origin = request.headers.get("Origin") || "";
  if (origin && origin !== new URL(request.url).origin)
    return new Response("Forbidden", { status: 403 });
  let body;
  try { body = await request.json(); } catch { return new Response("Bad request", { status: 400 }); }
  const msgs = (body.messages || []).slice(-10).map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 500),
  }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length) return new Response("Bad request", { status: 400 });
  const json = t => new Response(JSON.stringify({ text: t }), { headers: { "Content-Type": "application/json" } });
  if (CRISIS.test(msgs[msgs.length - 1].content)) return json(CRISIS_REPLY);
  try {
    const r = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [{ role: "system", content: SYS }, ...msgs],
      max_tokens: 250,
    });
    return json((r.response || "").trim() || "I’m here with you.");
  } catch (e) {
    return new Response("AI error", { status: 502 });
  }
}
