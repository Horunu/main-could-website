/* @ds-bundle: {"format":3,"namespace":"CouldDesignSystem_c6ac17","components":[],"sourceHashes":{"ui_kits/marketing-site/app.jsx":"4d713a33cbb8","ui_kits/marketing-site/components.jsx":"f5521eb0be34","ui_kits/marketing-site/sections.jsx":"9c38709c1146"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.CouldDesignSystem_c6ac17 = window.CouldDesignSystem_c6ac17 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// ui_kits/marketing-site/app.jsx
try { (() => {
/* Could marketing site — top-level composition + state. */

const FLAVOURS = [{
  id: "matcha-yuzu",
  name: "Matcha Yuzu",
  tag: "Edition 01",
  price: "£3.20",
  priceVal: 3.20,
  desc: "Lightly carbonated, ceremonial-grade matcha lifted with a soft yuzu citrus. Quietly energising.",
  bg: "#FCFAF0",
  ink: "var(--could-anchor-green)",
  canColor: "var(--could-anchor-green)",
  canFlavour: "Matcha\nYuzu",
  coming: false
}, {
  id: "matcha-jasmine",
  name: "Jasmine Matcha",
  tag: "Edition 02",
  price: "£3.20",
  priceVal: 3.20,
  desc: "A softer afternoon. Jasmine-steeped matcha, low sugar, a touch of pear, gently sparkling.",
  bg: "var(--could-light-blue)",
  ink: "var(--could-dark-green)",
  canColor: "var(--could-pale-blue)",
  canFlavour: "Jasmine\nMatcha",
  coming: false
}, {
  id: "hibiscus-spritz",
  name: "Hibiscus Spritz",
  tag: "Edition 03",
  price: "£3.50",
  priceVal: 3.50,
  desc: "A warm counterpart. Steeped hibiscus, citrus zest, and a whisper of pink pepper. Coming soon.",
  bg: "#F7DBCE",
  ink: "var(--could-dark-green)",
  canColor: "var(--could-coral)",
  canFlavour: "Hibiscus\nSpritz",
  coming: true
}];
function App() {
  const [selected, setSelected] = React.useState("matcha-yuzu");
  const [cart, setCart] = React.useState([]);
  const [cartOpen, setCartOpen] = React.useState(false);
  const addToCart = f => {
    setCart(c => [...c, f]);
    setCartOpen(true);
  };
  const flavourLabel = FLAVOURS.find(f => f.id === selected)?.name || "Matcha Yuzu";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Announce, null), /*#__PURE__*/React.createElement(Nav, {
    cartCount: cart.length,
    onCartClick: () => setCartOpen(true)
  }), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(FourPM, null), /*#__PURE__*/React.createElement(Formula, null), /*#__PURE__*/React.createElement(Flavours, {
    flavours: FLAVOURS,
    selected: selected,
    onSelect: setSelected,
    onAdd: addToCart
  }), /*#__PURE__*/React.createElement(Moments, null), /*#__PURE__*/React.createElement(Quote, null), /*#__PURE__*/React.createElement(ShopStrip, {
    onSubscribe: () => {}
  }), /*#__PURE__*/React.createElement(Footer, null), /*#__PURE__*/React.createElement(CartDrawer, {
    open: cartOpen,
    items: cart,
    onClose: () => setCartOpen(false),
    onClear: () => setCart([])
  }));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/components.jsx
try { (() => {
/* Reusable primitives for the Could marketing site. */

const Icon = ({
  name,
  size = 18,
  stroke = 1.5
}) => {
  const paths = {
    search: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "11",
      cy: "11",
      r: "7"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m21 21-4.3-4.3"
    })),
    bag: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M3 6h18"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M16 10a4 4 0 0 1-8 0"
    })),
    arrow: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
      d: "M5 12h14"
    }), /*#__PURE__*/React.createElement("path", {
      d: "m12 5 7 7-7 7"
    })),
    user: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "8",
      r: "4"
    }), /*#__PURE__*/React.createElement("path", {
      d: "M4 21a8 8 0 0 1 16 0"
    })),
    instagram: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("rect", {
      x: "2",
      y: "2",
      width: "20",
      height: "20",
      rx: "5"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "12",
      cy: "12",
      r: "4"
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "17.5",
      cy: "6.5",
      r: "0.5",
      fill: "currentColor"
    }))
  };
  return /*#__PURE__*/React.createElement("svg", {
    className: "icon",
    viewBox: "0 0 24 24",
    width: size,
    height: size,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, paths[name]);
};
const Eyebrow = ({
  children
}) => /*#__PURE__*/React.createElement("div", {
  className: "eyebrow"
}, children);
const Button = ({
  variant = "primary",
  children,
  onClick,
  type = "button",
  className = ""
}) => /*#__PURE__*/React.createElement("button", {
  type: type,
  onClick: onClick,
  className: `btn btn--${variant} ${className}`
}, children);

