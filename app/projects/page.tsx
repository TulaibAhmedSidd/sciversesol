const projects = [
    {
        title: "Next.js Business Platform",
        description: "A high-performance business platform built with Next.js.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7C7_tKnA2gXAwK_rFcHG2UWYqhurrfaNGTw&s",
    },
    {
        title: "Flutter Mobile App",
        description: "Cross-platform mobile application using Flutter and Firebase.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqdMZGDqxJuJ-vdnldZ26STLaXnU5o2uoqZw&s",
    },
    {
        title: "Game Development",
        description: "3D and 2D games developed using Unity and Unreal Engine.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmktaIOURN2fwe6G6qWF1pejraf2kPnjuUvQ&s",
    },
    {
        title: "AI & Data Science",
        description: "AI-powered analytics and predictive modeling solutions.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-PiocXvj6vJpUtsGwld85yyiXMJiEPibdcw&s",
    },
    {
        title: "E-commerce Platform",
        description: "Full-fledged e-commerce platform with secure transactions.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQirVzsozo39tg6RZv1pAHK2q5zFzyktFzzxQ&s",
    },
    {
        title: "Brand Identity & UI/UX",
        description: "Comprehensive design solutions for brand identity and UI/UX.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWiEGPKAf5W272fBFlJvfZ_jy7o3LABIGrnQ&s",
    },
];

export default function ProjectsPage() {

    return (
        <section className=" bg-gray-100 min-h-[70vh]" id="projects" style={{ marginTop: '0px !important', padding: '0px' }}>
            <div className='bg_space_for_title'>
                <h1 className={" lightcolor"}>Our  Projects</h1>
            </div>
            <div className="container mx-auto px-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
                    {projects.map((project, index) => (
                        <div key={index} data-aos="fade-up" className="relative group overflow-hidden rounded-xl shadow-lg">
                            <h3 className="text-lg font-bold text-center mt-2">{project.title}</h3>
                            <img src={project.image} alt={project.title} className="w-full h-60 object-cover group-hover:opacity-50 transition duration-300" />
                            <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-40 text-white text-center p-4">
                                <p className="text-lg font-semibold">{project.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
