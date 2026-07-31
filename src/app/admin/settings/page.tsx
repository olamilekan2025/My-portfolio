"use client";

import { useState, useEffect } from "react";
import { 
  User, 
  Globe, 
  Shield, 
  Bell, 
  Save,
  Key,
  Mail,
  Phone,
  MapPin,
  Link as LinkIcon,
  Camera,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface SettingsData {
  firstName?: string;
  lastName?: string;
  displayName?: string;
  email?: string;
  phone?: string;
  location?: string;
  bio?: string;
  website?: string;
  profileImage?: string;
  siteName?: string;
  tagline?: string;
  siteDescription?: string;
  contactEmail?: string;
  github?: string;
  linkedin?: string;
  twitter?: string;
  dribbble?: string;
  emailNotifications?: {
    newMessages?: boolean;
    weeklySummary?: boolean;
    securityAlerts?: boolean;
  };
  inAppNotifications?: {
    projectUpdates?: boolean;
    messageReminders?: boolean;
    systemUpdates?: boolean;
  };
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState<SettingsData>({});

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "site", label: "Site Settings", icon: Globe },
    { id: "security", label: "Security", icon: Shield },
    { id: "notifications", label: "Notifications", icon: Bell },
  ];

  // Fetch settings on mount
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/settings");
      const data = await response.json();

      if (data.success) {
        setSettings(data.settings);
      } else {
        toast.error("Failed to load settings");
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
      toast.error("Failed to load settings");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Settings saved successfully");
        setSettings(data.settings);
      } else {
        toast.error(data.message || "Failed to save settings");
      }
    } catch (error) {
      console.error("Error saving settings:", error);
      toast.error("Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  };

  const updateSettings = (updates: Partial<SettingsData>) => {
    setSettings((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-600 text-white shadow-lg shadow-primary/25">
            <Sparkles className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Settings
            </h1>
            <p className="mt-1 text-muted-foreground">
              Manage your account and site preferences
            </p>
          </div>
        </div>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Sidebar Navigation */}
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-2"
        >
          <Card className="border-border/60 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl p-2">
            {tabs.map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-primary to-violet-600 text-white shadow-lg shadow-primary/25"
                    : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-primary to-violet-600"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`h-5 w-5 relative z-10 ${activeTab === tab.id ? "text-white" : ""}`} />
                <span className={`font-medium relative z-10 ${activeTab === tab.id ? "text-white" : ""}`}>
                  {tab.label}
                </span>
              </motion.button>
            ))}
          </Card>
        </motion.aside>

        {/* Content Area */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-6"
        >
          {activeTab === "profile" && <ProfileSettings settings={settings} updateSettings={updateSettings} />}
          {activeTab === "site" && <SiteSettings settings={settings} updateSettings={updateSettings} />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings settings={settings} updateSettings={updateSettings} />}

          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex justify-end"
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                onClick={handleSave} 
                disabled={isSaving || isLoading}
                className="gap-2 bg-gradient-to-r from-primary to-violet-600 shadow-lg shadow-primary/25 hover:shadow-primary/40 px-8"
                size="lg"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

function ProfileSettings({ settings, updateSettings }: { settings: SettingsData; updateSettings: (updates: Partial<SettingsData>) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-border/60 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Profile Information
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Update your personal information and public profile
          </p>
        </div>

        {/* Avatar Section */}
        <div className="mb-8 flex items-center gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative h-24 w-24 overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-violet-600 to-fuchsia-600 p-1 shadow-2xl shadow-primary/30"
          >
            <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-violet-600 text-3xl font-bold text-white">
              {settings.firstName?.[0] || settings.displayName?.[0] || "A"}
            </div>
            <div className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-background border-2 border-primary shadow-lg">
              <Camera className="h-4 w-4 text-primary" />
            </div>
          </motion.div>
          <div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="sm" 
                className="gap-2 border-primary/20 bg-primary/5 hover:bg-primary/10"
              >
                <Camera className="h-4 w-4" />
                Change Avatar
              </Button>
            </motion.div>
            <p className="mt-2 text-xs text-muted-foreground">
              Recommended: Square image, at least 200x200px
            </p>
          </div>
        </div>

        <Separator className="my-8 bg-gradient-to-r from-transparent via-border/50 to-transparent" />

        {/* Form Fields */}
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-foreground">First Name</label>
              <Input 
                value={settings.firstName || ""} 
                onChange={(e) => updateSettings({ firstName: e.target.value })}
                placeholder="Enter first name"
                className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-foreground">Last Name</label>
              <Input 
                value={settings.lastName || ""} 
                onChange={(e) => updateSettings({ lastName: e.target.value })}
                placeholder="Enter last name"
                className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground">Display Name</label>
            <Input 
              value={settings.displayName || ""} 
              onChange={(e) => updateSettings({ displayName: e.target.value })}
              placeholder="How you want to be addressed"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              Email Address
            </label>
            <Input 
              type="email" 
              value={settings.email || ""} 
              onChange={(e) => updateSettings({ email: e.target.value })}
              placeholder="your@email.com"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Phone className="h-4 w-4 text-primary" />
              Phone Number
            </label>
            <Input 
              type="tel" 
              value={settings.phone || ""} 
              onChange={(e) => updateSettings({ phone: e.target.value })}
              placeholder="+234 XXX XXX XXXX"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              Location
            </label>
            <Input 
              value={settings.location || ""} 
              onChange={(e) => updateSettings({ location: e.target.value })}
              placeholder="City, Country"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground">Bio</label>
            <Textarea 
              value={settings.bio || ""} 
              onChange={(e) => updateSettings({ bio: e.target.value })}
              placeholder="Tell visitors about yourself..."
              className="min-h-[120px] border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <LinkIcon className="h-4 w-4 text-primary" />
              Website URL
            </label>
            <Input 
              type="url" 
              value={settings.website || ""} 
              onChange={(e) => updateSettings({ website: e.target.value })}
              placeholder="https://yourwebsite.com"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

function SiteSettings({ settings, updateSettings }: { settings: SettingsData; updateSettings: (updates: Partial<SettingsData>) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-border/60 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Site Configuration
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Customize your portfolio site appearance and behavior
          </p>
        </div>

        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground">Site Name</label>
            <Input 
              value={settings.siteName || ""} 
              onChange={(e) => updateSettings({ siteName: e.target.value })}
              placeholder="Your portfolio name"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground">Tagline</label>
            <Input 
              value={settings.tagline || ""} 
              onChange={(e) => updateSettings({ tagline: e.target.value })}
              placeholder="A short tagline for your site"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground">Site Description</label>
            <Textarea 
              value={settings.siteDescription || ""} 
              onChange={(e) => updateSettings({ siteDescription: e.target.value })}
              placeholder="SEO description for search engines..."
              className="min-h-[100px] border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="space-y-2"
          >
            <label className="text-sm font-semibold text-foreground">Contact Email</label>
            <Input 
              type="email" 
              value={settings.contactEmail || ""} 
              onChange={(e) => updateSettings({ contactEmail: e.target.value })}
              placeholder="Public contact email"
              className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
            />
          </motion.div>

          <Separator className="my-8 bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6">
              Social Links
            </h3>
          </motion.div>
          
          <div className="space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-foreground">GitHub</label>
              <Input 
                value={settings.github || ""} 
                onChange={(e) => updateSettings({ github: e.target.value })}
                placeholder="https://github.com/username"
                className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-foreground">LinkedIn</label>
              <Input 
                value={settings.linkedin || ""} 
                onChange={(e) => updateSettings({ linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/username"
                className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-foreground">Twitter/X</label>
              <Input 
                value={settings.twitter || ""} 
                onChange={(e) => updateSettings({ twitter: e.target.value })}
                placeholder="https://twitter.com/username"
                className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-2"
            >
              <label className="text-sm font-semibold text-foreground">Dribbble</label>
              <Input 
                value={settings.dribbble || ""} 
                onChange={(e) => updateSettings({ dribbble: e.target.value })}
                placeholder="https://dribbble.com/username"
                className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10"
              />
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function SecuritySettings() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = async () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      toast.error("New password must be at least 6 characters");
      return;
    }

    try {
      setIsChangingPassword(true);
      const response = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Password updated successfully");
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      toast.error("Failed to change password");
    } finally {
      setIsChangingPassword(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-border/60 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Security Settings
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your account security and authentication
          </p>
        </div>

        <div className="space-y-8">
          {/* Password Change */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <Key className="h-5 w-5 text-primary" />
              Change Password
            </h3>
            <div className="space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Current Password</label>
                <div className="relative">
                  <Input 
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                    className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10 pr-10"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">New Password</label>
                <div className="relative">
                  <Input 
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                    className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10 pr-10"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </motion.button>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-foreground">Confirm New Password</label>
                <div className="relative">
                  <Input 
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                    className="border-border/60 bg-background/50 backdrop-blur-sm focus:border-primary/50 focus:ring-4 focus:ring-primary/10 pr-10"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </motion.button>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button 
                  variant="outline" 
                  onClick={handlePasswordChange}
                  disabled={isChangingPassword}
                  className="border-primary/20 bg-primary/5 hover:bg-primary/10"
                >
                  {isChangingPassword ? "Updating..." : "Update Password"}
                </Button>
              </motion.div>
            </div>
          </motion.div>

          <Separator className="bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          {/* Two-Factor Authentication */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Two-Factor Authentication
              </h3>
              <Badge variant="secondary" className="bg-muted/50 border-border/60">Disabled</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Add an extra layer of security to your account by requiring a code when signing in.
            </p>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" className="border-primary/20 bg-primary/5 hover:bg-primary/10">
                Enable 2FA
              </Button>
            </motion.div>
          </motion.div>

          <Separator className="bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          {/* Session Management */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-4">
              Active Sessions
            </h3>
            <div className="space-y-3">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/20 p-5 backdrop-blur-sm"
              >
                <div>
                  <p className="font-semibold">Current Session</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Windows · Chrome · Lagos, Nigeria
                  </p>
                </div>
                <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
                  Active Now
                </Badge>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}

function NotificationSettings({ settings, updateSettings }: { settings: SettingsData; updateSettings: (updates: Partial<SettingsData>) => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-border/60 bg-gradient-to-br from-background via-background to-muted/20 backdrop-blur-xl p-8 shadow-xl">
        <div className="mb-6">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Notification Preferences
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Choose how you want to be notified about important events
          </p>
        </div>

        <div className="space-y-8">
          {/* Email Notifications */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-primary" />
              Email Notifications
            </h3>
            <div className="space-y-5">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/20 p-5 backdrop-blur-sm"
              >
                <div>
                  <p className="font-semibold">New Contact Messages</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Get notified when someone sends you a message
                  </p>
                </div>
                <Switch 
                  checked={settings.emailNotifications?.newMessages ?? true}
                  onCheckedChange={(checked) => 
                    updateSettings({ 
                      emailNotifications: { 
                        ...settings.emailNotifications, 
                        newMessages: checked 
                      } 
                    })
                  }
                />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/20 p-5 backdrop-blur-sm"
              >
                <div>
                  <p className="font-semibold">Weekly Summary</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Receive a weekly digest of your portfolio activity
                  </p>
                </div>
                <Switch 
                  checked={settings.emailNotifications?.weeklySummary ?? false}
                  onCheckedChange={(checked) => 
                    updateSettings({ 
                      emailNotifications: { 
                        ...settings.emailNotifications, 
                        weeklySummary: checked 
                      } 
                    })
                  }
                />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/20 p-5 backdrop-blur-sm"
              >
                <div>
                  <p className="font-semibold">Security Alerts</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Important security notifications for your account
                  </p>
                </div>
                <Switch 
                  checked={settings.emailNotifications?.securityAlerts ?? true}
                  onCheckedChange={(checked) => 
                    updateSettings({ 
                      emailNotifications: { 
                        ...settings.emailNotifications, 
                        securityAlerts: checked 
                      } 
                    })
                  }
                />
              </motion.div>
            </div>
          </motion.div>

          <Separator className="bg-gradient-to-r from-transparent via-border/50 to-transparent" />

          {/* In-App Notifications */}
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <Bell className="h-5 w-5 text-primary" />
              In-App Notifications
            </h3>
            <div className="space-y-5">
              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/20 p-5 backdrop-blur-sm"
              >
                <div>
                  <p className="font-semibold">Project Updates</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Notifications about your projects
                  </p>
                </div>
                <Switch 
                  checked={settings.inAppNotifications?.projectUpdates ?? true}
                  onCheckedChange={(checked) => 
                    updateSettings({ 
                      inAppNotifications: { 
                        ...settings.inAppNotifications, 
                        projectUpdates: checked 
                      } 
                    })
                  }
                />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/20 p-5 backdrop-blur-sm"
              >
                <div>
                  <p className="font-semibold">Message Reminders</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Reminders for unread messages
                  </p>
                </div>
                <Switch 
                  checked={settings.inAppNotifications?.messageReminders ?? true}
                  onCheckedChange={(checked) => 
                    updateSettings({ 
                      inAppNotifications: { 
                        ...settings.inAppNotifications, 
                        messageReminders: checked 
                      } 
                    })
                  }
                />
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.01 }}
                className="flex items-center justify-between rounded-2xl border border-border/60 bg-gradient-to-br from-background via-background to-muted/20 p-5 backdrop-blur-sm"
              >
                <div>
                  <p className="font-semibold">System Updates</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Notifications about system maintenance and updates
                  </p>
                </div>
                <Switch 
                  checked={settings.inAppNotifications?.systemUpdates ?? false}
                  onCheckedChange={(checked) => 
                    updateSettings({ 
                      inAppNotifications: { 
                        ...settings.inAppNotifications, 
                        systemUpdates: checked 
                      } 
                    })
                  }
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
