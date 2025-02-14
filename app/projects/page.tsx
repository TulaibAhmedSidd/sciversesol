'use client'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { constantApp } from '../utils/appConstant';
import Loading from '../components/Loading';

export default function ProjectsPage() {
    const [projects, setprojects] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchprojects()
    }, []);

    const fetchprojects = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/projects", {
            });
            let approvedTeam = response?.data;
            if (approvedTeam && approvedTeam?.length <= 0) {
                setprojects(constantApp?.projects);
            } else {
                setprojects(approvedTeam);
            }
        } catch (error) {
            console.error("Error fetching projectss:", error);
        } finally {
            setLoading(false);
        }
    };
    const handleClick = (link) => {
        if (link && !link.startsWith('http') && !link.startsWith('https')) {
            // If the link is missing protocol, add 'https://'
            link = `https://${link}`;
        }
        // Open the external link in a new tab
        window.open(link, '_blank', 'noopener,noreferrer');
    };

    return (
        <section className=" bg-gray-100 min-h-[70vh]" id="projects" style={{ marginTop: '0px !important', padding: '0px' }}>
            <div className='bg_space_for_title'>
                <h1 className={" lightcolor"}>Our  Projects</h1>
            </div>
            <div className="container mx-auto px-6 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-5">
                    {
                        loading ?
                            <Loading /> :

                            projects.map((project, index) => (
                                <div key={index} data-aos="fade-up" className="relative group overflow-hidden rounded-xl shadow-lg cursor-pointer"
                                    onClick={() => handleClick(project?.link)} >
                                    <img src={project.image} alt={project.title} className="w-full h-60 object-cover group-hover:opacity-50 transition duration-300" />
                                    <div className="absolute inset-0 flex justify-center items-center">
                                        <div className="hexagon-border">
                                            <div className="hexagon">
                                                {project.title}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-70 text-white text-center p-4">
                                        <p className="text-lg ">{project.description}</p>
                                    </div>
                                </div>
                            ))}
                </div>
            </div>
        </section>
    );
}
