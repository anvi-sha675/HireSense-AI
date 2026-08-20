import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Camera, AlertTriangle } from "lucide-react";
import toast from "react-hot-toast";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/store/auth-store";
import { FieldError } from "@/components/common/field-error";

const profileSchema = z.object({
  name: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  title: z.string().optional(),
});

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password"),
    newPassword: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string().min(1, "Confirm your new password"),
  })
  .refine((d) => d.newPassword === d.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export default function ProfilePage() {
  const { user, login } = useAuthStore();
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors, isSubmitting: savingProfile },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name ?? "",
      email: user?.email ?? "",
      title: "Senior Product Designer",
    },
  });

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPassword,
    formState: { errors: passwordErrors, isSubmitting: savingPassword },
  } = useForm({ resolver: zodResolver(passwordSchema) });

  const onSaveProfile = async (data) => {
    await new Promise((r) => setTimeout(r, 700));
    if (user) login({ ...user, name: data.name, email: data.email });
    toast.success("Profile updated");
  };

  const onChangePassword = async () => {
    await new Promise((r) => setTimeout(r, 700));
    toast.success("Password changed");
    resetPassword();
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "HS";

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold tracking-tight">
          Profile
        </h1>
        <p className="mt-1 text-sm text-[rgb(var(--fg-muted))]">
          Manage your personal information and account security.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="danger">Danger zone</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Personal information</CardTitle>
                <CardDescription>
                  This is displayed on your reports and to recruiters if you
                  share them.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={user?.avatarUrl} />
                    <AvatarFallback className="text-lg">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="secondary" size="sm">
                    <Camera className="h-4 w-4" /> Change photo
                  </Button>
                </div>

                <form
                  onSubmit={handleProfileSubmit(onSaveProfile)}
                  className="mt-6 grid gap-5 sm:grid-cols-2"
                >
                  <div className="space-y-1.5">
                    <Label htmlFor="name">Full name</Label>
                    <Input
                      id="name"
                      error={!!profileErrors.name}
                      {...registerProfile("name")}
                    />
                    <FieldError message={profileErrors.name?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      error={!!profileErrors.email}
                      {...registerProfile("email")}
                    />
                    <FieldError message={profileErrors.email?.message} />
                  </div>
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="title">Target role / title</Label>
                    <Input
                      id="title"
                      placeholder="e.g. Senior Product Designer"
                      {...registerProfile("title")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" loading={savingProfile}>
                      Save changes
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Change password</CardTitle>
                <CardDescription>
                  Use at least 8 characters, mixing letters, numbers, and
                  symbols.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handlePasswordSubmit(onChangePassword)}
                  className="grid gap-5 sm:grid-cols-2"
                >
                  <div className="space-y-1.5 sm:col-span-2">
                    <Label htmlFor="currentPassword">Current password</Label>
                    <Input
                      id="currentPassword"
                      type="password"
                      error={!!passwordErrors.currentPassword}
                      {...registerPassword("currentPassword")}
                    />
                    <FieldError
                      message={passwordErrors.currentPassword?.message}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="newPassword">New password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      error={!!passwordErrors.newPassword}
                      {...registerPassword("newPassword")}
                    />
                    <FieldError message={passwordErrors.newPassword?.message} />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="confirmPassword">
                      Confirm new password
                    </Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      error={!!passwordErrors.confirmPassword}
                      {...registerPassword("confirmPassword")}
                    />
                    <FieldError
                      message={passwordErrors.confirmPassword?.message}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <Button type="submit" loading={savingPassword}>
                      Update password
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="danger">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="border-rose-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-rose-500">
                  <AlertTriangle className="h-4 w-4" /> Delete account
                </CardTitle>
                <CardDescription>
                  This permanently deletes your resume history, interview
                  recordings, and reports. This cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Label htmlFor="confirm">
                  Type <span className="font-mono font-semibold">DELETE</span>{" "}
                  to confirm
                </Label>
                <Input
                  id="confirm"
                  className="mt-1.5 max-w-xs"
                  value={deleteConfirm}
                  onChange={(e) => setDeleteConfirm(e.target.value)}
                />
                <p className="mt-2 text-xs text-[rgb(var(--fg-muted))]">
                  {deleteConfirm === "DELETE"
                    ? "Ready — this action is permanent."
                    : "The button unlocks once you type DELETE exactly."}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  variant="destructive"
                  disabled={deleteConfirm !== "DELETE"}
                  onClick={() => toast.error("Account deletion requested")}
                >
                  Delete my account
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