/* A stylised can. Background color comes from `color`. */
const Can = ({
  color = "#445521",
  flavour = "Matcha\nYuzu",
  small = false
}) => {
  const ISO = `../../assets/logo/could-isotype-offwhite.svg`;
  const lines = flavour.split("\n");
  return /*#__PURE__*/React.createElement("div", {
    className: "can",
    style: {
      background: color
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "lbl"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: "0.22em",
      opacity: 0.85,
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      textTransform: "uppercase"
    }
  }, "L-Theanine"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: ISO,
    alt: "",
    style: {
      width: 30,
      height: 30,
      opacity: 0.95
    }
  }), /*#__PURE__*/React.createElement("div", null, lines.map((l, i) => /*#__PURE__*/React.createElement("div", {
    key: i
  }, l)))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 9,
      letterSpacing: "0.22em",
      opacity: 0.85,
      fontFamily: "var(--font-mono)",
      fontWeight: 500,
      textTransform: "uppercase"
    }
  }, "250 ml \u212E")));
};
Object.assign(window, {
  Icon,
  Eyebrow,
  Button,
  Can
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/components.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/sections.jsx
try { (() => {
/* Could marketing site — sections. */
/* Aman x Third Space x Erewhon. Antidote to the 4 PM slump. */

const Announce = () => /*#__PURE__*/React.createElement("div", {
  className: "announce"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("span", {
  className: "pin"
}, /*#__PURE__*/React.createElement("span", {
  className: "dot"
}), "Ed. 01 \xB7 Matcha Yuzu Lemonade"), /*#__PURE__*/React.createElement("span", {
  className: "center"
}, "A functional drink \u2014 not an energy drink"), /*#__PURE__*/React.createElement("span", {
  className: "meta"
}, "EN \xB7 GBP")));
const Nav = ({
  cartCount,
  onCartClick
}) => /*#__PURE__*/React.createElement("header", {
  className: "nav"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  className: "brand-mark"
}, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/logo/could-wordmark-anchor.svg",
  className: "word",
  alt: "COULD"
}), /*#__PURE__*/React.createElement("span", {
  className: "brand-tag"
}, "Ed. 01")), /*#__PURE__*/React.createElement("nav", {
  className: "nav-links"
}, /*#__PURE__*/React.createElement("a", {
  href: "#range"
}, "The Range"), /*#__PURE__*/React.createElement("a", {
  href: "#formula"
}, "Formula"), /*#__PURE__*/React.createElement("a", {
  href: "#stockists"
}, "Stockists"), /*#__PURE__*/React.createElement("a", {
  href: "#journal"
}, "Journal")), /*#__PURE__*/React.createElement("div", {
  className: "nav-ctas"
}, /*#__PURE__*/React.createElement("a", {
  href: "#",
  "aria-label": "Search"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "search"
})), /*#__PURE__*/React.createElement("a", {
  href: "#",
  "aria-label": "Account"
}, /*#__PURE__*/React.createElement(Icon, {
  name: "user"
})), /*#__PURE__*/React.createElement("button", {
  className: "cart-pill",
  onClick: onCartClick
}, "Bag ", /*#__PURE__*/React.createElement("span", {
  className: "count"
}, cartCount)))));

