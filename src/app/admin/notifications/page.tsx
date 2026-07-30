"use client";

import { useState, useEffect } from "react";
import { Bell, Mail, Clock, CheckCircle, ArrowRight, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Notification {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "replied" | "archived";
  createdAt: string;
}

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [notificationToDelete, setNotificationToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications();
  }, []);

  async function fetchNotifications() {
    try {
      const response = await fetch("/api/admin/notifications");
      const data = await response.json();
      setNotifications(data.unreadMessages || []);
    } catch (error) {
      toast.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      toast.success("Notification deleted");
      setDeleteDialogOpen(false);
      setNotificationToDelete(null);
      fetchNotifications();
    } catch {
      toast.error("Failed to delete notification");
    }
  }

  function openDeleteDialog(id: string) {
    setNotificationToDelete(id);
    setDeleteDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Notifications</h1>
          <p className="mt-1 text-muted-foreground">
            View and manage unread messages from visitors
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Unread Messages</p>
              <p className="mt-2 text-3xl font-bold">{notifications.length}</p>
            </div>
            <Bell className="h-8 w-8 text-primary" />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Quick Action</p>
              <p className="mt-2 text-sm text-muted-foreground">
                View all messages in the messages page
              </p>
            </div>
            <Link href="/admin/messages">
              <Button variant="outline" size="sm">
                View All Messages
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading notifications...
        </div>
      ) : notifications.length === 0 ? (
        <div className="flex h-64 flex-col items-center justify-center rounded-2xl border border-dashed border-border text-center">
          <Bell className="h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No unread notifications</p>
          <p className="text-sm text-muted-foreground mt-2">
            You're all caught up! New messages will appear here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((notification) => (
            <motion.div
              key={notification._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-pink-500 text-white font-semibold">
                      {notification.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="font-semibold">{notification.subject}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{notification.name}</span>
                        <span>•</span>
                        <span>{notification.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{new Date(notification.createdAt).toLocaleString()}</span>
                  </div>

                  <p className="text-sm">{notification.message}</p>
                </div>

                <div className="flex gap-2">
                  <Link href={`/admin/messages/${notification._id}`}>
                    <Button size="sm" variant="outline">
                      <Mail className="h-4 w-4 mr-2" />
                      Reply
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDeleteDialog(notification._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Notification</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this notification? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => notificationToDelete && handleDelete(notificationToDelete)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
