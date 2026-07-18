/* COULD — Tweaks island. Drives variations via CSS vars + body classes.
   Loaded after React, ReactDOM, Babel and tweaks-panel.jsx. */

const ACCENTS = {
  yuzu:  { v: "#CCC10B", ink: "#2E3119" },
  coral: { v: "#F39E80", ink: "#2E3119" },
  sky:   { v: "#A7C0E5", ink: "#2E3119" },
};

const PAGE = window.COULD_PAGE || "home";

// Wholesale hero — 5 editorial scenes (GPT Image 2), brand-consistent.
const WHOLESALE_IMAGES = {
  pilates:    { src: "assets/wholesale-v1-pilates.png",    label: "Pilates studio" },
  cafe:       { src: "assets/wholesale-v2-cafe.png",       label: "Caf\u00e9 counter" },
  yoga:       { src: "assets/wholesale-v3-yoga.png",       label: "Yoga room" },
  windowsill: { src: "assets/wholesale-v4-windowsill.png", label: "Windowsill" },
  shelf:      { src: "assets/wholesale-v5-shelf.png",      label: "Studio shelf" },
};
const WHOLESALE_KEYS = Object.keys(WHOLESALE_IMAGES);

const COULD_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "yuzu",
  "motion": true,
  "productVariant": "gallery",
  "wholesaleVariant": "split",
  "wholesaleImage": "pilates"
}/*EDITMODE-END*/;

function applyTweaks(t) {
  const root = document.documentElement;
  const body = document.body;
  const a = ACCENTS[t.accent] || ACCENTS.yuzu;
  root.style.setProperty("--site-accent", a.v);
  root.style.setProperty("--site-accent-ink", a.ink);
  body.classList.toggle("motion-off", !t.motion);
  body.classList.toggle("prod--stacked", PAGE === "product" && t.productVariant === "stacked");
  body.classList.toggle("whole--centered", PAGE === "wholesale" && t.wholesaleVariant === "centered");
  if (PAGE === "wholesale") {
    const img = document.getElementById("whole-hero-img");
    const pick = WHOLESALE_IMAGES[t.wholesaleImage] || WHOLESALE_IMAGES.pilates;
    if (img && img.getAttribute("src") !== pick.src) img.setAttribute("src", pick.src);
  }
}

function CouldTweaks() {
  const [t, setTweak] = useTweaks(COULD_DEFAULTS);
  React.useEffect(() => { applyTweaks(t); }, [t]);

  return (
    <TweaksPanel>
      <TweakSection label="Brand" />
      <TweakColor
        label="Accent"
        value={ACCENTS[t.accent].v}
        options={[ACCENTS.yuzu.v, ACCENTS.coral.v, ACCENTS.sky.v]}
        onChange={(v) => {
          const key = Object.keys(ACCENTS).find((k) => ACCENTS[k].v === v) || "yuzu";
          setTweak("accent", key);
        }}
      />
      <TweakToggle label="Motion" value={t.motion} onChange={(v) => setTweak("motion", v)} />

      {PAGE === "product" && (
        <React.Fragment>
          <TweakSection label="Product layout" />
          <TweakRadio label="Gallery" value={t.productVariant} options={["gallery", "stacked"]} onChange={(v) => setTweak("productVariant", v)} />
        </React.Fragment>
      )}

      {PAGE === "wholesale" && (
        <React.Fragment>
          <TweakSection label="Hero image" />
          <TweakSelect
            label="Scene"
            value={WHOLESALE_IMAGES[t.wholesaleImage] ? t.wholesaleImage : "pilates"}
            options={WHOLESALE_KEYS.map((k) => ({ value: k, label: WHOLESALE_IMAGES[k].label }))}
            onChange={(v) => setTweak("wholesaleImage", v)}
          />
          <TweakSection label="Form layout" />
          <TweakRadio label="Layout" value={t.wholesaleVariant} options={["split", "centered"]} onChange={(v) => setTweak("wholesaleVariant", v)} />
        </React.Fragment>
      )}
    </TweaksPanel>
  );
}

applyTweaks(COULD_DEFAULTS);
ReactDOM.createRoot(document.getElementById("tweaks-root")).render(<CouldTweaks />);