/* —— Hero — V1 warmth, new copy, sumi-e brushstrokes —— */
const Hero = () => /*#__PURE__*/React.createElement("section", {
  className: "hero"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "hero-grid"
}, /*#__PURE__*/React.createElement("div", {
  className: "hero-copy"
}, /*#__PURE__*/React.createElement("div", {
  className: "eyebrow"
}, "Edition ", /*#__PURE__*/React.createElement("b", null, "I"), " \xB7 Matcha Yuzu Lemonade"), /*#__PURE__*/React.createElement("h1", {
  className: "hero-h"
}, "The ", /*#__PURE__*/React.createElement("span", {
  className: "brush brush--yuzu"
}, /*#__PURE__*/React.createElement("em", null, "antidote")), /*#__PURE__*/React.createElement("br", null), "to ", /*#__PURE__*/React.createElement("span", {
  className: "thin"
}, "16:00"), "."), /*#__PURE__*/React.createElement("p", {
  className: "hero-p"
}, /*#__PURE__*/React.createElement("b", null, "Functional matcha for the second wind."), " Ceremonial-grade Kagoshima, paired with L-Theanine in a precise 1:2 ratio for ", /*#__PURE__*/React.createElement("span", {
  className: "brush brush--matcha"
}, "sustained, level focus"), " \u2014 without the crash. Lightly sparkling. Not an energy drink. The opposite of one."), /*#__PURE__*/React.createElement("div", {
  className: "hero-stats"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "50", /*#__PURE__*/React.createElement("sub", null, "mg")), /*#__PURE__*/React.createElement("span", null, "Caffeine")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "100", /*#__PURE__*/React.createElement("sub", null, "mg")), /*#__PURE__*/React.createElement("span", null, "L-Theanine")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "17", /*#__PURE__*/React.createElement("sub", null, "kcal")), /*#__PURE__*/React.createElement("span", null, "per 100 ml")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("b", null, "0", /*#__PURE__*/React.createElement("sub", null, "g")), /*#__PURE__*/React.createElement("span", null, "Sugar added"))), /*#__PURE__*/React.createElement("div", {
  className: "hero-cta"
}, /*#__PURE__*/React.createElement(Button, null, "Shop Edition I ", /*#__PURE__*/React.createElement("span", {
  className: "arrow"
}, "\u2192")), /*#__PURE__*/React.createElement("a", {
  className: "hero-link",
  href: "#formula"
}, "How it works ", /*#__PURE__*/React.createElement("span", null, "\u2192"))), /*#__PURE__*/React.createElement("div", {
  className: "hero-meta"
}, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("span", {
  className: "pip"
}), "In stock \xB7 ships Mon"), /*#__PURE__*/React.createElement("span", null, "277 already on the list"))), /*#__PURE__*/React.createElement("div", {
  className: "hero-visual"
}, /*#__PURE__*/React.createElement("div", {
  className: "hero-can-wrap"
}, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/imagery/can-matcha-yuzu.png",
  alt: "COULD Matcha Yuzu Lemonade can"
})), /*#__PURE__*/React.createElement("span", {
  className: "hero-fig-cap"
}, "Fig. 01 \xB7 Ed. I, 250 ml"), /*#__PURE__*/React.createElement("div", {
  className: "hero-note"
}, /*#__PURE__*/React.createElement("span", {
  className: "hero-note-mark"
}, "\u21B3"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", null, "Quietly engineered."), " L-Theanine smooths the caffeine curve \u2014 so you get a long, level afternoon instead of a spike and a crash.")))), /*#__PURE__*/React.createElement("div", {
  className: "hero-wordmark"
}, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/logo/could-wordmark-anchor.svg",
  alt: "COULD"
})), /*#__PURE__*/React.createElement("div", {
  className: "tag-row"
}, /*#__PURE__*/React.createElement("div", {
  className: "left"
}, /*#__PURE__*/React.createElement("span", null, "Possibility"), /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, "\xB7"), /*#__PURE__*/React.createElement("span", null, "is"), /*#__PURE__*/React.createElement("span", {
  className: "dot"
}, "\xB7"), /*#__PURE__*/React.createElement("span", null, "a can")), /*#__PURE__*/React.createElement("div", {
  className: "right"
}, /*#__PURE__*/React.createElement("span", null, "Made in the UK"), /*#__PURE__*/React.createElement("span", null, "Plant-based"), /*#__PURE__*/React.createElement("span", null, "Lightly Sparkling")))));

