"use client";

import { useState, useEffect } from "react";
import { db } from "@/firebase/firebase";
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { Experience } from "@/types/experience";
import { FaFilter, FaTimes } from "react-icons/fa";
import MaxWidthWrapper from "./ui/MaxWidthWrapper";
import { Loader2 } from "lucide-react";

export default function CommunityClient() {
  const categories = [
    "Phishing",
    "Malware",
    "Social Engineering",
    "Data Breach",
    "Other",
  ];

  const [formData, setFormData] = useState<Omit<Experience, "id">>({
    name: "",
    email: "",
    experience: "",
    category: "Phishing",
    createdAt: Timestamp.now(),
  });

  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const q = query(
      collection(db, "experiences"),
      orderBy("createdAt", "desc")
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const experiencesList: Experience[] = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Experience[];
      setExperiences(experiencesList);
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "experiences"), {
        ...formData,
        createdAt: serverTimestamp(),
      });
      setFormData({
        name: "",
        email: "",
        experience: "",
        category: "Phishing",
        createdAt: Timestamp.now(),
      });
    } catch (error) {
      console.error("Error submitting experience:", error);
      alert("Error submitting experience.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFilter = (category: string) => {
    setSelectedFilters((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredExperiences = selectedFilters.length
    ? experiences.filter((exp) => selectedFilters.includes(exp.category))
    : experiences;

  return (
    <div className="w-full min-h-screen bg-gray-100 text-white p-6 flex flex-col items-center">
      <MaxWidthWrapper>
        <div className="py-20 mx-auto text-center flex flex-col items-center max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-black sm:text-5xl">
            Share Your <span className="text-[#00CFCF]">Cybersecurity Experience</span>.
          </h1>
        </div>
      </MaxWidthWrapper>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-white text-gray-800 p-6 rounded-xl shadow-2xl flex flex-col gap-4 border border-gray-200"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          className="p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email (optional)"
          value={formData.email}
          onChange={handleChange}
          className="p-3 text-sm rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <textarea
          name="experience"
          placeholder="Share your cybersecurity experience..."
          value={formData.experience}
          onChange={handleChange}
          className="p-3 rounded-md bg-gray-100 border border-gray-300 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="p-3 rounded-md bg-gray-100 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition font-semibold flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Posting...
            </>
          ) : (
            "Submit Experience"
          )}
        </button>
      </form>

      <div className="w-full max-w-6xl flex justify-between items-center mt-10">
        <h2 className="text-3xl font-bold text-black">Community Discussions</h2>
        <button
          className="flex items-center gap-2 bg-white text-gray-800 hover:bg-gray-200 p-3 rounded-md transition"
          onClick={() => setDropdownOpen(!isDropdownOpen)}
        >
          <FaFilter /> Filter
        </button>
      </div>

      {isDropdownOpen && (
        <div className="bg-white text-gray-900 p-3 mt-4 rounded-lg shadow-lg flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-3 py-2 rounded-full transition font-medium text-sm ${
                selectedFilters.includes(cat)
                  ? "bg-green-500 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
              }`}
              onClick={() => toggleFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-4">
        {selectedFilters.map((filter) => (
          <div
            key={filter}
            className="flex items-center bg-green-500 text-white px-3 py-2 rounded-full text-sm"
          >
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

      <div className="w-full max-w-6xl mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-300">
        {filteredExperiences.map((exp) => (
          <div
            key={exp.id}
            className="p-5 bg-white text-gray-800 rounded-xl shadow-xl border border-gray-200 transition-transform hover:scale-[1.02]"
          >
            <h3 className="font-semibold text-lg">{exp.name || "Anonymous"}</h3>
            <p className="text-sm text-gray-500">{exp.email}</p>
            <p className="text-sm font-bold text-blue-600">{exp.category}</p>
            <p className="mt-2 text-sm leading-relaxed">{exp.experience}</p>
            <p className="text-xs text-gray-400 mt-2">
              {exp.createdAt instanceof Timestamp
                ? `Posted On - ${exp.createdAt.toDate().toLocaleString()}`
                : "Posted On - just now"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
