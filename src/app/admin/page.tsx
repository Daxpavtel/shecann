"use client";

import { useEffect, useState } from "react";

type Message = {
  id: number;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};

export default function AdminPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/contact")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setMessages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white">
      <header className="border-b border-primary-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-2xl font-bold tracking-tight text-primary-700">
            She Can — Admin
          </span>
          <a
            href="/"
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700"
          >
            Home
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-3xl font-bold text-gray-900">
          Contact Submissions
        </h1>
        <p className="mt-2 text-gray-500">
          All messages submitted via the contact form.
        </p>

        {loading && (
          <p className="mt-10 text-center text-gray-400">Loading...</p>
        )}

        {error && (
          <div className="mt-10 rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {!loading && !error && messages.length === 0 && (
          <div className="mt-10 rounded-2xl border border-primary-100 bg-white p-16 text-center">
            <p className="text-lg text-gray-400">No submissions yet.</p>
          </div>
        )}

        {!loading && !error && messages.length > 0 && (
          <div className="mt-8 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="bg-primary-50 text-primary-800">
                    <th className="px-5 py-4 font-semibold">#</th>
                    <th className="px-5 py-4 font-semibold">Name</th>
                    <th className="px-5 py-4 font-semibold">Email</th>
                    <th className="px-5 py-4 font-semibold">Message</th>
                    <th className="px-5 py-4 font-semibold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary-100">
                  {messages.map((msg, i) => (
                    <tr key={msg.id} className="hover:bg-primary-50/50">
                      <td className="px-5 py-4 text-gray-400">{i + 1}</td>
                      <td className="px-5 py-4 font-medium text-gray-900">
                        {msg.name}
                      </td>
                      <td className="px-5 py-4 text-gray-600">{msg.email}</td>
                      <td className="max-w-xs truncate px-5 py-4 text-gray-600">
                        {msg.message}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 text-gray-500">
                        {new Date(msg.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t border-primary-100 bg-primary-50 py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} She Can Foundation. All rights
        reserved.
      </footer>
    </div>
  );
}
