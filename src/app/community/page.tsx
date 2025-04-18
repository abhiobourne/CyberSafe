"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Experience } from "@/types/experience";
import { FaFilter, FaTimes } from "react-icons/fa";
import MaxWidthWrapper from "../components/ui/MaxWidthWrapper";
import Chatbot from "../components/Chatbot";

export default function CommunityPage() {
  const categories = ["Phishing", "Malware", "Social Engineering", "Data Breach", "Other"];
  const [formData, setFormData] = useState<Experience>({
    name: "",
    email: "",
    experience: "",
    category: "Phishing",
    createdAt: new Date(),
  });
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const q = query(collection(db, "experiences"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const experiencesList: Experience[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Experience),
      }));
      setExperiences(experiencesList);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "experiences"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setFormData({ name: "", email: "", experience: "", category: "Phishing", createdAt: new Date() });
    } catch (error) {
      console.error("Error submitting experience:", error);
      alert("Error submitting experience.");
    }
  };
  
  const toggleFilter = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
  );
};

  const filteredExperiences = selectedFilters.length
    ? experiences.filter((exp) => selectedFilters.includes(exp.category))
    : experiences;

  return (
<>
    <div className="w-full min-h-screen bg-[#0F172A] text-white p-6 flex flex-col items-center">
      {/* Form Section */}
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Share Your <span className="text-blue-600">Cybersecurity Experience</span>.
          </h1>
        </div>
      </MaxWidthWrapper>
      <form onSubmit={handleSubmit} className="w-full max-w-2xl bg-[#1E293B] p-6 rounded-lg shadow-lg flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded bg-[#334155] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="p-3 text-sm rounded bg-[#334155] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="experience"
          placeholder="Share your cybersecurity experience..."
          value={formData.experience}
          onChange={handleChange}
          className="p-3 rounded bg-[#334155] border border-gray-600 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded bg-[#334155] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition font-semibold">
          Submit Experience
        </button>
      </form>

      {/* Community Discussions & Filter Section */}
      <div className="w-full max-w-4xl flex justify-between items-center mt-8">
        <h2 className="text-3xl font-bold">Community Discussions</h2>
        <button
          className="flex items-center gap-2 bg-[#334155] hover:bg-[#475569] text-white p-3 rounded transition"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <FaFilter /> Filter
        </button>
      </div>
      {isDropdownOpen && (
        <div className="bg-[#1E293B] p-3 mt-4 rounded-lg shadow-lg flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-2 rounded-full transition ${selectedFilters.includes(cat) ? "bg-green-500 text-white" : "bg-[#334155] text-gray-300 hover:bg-green-500"}`}
              onClick={() => toggleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Selected Filters Display */}
      <div className="flex flex-wrap gap-2 mt-4">
        {selectedFilters.map((filter) => (
          <div key={filter} className="flex items-center bg-green-500 text-white px-3 py-2 rounded-full">
            {filter}
            <button
              className="ml-2 text-white hover:text-red-500"
              onClick={() => toggleFilter(filter)}
            >
              <FaTimes />
            </button>
          </div>
        ))}
      </div>

      {/* Filtered Experiences */}
      <div className="w-full max-w-4xl mt-6 space-y-4">
        {filteredExperiences.map((exp) => (
          <div key={exp.id} className="p-4 bg-[#1E293B] rounded-lg shadow-md">
            <h3 className="font-semibold">{exp.name || "Anonymous"}</h3>
            <p className="text-sm text-gray-400">{exp.email}</p>
            <p className="font-bold">{exp.category}</p>
            <p className="mt-2">{exp.experience}</p>
            <p className="text-sm text-gray-400">Posted On - {new Date(exp.createdAt.seconds * 1000).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  );
}