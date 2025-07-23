import { TableItemProps, CardProps } from "./components";
import { Ellipsis, Heart } from "lucide-react";

export const SUMMARY = {
  first_name: "Breeana",
  last_name: "Payton",
  title: "Senior Frontend Engineer",
  interest: ["Software Engineering", "Photograhy", "Web Design"],
  location: "Richmond, VA, USA",
  email: "bree@breethedev.com",
};

export const SECTIONS = {
  ABOUT: {
    title: "About Me",
    description: "A passionate software engineer with a love for creating innovative solutions.",
    path: "/about",
  },
  EXPERIENCE: {
    title: "Experience",
    description:
      "Over 5 years of experience in full-stack development, specializing in React and Node.js.",
    path: "/experience",
  },
  SKILLS: {
    title: "Skills",
    description: "Proficient in JavaScript, TypeScript, React, Node.js, and more.",
    path: "/skills",
  },
  PROJECTS: {
    title: "Projects",
    description: "A portfolio of projects showcasing my skills and creativity.",
    path: "/projects",
  },
  CONTACT: {
    title: "Contact",
    description: "Feel free to reach out for collaborations or inquiries.",
    path: "/contact",
  },
};

export const SectionNames = {
  ABOUT: "About",
  EXPERIENCE: "Experience",
  SKILLS: "Skills",
  PROJECTS: "Projects",
  INTERESTS: "Interests",
};

export const TOP_FIVE_MEMOS: TableItemProps[] = [
  {
    id: "1",
    name: "Memo 1",
    description: "This is the first memo.",
    // image: "/images/memo1.jpg",
    icons: [Ellipsis, Heart],
  },
  {
    id: "2",
    name: "Memo 2",
    description: "This is the second memo.",
    // image: "/images/memo2.jpg",
    icons: [Ellipsis, Heart],
  },
  {
    id: "3",
    name: "Memo 3",
    description: "This is the third memo.",
    // image: "/images/memo3.jpg",
    icons: [Ellipsis, Heart],
  },
  {
    id: "4",
    name: "Memo 4",
    description: "This is the fourth memo.",
    // image: "/images/memo4.jpg",
    icons: [Ellipsis, Heart],
  },
  {
    id: "5",
    name: "Memo 5",
    description: "This is the fifth memo.",
    // image: "/images/memo5.jpg",
    icons: [Ellipsis, Heart],
  },
];

export const PROJECTS: CardProps[] = [
  {
    // image: "/images/project1.jpg",
    title: "The Melodi Project",
    description: "See here",
    // link: "/projects/melodi",
  },
  {
    // image: "/images/project2.jpg",
    title: "Dev Blocks",
    description: "See here",
    // link: "/projects/melodi",
  },
  {
    // image: "/images/project3.jpg",
    title: "The Ave",
    description: "See here",
    // link: "/projects/melodi",
  },
  {
    // image: "/images/project4.jpg",
    title: "Le Cache Dulcet",
    description: "See here",
    // link: "/projects/melodi",
  },
];

export const EXPERIENCE: CardProps[] = [
  {
    // image: "/images/experience1.jpg",
    title: "AutoZone",
    description: "Developed and maintained web applications using React and TypeScript.",
    size: ["400px", "200px"],
    // link: "/experience/xyz-corp",
  },
  {
    // image: "/images/experience2.jpg",
    title: "AT&T",
    description: "Worked on both frontend and backend development using Node.js and React.",
    size: ["400px", "200px"],
    // link: "/experience/abc-inc",
  },
];
