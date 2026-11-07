import Glass from "./wc/Glass.js";
import SugarCakes from "./wc/SugarCakes.js";
import ClayJar from "./wc/ClayJar.js";
import PalmTree from "./wc/PalmTree.js";
import UseCard from "./UseCard.js";

// Each card shows /public/images/<file> if it exists, otherwise a watercolor drawing.
const uses = [
  { file: "drink.jpg", Art: Glass, en: "A drink", km: "ភេសជ្ជៈ", text: "Fresh sap, chilled, sold by the roadside.", more: "Fresh sap is collected at dawn and sold chilled at roadside stalls around Siem Reap. It is also mixed into iced tea, smoothies and coconut-milk drinks." },
  { file: "sugar.jpg", Art: SugarCakes, en: "A sugar", km: "ស្ករត្នោត", text: "Boiled down into golden palm sugar.", more: "The sap is boiled for hours in big pans over a wood fire until it turns thick and golden, then poured into small palm-leaf rings to set into palm sugar." },
  { file: "ferment.jpg", Art: ClayJar, en: "A ferment", km: "ស្រា និង ខ្មេះ", text: "Left to turn into wine and vinegar.", more: "Left for a day, the sap ferments into mild palm wine (sraa tnaot). Left longer, it turns sour and becomes palm vinegar for cooking and drinks." },
  { file: "tradition.jpg", Art: PalmTree, en: "A tradition", km: "ប្រពៃណី", text: "Climbed for, tapped, and passed down.", more: "Tappers climb tall sugar palms every morning to collect sap in bamboo tubes. The skill is passed down from parents to children in villages in Kampong Speu and Siem Reap." },
];

const wrap = { padding: "8px 0 56px" };

export default function UsesStrip() {
  return (
    <section className="uses-grid" style={wrap} aria-label="Uses of palm juice">
      {uses.map((use) => (
        <UseCard key={use.en} item={use} />
      ))}
    </section>
  );
}