/* —— The 4 PM moment ———————————————————————————————— */
const FourPM = () => /*#__PURE__*/React.createElement("section", {
  className: "fourpm"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "fourpm-stamps"
}, /*#__PURE__*/React.createElement("span", null, "Chapter ", /*#__PURE__*/React.createElement("b", null, "I"), " \xB7 The Slump, Solved"), /*#__PURE__*/React.createElement("span", null, "16:00 \u2014 The Hour You Usually Lose")), /*#__PURE__*/React.createElement("h2", {
  className: "fourpm-h"
}, "For the hour ", /*#__PURE__*/React.createElement("em", null, "between"), " the meetings ", /*#__PURE__*/React.createElement("span", {
  className: "quiet"
}, "that ran long"), /*#__PURE__*/React.createElement("br", null), "and the run you ", /*#__PURE__*/React.createElement("em", null, "still"), " haven't done."), /*#__PURE__*/React.createElement("div", {
  className: "fourpm-grid"
}, /*#__PURE__*/React.createElement("p", {
  className: "fourpm-lede"
}, /*#__PURE__*/React.createElement("b", null, "You spent \xA34 on caffeine this morning and you're still going to crash at four."), " Could is the small tool for the second half of the day \u2014 the focus block after lunch, the strength session after work, the meeting you actually care about. A drink for the people who aren't done yet."), /*#__PURE__*/React.createElement("ul", {
  className: "fourpm-list"
}, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
  className: "num"
}, "01"), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("b", null, "No crash"), "L-Theanine smooths caffeine release into a long, level plateau. You don't spike, you don't drop."), /*#__PURE__*/React.createElement("span", {
  className: "tick"
}, "\u2014 Plateau")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
  className: "num"
}, "02"), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("b", null, "No jitters"), "50 mg of caffeine \u2014 about half a coffee \u2014 paired 1:2 with L-Theanine. The cleanest stack we could engineer."), /*#__PURE__*/React.createElement("span", {
  className: "tick"
}, "\u2014 Clarity")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("span", {
  className: "num"
}, "03"), /*#__PURE__*/React.createElement("div", {
  className: "body"
}, /*#__PURE__*/React.createElement("b", null, "No lines"), "Ceremonial-grade Kagoshima matcha, ready to drink. No whisk, no barista, no third-wave queue."), /*#__PURE__*/React.createElement("span", {
  className: "tick"
}, "\u2014 Ritual"))))));

/* —— Formula (clinical spec sheet) ———————————————————— */
const Formula = () => /*#__PURE__*/React.createElement("section", {
  className: "formula",
  id: "formula"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "formula-head"
}, /*#__PURE__*/React.createElement("div", {
  className: "left"
}, /*#__PURE__*/React.createElement("span", {
  className: "rule"
}, "The Formula \xB7 \xA702"), /*#__PURE__*/React.createElement("h2", null, "Three ingredients,", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "in the right ratio."))), /*#__PURE__*/React.createElement("div", {
  className: "right"
}, /*#__PURE__*/React.createElement("p", null, "We are not an energy drink. We are a ", /*#__PURE__*/React.createElement("em", null, "functional"), " drink: small, considered, clinically precise. Three things, in a ratio we have spent two years getting right. Nothing else."))), /*#__PURE__*/React.createElement("div", {
  className: "formula-table"
}, /*#__PURE__*/React.createElement("div", {
  className: "formula-row"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "idx"
}, "01")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "name"
}, "L-Theanine", /*#__PURE__*/React.createElement("span", {
  className: "small"
}, "Amino acid \xB7 green-tea native"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "amount"
}, "100", /*#__PURE__*/React.createElement("sub", null, "mg"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "desc"
}, "The amino acid that makes matcha feel different from coffee. Smooths the caffeine curve into a long plateau instead of a spike \u2014 measurable on EEG, felt in the second half of the afternoon.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "tag"
}, "Plateau"))), /*#__PURE__*/React.createElement("div", {
  className: "formula-row is-anchor"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "idx"
}, "02")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "name"
}, "Caffeine", /*#__PURE__*/React.createElement("span", {
  className: "small"
}, "From the leaf \xB7 stone-ground"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "amount"
}, "50", /*#__PURE__*/React.createElement("sub", null, "mg"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "desc"
}, "About half a coffee. Enough to lift the afternoon, not enough to compromise the evening. Sourced from the matcha leaf itself \u2014 no synthetic anhydrous, no guarana.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "tag"
}, "Lift"))), /*#__PURE__*/React.createElement("div", {
  className: "formula-row"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "idx"
}, "03")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "name"
}, "Ceremonial Matcha", /*#__PURE__*/React.createElement("span", {
  className: "small"
}, "Kagoshima \xB7 first harvest 2026"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "amount"
}, "Grade A")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "desc"
}, "Stone-ground from the first harvest of the year, the leaves you cannot get in a sachet. Single-origin Kagoshima. Tastes like the inside of a tea room.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "tag"
}, "Source")))), /*#__PURE__*/React.createElement("div", {
  className: "formula-foot"
}, /*#__PURE__*/React.createElement("span", null, "No taurine. No guarana. No \"proprietary blend\"."), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("em", null, "If it's in the can, it's on the can.")))));

