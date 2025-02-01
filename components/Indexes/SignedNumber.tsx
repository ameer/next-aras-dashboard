import { formatNumber } from "@/utils";

export default function SignedNumber({ change }: { change: number }) {
  return (
    <span className={`mono text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>% {formatNumber(change,2)}</span>
  )
}