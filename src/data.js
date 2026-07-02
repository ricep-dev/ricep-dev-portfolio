import HeroImage from "/assets/Ricep.jpg";

const Image = {
  HeroImage,
};

export default Image;

import Tools1 from "/assets/tools/vscode.png";
import Tools2 from "/assets/tools/reactjs.png";
import Tools3 from "/assets/tools/nextjs.png";
import Tools4 from "/assets/tools/Vue.png";
import Tools5 from "/assets/tools/flutter.png";
import Tools6 from "/assets/tools/js.png";
import Tools7 from "/assets/tools/nodejs.png";
import Tools8 from "/assets/tools/github.png";
import Tools9 from "/assets/tools/Golang.png";
import Tools10 from "/assets/tools/canva.png";
import Tools11 from "/assets/tools/figma.png";

export const listTools = [
  {
    id: 1,
    gambar: Tools1,
    nama: "Visual Studio Code",
    ket: "Code Editor",
    dad: "100",
  },
  {
    id: 2,
    gambar: Tools2,
    nama: "React JS",
    ket: "Framework",
    dad: "200",
  },
  {
    id: 3,
    gambar: Tools3,
    nama: "Next JS",
    ket: "Framework",
    dad: "300",
  },
  {
    id: 4,
    gambar: Tools4,
    nama: "Vue.Js",
    ket: "Framework",
    dad: "400",
  },
  {
    id: 5,
    gambar: Tools5,
    nama: "Flutter",
    ket: "Framework",
    dad: "500",
  },
  {
    id: 6,
    gambar: Tools6,
    nama: "Javascript",
    ket: "Language",
    dad: "600",
  },
  {
    id: 7,
    gambar: Tools7,
    nama: "Node JS",
    ket: "Javascript Runtime",
    dad: "700",
  },
  {
    id: 8,
    gambar: Tools8,
    nama: "Github",
    ket: "Repository",
    dad: "800",
  },
  {
    id: 9,
    gambar: Tools9,
    nama: "Golang",
    ket: "Programming Language",
    dad: "900",
  },
  {
    id: 10,
    gambar: Tools10,
    nama: "Canva",
    ket: "Design App",
    dad: "1000",
  },
  {
    id: 11,
    gambar: Tools11,
    nama: "Figma",
    ket: "Design App",
    dad: "1100",
  },
];

import Proyek1 from "/assets/proyek/proyekrestaurant.jpg";
import Proyek2 from "/assets/proyek/AR Campus.png";
import Proyek3 from "/assets/proyek/Company Profile.png";
import Proyek4 from "/assets/proyek/proyek4.webp";
import Proyek5 from "/assets/proyek/proyek5.webp";
import Proyek6 from "/assets/proyek/proyek6.webp";

export const listProyek = [
  {
    id: 1,
    gambar: Proyek1,
    nama: "Restaurant Recommendation App",
    desk: "Membangun aplikasi restaurant recommendation berbasis Flutter dan Golang dengan sistem Hybrid Filtering recommendation.",
    tools: ["Flutter", "Reactjs", "Golang", "mysql", "Hybrid Filtering"],
    dad: "200",
  },
  {
    id: 2,
    gambar: Proyek2,
    nama: "Smart Campus Navigation (UI/UX Design)",
    desk: "Desain UI/UX aplikasi navigasi indoor berbasis mobile menggunakan Figma dengan konsep peta interaktif dan Augmented Reality (AR).",
    tools: ["Figma", "UI/UX Design", "Wireframing", "Prototyping", "Design System"],
    dad: "300",
  },
  {
    id: 3,
    gambar: Proyek3,
    nama: "Website Company Profile",
    desk: "Website company profile untuk Ayam Penyet Cabe Ijo AA Sipit yang dirancang dengan desain modern, responsif, dan berfokus pada pengenalan brand serta informasi layanan.",
    tools: ["NextJS", "ReactJS", "TypeScript"],
    dad: "400",
  },
  {
    id: 4,
    gambar: Proyek4,
    nama: "Coming Soon",
    desk: "Proyek ini masih dalam tahap pengembangan. Nantikan versi lengkapnya segera!",
    tools: ["Vite", "ReactJS", "Bootstrap", "AOS"],
    dad: "500",
  },
  {
    id: 5,
    gambar: Proyek5,
    nama: "Coming Soon",
    desk: "Proyek ini masih dalam tahap pengembangan. Nantikan versi lengkapnya segera!",
    tools: ["HTML", "CSS", "Javascript", "Bootsrap"],
    dad: "600",
  },
  {
    id: 6,
    gambar: Proyek6,
    nama: "Coming Soon",
    desk: "Proyek ini masih dalam tahap pengembangan. Nantikan versi lengkapnya segera!",
    tools: ["NextJS", "TailwindCSS", "Framermotion"],
    dad: "700",
  },
];


// ================= CERTIFICATIONS =================

