const SYS = "You are Dear, a warm, gentle companion inside a body-neutral wellbeing app for girls and young women, including some who struggle with eating disorders. Reply in the user's language, default English. Keep replies short (2-4 sentences), kind, never preachy. Validate feelings, suggest tiny calming steps (breathing, grounding, talking to someone trusted). NEVER mention or give calories, weights, numbers about the body, diets, exercise targets, or food rules, and never praise or criticize appearance. If asked for those, kindly decline and redirect to feelings. You are not a therapist. SAFETY RULE: if the user hints at not wanting to live, hopelessness, self-harm, being hurt or abused, or feeling unsafe, even indirectly, do not continue normal chat. Respond with care in 2-3 sentences, say you are glad they told you, and clearly encourage them to contact a trusted person now and to call 112 if in danger, or 111 or 150 (free, Kazakhstan). Never give methods, never minimize, never promise to keep secrets. Otherwise ask at most one gentle question.";

const CRISIS = /суицид|самоубий|покончить с собой|кончить с собой|убить себя|не хочу жить|жить не хочу|не хочу больше жить|не хочется жить|надоело жить|хочу умереть|хочу исчезнуть|лучше бы меня не было|навредить себе|порезать себя|suicid|kill myself|end my life|end it all|want to die|wanna die|don'?t want to live|do not want to live|don'?t want to be alive|no reason to live|wish i (was|were) dead|better off dead|want to disappear|self[- ]?harm|hurt myself|cut myself/i;
const SOFT = /безнадёж|безнадеж|нет смысла|не вижу смысла|не могу больше|не вывожу|hopeless|no point|can'?t go on|can'?t do this anymore|give up on (life|everything)/i;
const CRISIS_REPLY = "I’m really glad you told me, and I’m taking it seriously. You deserve support from a real person right now. If you are in danger, please call 112. You can also call 111 or 150 (free, in Kazakhstan), or tell someone you trust who is near you. I’m here with you too. Can you reach one of them now? / Я рада, что ты об этом сказала. Тебе нужна поддержка живого человека прямо сейчас. Если ты в опасности, позвони 112. Также можно позвонить 111 или 150 либо рассказать близкому человеку рядом. Ты не одна.";
const SOFT_NOTE = "\n\nIf it gets too heavy, you can call 111 or 150 (free), or 112 in an emergency. You don’t have to carry this alone. / Если станет слишком тяжело, можно позвонить 111 или 150 (бесплатно), а в опасности 112. Ты не обязана справляться одна.";

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/api/chat" && request.method === "POST") {
      return chat(request, env, url);
    }
    if (url.pathname === "/" || url.pathname === "/index.html") {
      const res = await env.ASSETS.fetch(request);
      return new HTMLRewriter()
        .on("body", { element(e) { e.append('<script src="/extras.js"></script>', { html: true }); } })
        .transform(res);
    }
    return env.ASSETS.fetch(request);
  },
};

async function chat(request, env, url) {
  const origin = request.headers.get("Origin") || "";
  if (origin && origin !== url.origin) return new Response("Forbidden", { status: 403 });
  let body;
  try { body = await request.json(); } catch { return new Response("Bad request", { status: 400 }); }
  const msgs = (body.messages || []).slice(-10).map(m => ({
    role: m.role === "assistant" ? "assistant" : "user",
    content: String(m.content || "").slice(0, 500),
  }));
  while (msgs.length && msgs[0].role !== "user") msgs.shift();
  if (!msgs.length) return new Response("Bad request", { status: 400 });
  const json = t => new Response(JSON.stringify({ text: t }), { headers: { "Content-Type": "application/json" } });
  const last = msgs[msgs.length - 1].content;
  if (CRISIS.test(last)) return json(CRISIS_REPLY);
  try {
    const r = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", {
      messages: [{ role: "system", content: SYS }, ...msgs],
      max_tokens: 250,
    });
    let text = (r.response || "").trim() || "I’m here with you.";
    if (SOFT.test(last)) text += SOFT_NOTE;
    return json(text);
  } catch (e) {
    return new Response("AI error", { status: 502 });
  }
}