/* —— Flavours / The Range ——————————————————————————— */
const FlavourCard = ({
  flavour,
  selected,
  onSelect,
  onAdd
}) => /*#__PURE__*/React.createElement("div", {
  className: `flav-card ${flavour.coming ? "is-coming" : ""}`,
  onClick: () => onSelect(flavour.id)
}, /*#__PURE__*/React.createElement("div", {
  className: "top"
}, /*#__PURE__*/React.createElement("span", null, flavour.tag), /*#__PURE__*/React.createElement("span", null, flavour.coming ? "Q3 2026" : "In stock")), /*#__PURE__*/React.createElement("div", {
  className: "visual"
}, /*#__PURE__*/React.createElement("div", {
  className: "can",
  style: {
    "--can-bg": flavour.canColor
  }
}, /*#__PURE__*/React.createElement("div", {
  className: "label"
}, /*#__PURE__*/React.createElement("span", {
  className: "word"
}, "COULD"), /*#__PURE__*/React.createElement("span", {
  className: "flav-name"
}, flavour.canFlavour.split("\n").map((l, i) => /*#__PURE__*/React.createElement("span", {
  key: i,
  style: {
    display: 'block'
  }
}, l))), /*#__PURE__*/React.createElement("span", {
  className: "vol"
}, "250 ml \u212E")))), /*#__PURE__*/React.createElement("div", {
  className: "meta"
}, /*#__PURE__*/React.createElement("h4", {
  className: "name"
}, flavour.name), /*#__PURE__*/React.createElement("span", {
  className: "price"
}, flavour.price)), /*#__PURE__*/React.createElement("p", {
  className: "desc"
}, flavour.desc), /*#__PURE__*/React.createElement(Button, {
  variant: flavour.coming ? "secondary" : "primary",
  onClick: e => {
    e.stopPropagation();
    if (!flavour.coming) onAdd(flavour);
  }
}, flavour.coming ? "Notify Me" : "Add to Bag", " ", /*#__PURE__*/React.createElement("span", {
  className: "arrow"
}, "\u2192")));
const Flavours = ({
  flavours,
  selected,
  onSelect,
  onAdd
}) => /*#__PURE__*/React.createElement("section", {
  className: "flav",
  id: "range"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "head"
}, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
  className: "rule"
}, "The Range \xB7 \xA703"), /*#__PURE__*/React.createElement("h3", null, "Three editions.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "One precise ratio."))), /*#__PURE__*/React.createElement("span", {
  className: "micro micro--muted"
}, "Shipped Mon\u2013Wed \xB7 UK, free over \xA324")), /*#__PURE__*/React.createElement("div", {
  className: "flav-grid"
}, flavours.map(f => /*#__PURE__*/React.createElement(FlavourCard, {
  key: f.id,
  flavour: f,
  selected: selected === f.id,
  onSelect: onSelect,
  onAdd: onAdd
})))));

