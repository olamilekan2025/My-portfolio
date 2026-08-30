// "use client";

// import { motion } from "framer-motion";
// import { Code2, Database, Layout, Server, Smartphone, Globe } from "lucide-react";

// const skillCategories = [
//   {
//     icon: Code2,
//     title: "Frontend Development",
//     skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
//   },
//   {
//     icon: Server,
//     title: "Backend Development",
//     skills: ["Node.js", "Express", "API Design", "REST", "GraphQL"],
//   },
//   {
//     icon: Database,
//     title: "Database & Storage",
//     skills: ["MongoDB", "PostgreSQL", "Redis", "Firebase", "Prisma"],
//   },
//   {
//     icon: Layout,
//     title: "UI/UX Design",
//     skills: ["Figma", "Adobe XD", "Design Systems", "Prototyping", "User Research"],
//   },
 
//   {
//     icon: Globe,
//     title: "DevOps & Tools",
//     skills: ["Git", "Docker", "CI/CD", "Vercel", "AWS"],
//   },
// ];

// export function AboutSkills() {
//   return (
//     <div className="mt-20">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <h3 className="text-3xl font-bold tracking-tight mb-4">
//           Technical Expertise
//         </h3>
//         <p className="text-muted-foreground max-w-2xl mx-auto">
//           A comprehensive toolkit of modern technologies and methodologies I use to build exceptional digital products
//         </p>
//       </motion.div>

//       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
//         {skillCategories.map((category, index) => {
//           const Icon = category.icon;
//           return (
//             <motion.div
//               key={category.title}
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ delay: index * 0.1, duration: 0.5 }}
//               className="group rounded-2xl border border-border/50 bg-muted/30 p-6 hover:border-primary/50 hover:bg-muted/50 transition-all duration-300"
//             >
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
//                   <Icon className="h-6 w-6 text-primary" />
//                 </div>
//                 <h4 className="text-lg font-semibold">{category.title}</h4>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {category.skills.map((skill) => (
//                   <span
//                     key={skill}
//                     className="inline-flex items-center rounded-full border border-border/50 bg-background/50 px-3 py-1 text-xs font-medium text-foreground"
//                   >
//                     {skill}
//                   </span>
//                 ))}
//               </div>
//             </motion.div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }
