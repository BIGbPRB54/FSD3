import { useState } from "react";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function change(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setError("");
    setSuccess("");
  }

  async function submit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all the fields.");
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setSuccess(data.message || "Message submitted successfully.");
      setError("");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message || "Failed to submit the form.");
      setSuccess("");
    }
  }

  const ok = form.name && form.email && form.message;

  return (
    <section>
      <h2>Contact Me</h2>
      <form onSubmit={submit}>
        <label>Name</label>
        <input
          name="name"
          value={form.name}
          onChange={change}
          required
        />
        <label>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={change}
          required
        />
        <label>Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={change}
          required
        />
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <button disabled={!ok}>Submit</button>
      </form>
    </section>
  );
}

export default Contact;