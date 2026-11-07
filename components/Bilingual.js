// A message shown in Khmer first, then English.
export default function Bilingual({ words, style }) {
  return (
    <p style={style}>
      <span lang="km" style={{ display: "block" }}>{words.khmer}</span>
      <span>{words.english}</span>
    </p>
  );
}
