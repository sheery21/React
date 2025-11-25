export default  function Contact() {
  return (
    <section className="w-full max-w-4xl mx-auto pb-20">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      <div className="grid gap-4">
        <input placeholder="Your Name" className="p-3 rounded-lg bg-white/10" />
        <input
          placeholder="Your Email"
          className="p-3 rounded-lg bg-white/10"
        />
        <input placeholder="Subject" className="p-3 rounded-lg bg-white/10" />
        <textarea
          placeholder="Message"
          className="p-3 rounded-lg bg-white/10 h-32"
        ></textarea>
        <button className="bg-blue-600 px-5 py-2 rounded-full hover:bg-blue-700 w-fit">
          Send Message
        </button>
      </div>
    </section>
  );
}
