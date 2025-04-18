"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { Experience } from "@/types/experience";

export default function CommunityPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]); // Multi-category filter

  useEffect(() => {
    const fetchExperiences = async () => {
      let q;
      if (selectedCategories.length === 0) {
        // Fetch all discussions if no filter is applied
        q = query(collection(db, "experiences"), orderBy("createdAt", "desc"));
      } else {
        // Fetch discussions matching selected categories
        q = query(
          collection(db, "experiences"),
          where("category", "in", selectedCategories), // Filtering based on multiple categories
          orderBy("createdAt", "desc")
        );
      }

      const querySnapshot = await getDocs(q);
      const experiencesList: Experience[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Experience),
      }));
      setExperiences(experiencesList);
    };

    fetchExperiences();
  }, [selectedCategories]); // Refetch when categories change

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category) // Remove if already selected
        : [...prev, category] // Add if not selected
    );
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Community Discussions</h2>

      {/* Category Filter */}
      <div className="mb-4 flex flex-wrap gap-2">
        {["Phishing", "Malware", "Social Engineering", "Data Breach", "Other"].map((category) => (
          <label key={category} className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category)}
              onChange={() => handleCategoryChange(category)}
              className="w-4 h-4"
            />
            <span>{category}</span>
          </label>
        ))}
      </div>

      {/* Display Filtered Discussions */}
      <div className="space-y-4">
        {experiences.length > 0 ? (
          experiences.map((exp) => (
            <div key={exp.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="font-semibold">{exp.name || "Anonymous"}</h3>
              <p className="text-sm text-gray-400">{exp.category}</p>
              <p className="mt-2">{exp.experience}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">No discussions found for selected categories.</p>
        )}
      </div>
    </div>
  );
}
