// --- ConditionSlider.jsx (you can inline it in the PDP file or create a separate file)
import { motion } from "framer-motion";

const SCALE = [
  { key: "New with tags", score: 100, blurb: "Brand new; tags attached." },
  { key: "Like new",      score: 95,  blurb: "Looks unworn; minimal handling." },
  { key: "Excellent",     score: 90,  blurb: "Barely used; no visible wear." },
  { key: "Very good",     score: 80,  blurb: "Light wear; well cared for." },
  { key: "Good",          score: 70,  blurb: "Moderate wear; still beautiful." },
  { key: "Fair",          score: 60,  blurb: "Noticeable wear; priced accordingly." },
];

function resolveCondition(conditionText = "") {
  const normalized = conditionText.trim().toLowerCase();
  const hit =
    SCALE.find((c) => c.key.toLowerCase() === normalized) ||
    // fuzzy includes fallback
    SCALE.find((c) => normalized.includes(c.key.toLowerCase()));
  return hit || { key: conditionText || "Unspecified", score: 75, blurb: "Condition not fully specified." };
}

export default function ConditionSlider({ conditionText }) {
  const { key, score, blurb } = resolveCondition(conditionText);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-900">Condition</p>
        <span className="text-xs text-neutral-600">{key}</span>
      </div>

      {/* Slider (read-only) */}
      <div
        className="relative mt-2 h-2 w-full rounded-full bg-neutral-200/70"
        role="slider"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={score}
        aria-label="Condition"
        aria-readonly="true"
      >
        {/* Fill */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute left-0 top-0 h-2 rounded-full bg-neutral-900"
        />
        {/* Thumb */}
        <motion.div
          initial={{ left: 0 }}
          animate={{ left: `calc(${score}% - 8px)` }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="absolute top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-neutral-900 shadow ring-2 ring-white"
        />
      </div>

      {/* Scale labels */}
      <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wide text-neutral-500">
        <span>Fair</span>
        <span>Good</span>
        <span>Very Good</span>
        <span>Excellent</span>
        <span>Like New</span>
        <span>New</span>
      </div>

      {/* Blurb */}
      <p className="mt-2 text-xs text-neutral-600">{blurb}</p>
    </div>
  );
}
