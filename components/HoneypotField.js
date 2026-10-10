// Hidden decoy input for the MoneyAid Ops leads API's bot filter. Real
// visitors never see or fill it; a bot that fills every input will, and the
// server then returns a success-looking response without saving anything.
export default function HoneypotField({ value, onChange }) {
  return (
    <input
      type="text"
      name="website"
      value={value}
      onChange={onChange}
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}
    />
  );
}
