export default  function Skills() {
  const skills = [
    { name: "Html", icon: "🔥" },
    { name: "CSS", icon: "🎨" },
    { name: "JavaScript", icon: "🟨" },
    { name: "React", icon: "⚛️" },
  ];

  return (
    <section className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Skills</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {skills.map((s) => (
          <div
            key={s.name}
            className="bg-white/10 p-6 rounded-2xl shadow-xl flex flex-col items-center gap-2 backdrop-blur-xl"
          >
            <div className="text-4xl">{s.icon}</div>
            <p className="font-semibold">{s.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
