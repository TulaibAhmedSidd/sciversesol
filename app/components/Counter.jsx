"use client";

import React, { useState, useEffect } from "react";
import styles from "../styles/Counter.module.css";
import axios from "axios";
import Loading from "@components/Loading"

const Counter = () => {
    const [loading, setLoading] = useState(false);
    const [stats, setStats] = useState([]);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await axios.get("/api/stats");
            setStats(response.data);
        } catch (error) {
            console.error("Error fetching stats:", error);
        } finally {
            setLoading(false);
        }
    };


    const [counters, setCounters] = useState(
        stats?.map(() => ({
            current: 0,
            target: 0,
        }))
    );

    // Initialize the targets in useEffect
    useEffect(() => {
        const updatedCounters = stats?.map((stat) => ({
            current: 0,
            target: stat.count,
        }));
        setCounters(updatedCounters);
    }, [stats?.length]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCounters((prevCounters) =>
                prevCounters?.map((counter, index) => {
                    if (counter?.current < counters[index].target) {
                        return {
                            ...counter,
                            current: counter?.current + 1,
                        };
                    }
                    return counter;
                })
            );
        }, 10); // Adjust the speed of increment

        // Stop the interval when all counters have reached their target
        if (counters.every((counter) => counter?.current >= counter?.target)) {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [counters]);

    return (
        <div className={styles.counterContainer}>
            {
                loading ?
                    <Loading />
                    :

                    stats?.map((stat, index) => (
                        <div className={styles.counterItem} key={index}>
                            <h2 className={styles.counterCount}>
                                {counters?.[index]?.current}{stat?.suffix}
                            </h2>
                            <p className={styles.counterLabel}>{stat?.label}</p>
                        </div>
                    ))}
        </div>
    );
};

export default Counter;