/* —— Moments ——————————————————————————————————— */
const MOMENTS = [{
  name: "Morning Ritual",
  file: "morning-ritual",
  cap: "07:00 · before the inbox"
}, {
  name: "Me-time Pause",
  file: "me-time-pause",
  cap: "11:00 · the room alone"
}, {
  name: "Active Flow",
  file: "active-flow",
  cap: "12:30 · the Z2 zone"
}, {
  name: "Mindful Balance",
  file: "mindful-balance",
  cap: "16:00 · the slump"
}, {
  name: "On the Move",
  file: "on-the-move",
  cap: "15:30 · the commute"
}, {
  name: "Picnic",
  file: "picnic",
  cap: "17:00 · the park"
}, {
  name: "Elegant Table",
  file: "elegant-table",
  cap: "19:00 · the friends"
}, {
  name: "Post-workout",
  file: "post-workout-refresh",
  cap: "20:00 · the recovery"
}];
const Moments = () => /*#__PURE__*/React.createElement("section", {
  className: "moments"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "head"
}, /*#__PURE__*/React.createElement("span", {
  className: "rule rule--center"
}, "Eight Hours \xB7 \xA704"), /*#__PURE__*/React.createElement("h3", null, "Whenever the day asks ", /*#__PURE__*/React.createElement("em", null, "more of you"), "."), /*#__PURE__*/React.createElement("p", null, "From the first quiet hour of the morning to the long way round home \u2014 eight observed moments where the can does its quiet work.")), /*#__PURE__*/React.createElement("div", {
  className: "moments-grid"
}, MOMENTS.map(m => /*#__PURE__*/React.createElement("div", {
  className: "moment-tile",
  key: m.file
}, /*#__PURE__*/React.createElement("img", {
  src: `../../assets/illustrations/${m.file}.svg`,
  alt: m.name
}), /*#__PURE__*/React.createElement("div", {
  className: "moment-meta"
}, /*#__PURE__*/React.createElement("span", {
  className: "name"
}, m.name), /*#__PURE__*/React.createElement("span", {
  className: "cap"
}, m.cap)))))));

/* —— Press / Quote ———————————————————————————————— */
const Quote = () => /*#__PURE__*/React.createElement("section", {
  className: "quote-block",
  id: "journal"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("span", {
  className: "rule"
}, "Press \xB7 \xA705"), /*#__PURE__*/React.createElement("blockquote", null, "Calm, collected, quietly ", /*#__PURE__*/React.createElement("em", null, "sparkling"), " \u2014 a can that tastes like time to yourself."), /*#__PURE__*/React.createElement("cite", null, "Folk Magazine \xB7 Issue Four"), /*#__PURE__*/React.createElement("div", {
  className: "quote-marg"
}, /*#__PURE__*/React.createElement("div", {
  className: "quote-marg-item"
}, /*#__PURE__*/React.createElement("span", {
  className: "quote-marg-h"
}, "\"The 1:2 caffeine to L-Theanine ratio is exactly what I'd formulate if I were starting from scratch.\""), /*#__PURE__*/React.createElement("span", {
  className: "quote-marg-c"
}, "\u2014 Dr. R. Patel \xB7 Nutritional Biochemist")), /*#__PURE__*/React.createElement("div", {
  className: "quote-marg-item"
}, /*#__PURE__*/React.createElement("span", {
  className: "quote-marg-h"
}, "\"This is the second coffee I never have anymore. It just doesn't make sense after Could.\""), /*#__PURE__*/React.createElement("span", {
  className: "quote-marg-c"
}, "\u2014 Alex M. \xB7 Strategy Lead, London")))));

/* —— Stockists / newsletter ————————————————————————— */
const ShopStrip = ({
  onSubscribe
}) => {
  const [email, setEmail] = React.useState("");
  const [done, setDone] = React.useState(false);
  return /*#__PURE__*/React.createElement("section", {
    className: "shop-strip",
    id: "stockists"
  }, /*#__PURE__*/React.createElement("div", {
    className: "container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "photo",
    style: {
      backgroundImage: `url(../../assets/imagery/leaf-macro.jpg)`
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "photo-cap"
  }, "Fig. 02 \xB7 The leaf, before the grind")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }, "Slow Letters \xB7 \xA706"), /*#__PURE__*/React.createElement("h3", null, "Once a month.", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", null, "Never more.")), /*#__PURE__*/React.createElement("p", null, "Quiet news from the brewery, new flavours before they launch, and the occasional invitation to something we are hosting in person. The opposite of a newsletter."), /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      if (email) {
        setDone(true);
        onSubscribe(email);
      }
    }
  }, /*#__PURE__*/React.createElement("input", {
    placeholder: "the email you actually read",
    value: email,
    onChange: e => setEmail(e.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, done ? "Subscribed ✓" : "Subscribe →")), /*#__PURE__*/React.createElement("span", {
    className: "shop-fine"
  }, "No tracking pixels. No drip sequences.")))));
};

