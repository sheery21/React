export default  function Projects() {
  const projects = [
    "Blood Donation App",
    "Github-Api",
    "Password Generator",
    "FoodPanda",
    "Elite Group",
    "Calculator",
    "Stopwatch",
    "SiteLogo",
  ];

  return (
    <section className="w-full max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">My Projects</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div
            key={p}
            className="bg-white/10 p-6 rounded-2xl shadow-xl backdrop-blur-xl flex justify-between items-center"
          >
            <h3 className="font-semibold">{p}</h3>
            <button className="bg-blue-600 px-4 py-1 rounded-full hover:bg-blue-700">
              Open
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
