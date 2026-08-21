export default function LogoIcon({ variant = "default", size = 48, className = "" }) {
  const isInverted = variant === "inverted";
  const bg = isInverted ? "#00D29F" : "#121833";
  const lobe = isInverted ? "#121833" : "#00D29F";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="GeniusMoneyDaily"
    >
      <rect width="48" height="48" rx="12" fill={bg} />
      <path d="M22 15C17.5817 15 14 18.5817 14 23C14 26.5 16.2 29.5 19.3 30.5L20 33H22V15Z" fill={lobe} />
      <path
        d="M26 15C30.4183 15 34 18.5817 34 23C34 26.5 31.8 29.5 28.7 30.5L28 33H26V15Z"
        fill={lobe}
        fillOpacity="0.8"
      />
    </svg>
  );
}
