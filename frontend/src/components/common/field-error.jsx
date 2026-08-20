import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

export function FieldError({ message }) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.p
          initial={{ opacity: 0, y: -4, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.15 }}
          className="flex items-center gap-1 text-xs text-rose-500"
        >
          <AlertCircle className="h-3 w-3 shrink-0" />
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
