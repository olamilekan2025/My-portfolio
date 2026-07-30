"use client";

import { useState, useEffect } from "react";
import { Mail, Trash2, Reply, Clock, CheckCircle, Archive } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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

interface Message {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "pending" | "replied" | "archived";
  reply: string | null;
  repliedAt: string | null;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState("");
  const [sendingReply, setSendingReply] = useState(false);
  const [replyDialogOpen, setReplyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "pending" | "replied">("all");

  useEffect(() => {
    fetchMessages();
  }, []);

  async function fetchMessages() {
    try {
      const response = await fetch("/api/admin/messages");
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setLoading(false);
    }
  }

  async function handleReply() {
    if (!selectedMessage || !replyText.trim()) return;

    try {
      setSendingReply(true);
      const response = await fetch(`/api/admin/messages/${selectedMessage._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reply: replyText }),
      });

      if (!response.ok) throw new Error();

      toast.success("Reply sent successfully");
      setReplyDialogOpen(false);
      setReplyText("");
      setSelectedMessage(null);
      fetchMessages();
    } catch {
      toast.error("Failed to send reply");
    } finally {
      setSendingReply(false);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error();

      toast.success("Message deleted");
      setDeleteDialogOpen(false);
      setMessageToDelete(null);
      fetchMessages();
    } catch {
      toast.error("Failed to delete message");
    }
  }

  function openReplyDialog(message: Message) {
    setSelectedMessage(message);
    setReplyText(message.reply || "");
    setReplyDialogOpen(true);
  }

  function openDeleteDialog(id: string) {
    setMessageToDelete(id);
    setDeleteDialogOpen(true);
  }

  const filteredMessages = messages.filter((msg) => {
    if (filter === "all") return true;
    return msg.status === filter;
  });

  const pendingCount = messages.filter((m) => m.status === "pending").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages</h1>
          <p className="mt-1 text-muted-foreground">
            Manage visitor inquiries and replies
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total</p>
              <p className="mt-2 text-3xl font-bold">{messages.length}</p>
            </div>
            <Mail className="h-8 w-8 text-muted-foreground" />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Pending</p>
              <p className="mt-2 text-3xl font-bold">{pendingCount}</p>
            </div>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Replied</p>
              <p className="mt-2 text-3xl font-bold">
                {messages.filter((m) => m.status === "replied").length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-emerald-500" />
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        <Button
          variant={filter === "all" ? "default" : "outline"}
          onClick={() => setFilter("all")}
        >
          All
        </Button>
        <Button
          variant={filter === "pending" ? "default" : "outline"}
          onClick={() => setFilter("pending")}
        >
          Pending
        </Button>
        <Button
          variant={filter === "replied" ? "default" : "outline"}
          onClick={() => setFilter("replied")}
        >
          Replied
        </Button>
      </div>

      {/* Messages List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center text-muted-foreground">
          Loading messages...
        </div>
      ) : filteredMessages.length === 0 ? (
        <div className="flex h-64 items-center justify-center rounded-2xl border border-dashed border-border text-center text-muted-foreground">
          No messages found
        </div>
      ) : (
        <div className="space-y-4">
          {filteredMessages.map((msg) => (
            <motion.div
              key={msg._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 space-y-3">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{msg.subject}</h3>
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        msg.status === "pending"
                          ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                          : msg.status === "replied"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                      }`}
                    >
                      {msg.status}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{msg.name}</span>
                    <span>•</span>
                    <span>{msg.email}</span>
                    <span>•</span>
                    <span>{new Date(msg.createdAt).toLocaleDateString()}</span>
                  </div>

                  <p className="text-sm">{msg.message}</p>

                  {msg.reply && (
                    <div className="rounded-lg bg-muted/50 p-3">
                      <p className="mb-1 text-xs font-medium text-muted-foreground">
                        Your reply:
                      </p>
                      <p className="text-sm">{msg.reply}</p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openReplyDialog(msg)}
                  >
                    <Reply className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openDeleteDialog(msg._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reply Dialog */}
      <Dialog open={replyDialogOpen} onOpenChange={setReplyDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Reply to Message</DialogTitle>
          </DialogHeader>

          {selectedMessage && (
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="mb-2 text-sm font-medium">{selectedMessage.subject}</p>
                <p className="mb-1 text-sm text-muted-foreground">
                  From: {selectedMessage.name} ({selectedMessage.email})
                </p>
                <p className="text-sm">{selectedMessage.message}</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Your Reply</label>
                <Textarea
                  rows={6}
                  placeholder="Type your reply..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setReplyDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleReply} disabled={sendingReply}>
                  {sendingReply ? "Sending..." : "Send Reply"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Message</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this message? This action cannot be
              undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => messageToDelete && handleDelete(messageToDelete)}
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
