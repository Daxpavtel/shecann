"use client";

import { useState } from "react";

type FormData = { name: string; email: string; message: string };
type FieldErrors = Partial<Record<keyof FormData, string>>;

function validate(data: FormData): FieldErrors {
  const errors: FieldErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Invalid email format";
  }
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
}

export default function Home() {
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FieldErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const submitForm = async () => {
    setSuccess("");

    const fieldErrors = validate(form);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error("Something went wrong");
      }

      setSuccess("Form Submitted Successfully");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setErrors({ message: "Something went wrong. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !submitting) {
      e.preventDefault();
      submitForm();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary-50 via-white to-white">
      <header className="border-b border-primary-100">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-2xl font-bold tracking-tight text-primary-700">
            She Can
          </span>
          <a
            href="/admin"
            className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-primary-700"
          >
            Admin
          </a>
        </div>
      </header>

      <section className="px-6 pt-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary-100 px-4 py-1.5 text-sm font-medium text-primary-700">
            Empowering Women in Tech
          </div>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            She Can{" "}
            <span className="bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent">
              Build Anything
            </span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            We are on a mission to close the gender gap in technology. Through
            mentorship, scholarships, and community, we help women break into
            tech and thrive.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-5xl gap-8 px-6 sm:grid-cols-3">
        {[
          {
            title: "Mentorship",
            desc: "One-on-one guidance from industry leaders",
          },
          {
            title: "Scholarships",
            desc: "Financial support for courses and bootcamps",
          },
          {
            title: "Community",
            desc: "A safe space to learn, network, and grow",
          },
        ].map((feature) => (
          <div
            key={feature.title}
            className="rounded-2xl border border-primary-100 bg-white p-6 text-center shadow-sm transition hover:shadow-md"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-lg font-bold text-primary-600">
              {feature.title[0]}
            </div>
            <h3 className="text-lg font-semibold text-gray-900">
              {feature.title}
            </h3>
            <p className="mt-2 text-sm text-gray-500">{feature.desc}</p>
          </div>
        ))}
      </section>

      <section id="contact" className="mx-auto mt-28 max-w-2xl px-6 pb-32">
        <div className="rounded-2xl border border-primary-100 bg-white p-8 shadow-sm sm:p-12">
          <h2 className="text-3xl font-bold text-gray-900">Get in Touch</h2>
          <p className="mt-2 text-gray-500">
            Have a question or want to collaborate? We&apos;d love to hear from
            you.
          </p>

          {success && (
            <div className="mt-6 rounded-xl border border-green-200 bg-green-50 px-5 py-4 text-center font-medium text-green-700">
              {success}
            </div>
          )}

          <div
            className="mt-8 space-y-6"
            role="form"
            onKeyDown={handleKeyDown}
          >
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary-500 ${
                  errors.name
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300"
                }`}
                placeholder="Your full name"
              />
              {errors.name && (
                <p className="mt-1.5 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary-500 ${
                  errors.email
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300"
                }`}
                placeholder="you@example.com"
              />
              {errors.email && (
                <p className="mt-1.5 text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={form.message}
                onChange={handleChange}
                className={`mt-1.5 block w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:ring-2 focus:ring-primary-500 resize-y ${
                  errors.message
                    ? "border-red-400 focus:ring-red-400"
                    : "border-gray-300"
                }`}
                placeholder="Tell us how you'd like to get involved..."
              />
              {errors.message && (
                <p className="mt-1.5 text-sm text-red-500">{errors.message}</p>
              )}
            </div>

            <button
              type="button"
              disabled={submitting}
              onClick={submitForm}
              className="w-full rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:from-primary-700 hover:to-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </section>

      <footer className="border-t border-primary-100 bg-primary-50 py-8 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} She Can Foundation. All rights
        reserved.
      </footer>
    </div>
  );
}
