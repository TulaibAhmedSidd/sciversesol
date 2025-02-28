'use client'
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import CardContent from '../components/CardContent';
import { constantApp } from '../utils/appConstant';
import axios from 'axios';
import Loading from '../components/Loading';

const Team = () => {
    const [teammember, setTeammember] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchTeammember()
    }, []);

    const fetchTeammember = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/teammember", {
            });
            let approvedTeam = response?.data;
            if (approvedTeam == [] || approvedTeam?.length <= 0) {
                setTeammember(constantApp?.teamember);
            } else {
                setTeammember(approvedTeam);
            }
        } catch (error) {
            console.error("Error fetching teammembers:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <section className="py-20 px-6 text-center">
            <h2 className="fancy-heading" data-aos="fade-up">
                Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {
                    loading ?
                        <Loading />
                        :
                        teammember?.map((member, index) => (
                            <div
                                key={index}
                                whileHover={{ scale: 1.05 }}
                                className="p-6 bg-white text-black rounded-2xl shadow-lg text-center "
                                data-aos="fade-down"
                                data-aos-delay={`${index * 200}`}
                            >
                                <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
                                <CardContent>
                                    <h3 className="text-2xl font-semibold mb-1">{member.name}</h3>
                                    <p className="text-sm font-semibold text-[#9333ea] mb-2">{member.desig} </p>
                                    <p className="text-lg font-semibold ">{member.role} ({member.experience})</p>
                                    <p className='text-[#1e3a8a]'>{member.desc}</p>
                                </CardContent>
                            </div>
                        ))}
            </div>
        </section>
    )
}

export default Team