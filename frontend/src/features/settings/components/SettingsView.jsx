import { useState } from "react";
import { motion } from "framer-motion";
import { Sun, Moon, Monitor, Globe, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/lib/theme-provider";
import { cn } from "@/utils";

const languages = [
  "English (US)",
  "Spanish",
  "French",
  "German",
  "Hindi",
  "Portuguese",
];

const notificationSettings = [
  {
    key: "interview-reminders",
    label: "Interview reminders",
    description: "Get notified before a scheduled mock interview.",
  },
  {
    key: "weekly-summary",
    label: "Weekly progress summary",
    description: "A recap of your score trends every Monday.",
  },
  {
    key: "product-updates",
    label: "Product updates",
    description: "New features and improvements to HireSense AI.",
  },
  {
    key: "marketing",
    label: "Tips & marketing emails",
    description: "Interview prep tips and occasional offers.",
  },
];

const privacySettings = [
  {
    key: "share-analytics",
    label: "Share anonymized analytics",
    description: "Help us improve scoring accuracy across roles.",
  },
  {
    key: "public-profile",
    label: "Public candidate profile",
    description: "Let recruiters using HireSense discover your profile.",
  },
];

export function SettingsView() {
  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState(languages[0]);
  const [notifications, setNotifications] = useState({
    "interview-reminders": true,
    "weekly-summary": true,
    "product-updates": false,
    marketing: false,
  });
  const [privacy, setPrivacy] = useState({
    "share-analytics": true,
    "public-profile": false,
  });

  const toggle = (key, state, setState) => {
    setState({ ...state, [key]: !state[key] });
    toast.success("Preference saved");
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Settings
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
          Control how HireSense AI looks and talks to you.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Choose how the interface looks on this device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {[
                { value: "light", icon: Sun, label: "Light" },
                { value: "dark", icon: Moon, label: "Dark" },
                { value: "system", icon: Monitor, label: "System" },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={cn(
                    "flex flex-col items-center gap-2 rounded-md border p-4 transition-colors",
                    theme === opt.value
                      ? "border-signal-500 bg-signal-500/5"
                      : "border-[rgb(var(--border))] hover:bg-[rgb(var(--surface-2))]",
                  )}
                >
                  <opt.icon
                    className={cn(
                      "h-5 w-5",
                      theme === opt.value
                        ? "text-signal-500"
                        : "text-[rgb(var(--fg-muted))]",
                    )}
                  />
                  <span className="text-sm font-medium">{opt.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.05 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Choose what HireSense AI emails you about.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {notificationSettings.map((item, i) => (
              <div key={item.key}>
                {i > 0 && <Separator className="my-4" />}
                <div className="flex items-center justify-between gap-4 rounded-sm px-2.5 py-2 -mx-2.5 transition-colors hover:bg-[rgb(var(--surface-2))]">
                  <div>
                    <Label htmlFor={item.key} className="cursor-pointer">
                      {item.label}
                    </Label>
                    <p className="mt-0.5 text-sm text-[rgb(var(--fg-muted))]">
                      {item.description}
                    </p>
                  </div>
                  <Switch
                    id={item.key}
                    checked={notifications[item.key]}
                    onCheckedChange={() =>
                      toggle(item.key, notifications, setNotifications)
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4" /> Privacy
            </CardTitle>
            <CardDescription>
              Control what data leaves your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-1">
            {privacySettings.map((item, i) => (
              <div key={item.key}>
                {i > 0 && <Separator className="my-4" />}
                <div className="flex items-center justify-between gap-4 rounded-sm px-2.5 py-2 -mx-2.5 transition-colors hover:bg-[rgb(var(--surface-2))]">
                  <div>
                    <Label htmlFor={item.key} className="cursor-pointer">
                      {item.label}
                    </Label>
                    <p className="mt-0.5 text-sm text-[rgb(var(--fg-muted))]">
                      {item.description}
                    </p>
                  </div>
                  <Switch
                    id={item.key}
                    checked={privacy[item.key]}
                    onCheckedChange={() =>
                      toggle(item.key, privacy, setPrivacy)
                    }
                  />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-4 w-4" /> Language
            </CardTitle>
            <CardDescription>
              Interview questions and feedback will be delivered in this
              language.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    toast.success(`Language set to ${lang}`);
                  }}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    language === lang
                      ? "border-signal-500 bg-signal-500/10 text-signal-500"
                      : "border-[rgb(var(--border))] text-[rgb(var(--fg-muted))] hover:bg-[rgb(var(--surface-2))]",
                  )}
                >
                  {lang}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