/* —— Footer ——————————————————————————————————— */
const Footer = () => /*#__PURE__*/React.createElement("footer", {
  className: "foot"
}, /*#__PURE__*/React.createElement("div", {
  className: "container"
}, /*#__PURE__*/React.createElement("div", {
  className: "brand"
}, /*#__PURE__*/React.createElement("img", {
  src: "../../assets/logo/could-wordmark-offwhite.svg",
  alt: "COULD"
}), /*#__PURE__*/React.createElement("p", null, "Functional matcha, made in small batches in the UK. The antidote to the 4 PM slump. ", /*#__PURE__*/React.createElement("em", null, "Possibility is a can.")), /*#__PURE__*/React.createElement("div", {
  className: "brand-stamp"
}, /*#__PURE__*/React.createElement("span", {
  className: "brand-stamp-dot"
}), /*#__PURE__*/React.createElement("span", null, "Ed. I \xB7 No. 0127 / 1200"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Shop"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "The Range")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Subscribe")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Stockists")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Gift Cards")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Brand"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Our Story")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "The Journal")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Sustainability")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Press")))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h4", null, "Support"), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Contact")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Delivery")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "FAQ")), /*#__PURE__*/React.createElement("li", null, /*#__PURE__*/React.createElement("a", null, "Trade Enquiries")))), /*#__PURE__*/React.createElement("div", {
  className: "fine"
}, /*#__PURE__*/React.createElement("span", null, "\xA9 MMXXVI Matched Drinks Ltd \xB7 Covent Garden, London"), /*#__PURE__*/React.createElement("span", null, "Possibility is a can"))));

/* —— Cart drawer (kept) —— */
const CartDrawer = ({
  open,
  items,
  onClose,
  onClear
}) => {
  if (!open) return null;
  const total = items.reduce((s, i) => s + i.priceVal, 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "fixed",
      inset: 0,
      background: "rgba(15,18,8,0.55)",
      zIndex: 50
    },
    onClick: onClose
  }), /*#__PURE__*/React.createElement("aside", {
    style: {
      position: "fixed",
      right: 0,
      top: 0,
      bottom: 0,
      width: 380,
      background: "var(--paper)",
      zIndex: 51,
      padding: 28,
      display: "flex",
      flexDirection: "column",
      gap: 20,
      boxShadow: "0 12px 28px rgba(15,18,8,0.28)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "rule"
  }, "Your Bag \xB7 ", items.length), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      background: "transparent",
      border: 0,
      fontSize: 22,
      lineHeight: 1,
      color: "var(--ink)"
    }
  }, "\xD7")), items.length === 0 ? /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      color: "var(--ink-muted)"
    }
  }, "Your bag is quiet. Add a can to begin.") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14,
      flex: 1,
      overflow: "auto"
    }
  }, items.map((it, idx) => /*#__PURE__*/React.createElement("div", {
    key: idx,
    style: {
      display: "grid",
      gridTemplateColumns: "44px 1fr auto",
      gap: 14,
      alignItems: "center",
      paddingBottom: 14,
      borderBottom: "1px solid var(--rule)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 64,
      background: it.canColor
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-display)",
      fontWeight: 500,
      textTransform: "uppercase",
      fontSize: 14,
      letterSpacing: "-0.005em"
    }
  }, it.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      color: "var(--ink-muted)"
    }
  }, it.tag, " \xB7 250 ml")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--font-mono)",
      fontWeight: 600,
      fontSize: 12
    }
  }, it.price)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      fontFamily: "var(--font-mono)",
      fontSize: 12,
      fontWeight: 600
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      letterSpacing: "0.32em",
      textTransform: "uppercase"
    }
  }, "Subtotal"), /*#__PURE__*/React.createElement("span", null, "\xA3", total.toFixed(2))), /*#__PURE__*/React.createElement(Button, null, "Checkout \u2014 \xA3", total.toFixed(2), " ", /*#__PURE__*/React.createElement("span", {
    className: "arrow"
  }, "\u2192")), /*#__PURE__*/React.createElement("button", {
    onClick: onClear,
    style: {
      background: "transparent",
      border: 0,
      fontFamily: "var(--font-mono)",
      fontSize: 10,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: "var(--ink-muted)"
    }
  }, "Empty bag"))));
};
Object.assign(window, {
  Announce,
  Nav,
  Hero,
  FourPM,
  Formula,
  Flavours,
  Moments,
  Quote,
  ShopStrip,
  Footer,
  CartDrawer
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/sections.jsx", error: String((e && e.message) || e) }); }

})();