import Certificate1 from "/assets/certifications/Data Enginer Ricep.jpg";
import Certificate2 from "/assets/certifications/aplikasi dan usecase.jpg";
import Certificate3 from "/assets/certifications/ml sertif.jpg";
import Certificate4 from "/assets/certifications/Himatika1.jpg";
import Certificate5 from "/assets/certifications/Himatika2.jpg";
// import Certificate6 from "/assets/certifications/javascript.jpg";

export const listCertifications = [
{
    id: 1,
    gambar: Certificate1,
    nama: "Data Engineer Professional Certification",
    issuer: "RapidMiner (Altair)",
    desk: "A professional certification from RapidMiner (Altair) validating solid experience in Data Engineering competencies, including: Data Access, Basic Transformations, Working with Multiple Data Sets, Pivot Tables, Routines, and Simple Text Processing.",
    credential: "https://ti-user-certificates.s3.amazonaws.com/5733896a-1d71-46e5-b0a3-1ffcf845fe21/d26c65b2-8bc9-48ed-8295-dfc157ac5c1d-ricep-ardiansyah-d07ec8b0-a1a5-4e92-80c0-eee2e0582d55-certificate.pdf",
    skills: [
      "Data Engineering",
      "Data Transformation",
      "RapidMiner",
    ],
    dad: "100",
  },

  {
    id: 2,
    gambar: Certificate2, // Sesuaikan dengan variabel gambar kamu
    nama: "Applications & Use Cases Professional Certification",
    issuer: "RapidMiner (Altair)",
    desk: "A professional certification from RapidMiner (Altair) validating core competency in applying data science, including: Introduction to Machine Learning, CRISP-DM methodology, Use Cases for Machine Learning, Visualization, and Model Management.",
    credential: "https://ti-user-certificates.s3.amazonaws.com/5733896a-1d71-46e5-b0a3-1ffcf845fe21/d26c65b2-8bc9-48ed-8295-dfc157ac5c1d-ricep-ardiansyah-bf3e51a3-665e-4c18-9f7d-e4f417f1cb92-certificate.pdf",
    skills: [
      "Machine Learning",
      "Data Science",
      "CRISP-DM",
      "Data Visualization"
    ],
    dad: "200",
  },

{
    id: 3,
    gambar: Certificate3, // Sesuaikan dengan nama variabel gambar kamu
    nama: "Machine Learning Professional Certification",
    issuer: "RapidMiner (Altair)",
    desk: "A professional certification from RapidMiner (Altair) validating solid experience in core Machine Learning techniques, including: Classification, Regression, Scoring, Validation, Feature Importance, Clustering, and Association Rules.",
    credential: "https://ti-user-certificates.s3.amazonaws.com/5733896a-1d71-46e5-b0a3-1ffcf845fe21/d26c65b2-8bc9-48ed-8295-dfc157ac5c1d-ricep-ardiansyah-1cd3c580-82ec-4574-a972-ea26f19f9596-certificate.pdf", // Silakan isi dengan URL kredensial sertifikat ketiga kamu jika ada
    skills: [
      "Machine Learning",
      "Predictive Modeling",
      "Data Clustering",
      "Feature Engineering"
    ],
    dad: "300",
  },

{
    id: 4,
    gambar: Certificate4, // Sesuaikan dengan nama variabel gambar kamu
    nama: "Certificate of Appreciation: Staff of Research and Technology",
    issuer: "HIMATIKA Universitas Teknologi Yogyakarta",
    desk: "Awarded for the active contribution and dedication as a Staff of Research and Technology (Ristek) within the Informatics Student Association (HIMATIKA) for the 2023/2024 period.",
    credential: "", // Bisa dikosongkan jika tidak ada link sertifikat online
    skills: [
      "Research & Development",
      "Teamwork",
      "Organizational Skills",
      "Public Relations"
    ],
    dad: "400",
  },

{
    id: 5,
    gambar: Certificate5, // Sesuaikan dengan nama variabel gambar kamu
    nama: "Certificate of Appreciation: Staff of Research and Technology (Oracle Cabinet)",
    issuer: "HIMATIKA Universitas Teknologi Yogyakarta",
    desk: "Awarded for the active contribution and dedication as a Staff of Research and Technology (Ristek) within the Informatics Student Association (HIMATIKA) for the 2024/2025 period under the Oracle Cabinet.",
    credential: "", 
    skills: [
      "Research & Development",
      "Project Management",
      "Leadership",
      "Collaboration"
    ],
    dad: "500",
  },

  // {
  //   id: 6,
  //   gambar: Certificate6,
  //   nama: "JavaScript Programming",
  //   issuer: "Dicoding Indonesia",
  //   desk: "Belajar JavaScript modern (ES6+), asynchronous programming, DOM, dan API integration.",
  //   credential: "https://www.dicoding.com/certificates/XXXXXXXX",
  //   skills: [
  //     "JavaScript",
  //     "ES6",
  //     "Frontend",
  //   ],
  //   dad: "600",
  // },
];