"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Masonry from "react-masonry-css";
import { ExternalLink, Eye, FolderOpen } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  link?: string;
}

const breakpointColumns = {
  default: 3,
  1100: 2,
  700: 1,
};

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/projects");
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
      // Fallback projects for demo
      setProjects([
        {
          id: "1",
          title: "Brand Identity - TechStart",
          description: "Complete brand identity design including logo, color palette, and brand guidelines for a tech startup.",
          imageUrl: "https://images.unsplash.com/photo-1634942537034-2531766767d1?w=600&h=800&fit=crop",
          category: "Graphic Design",
        },
        {
          id: "2",
          title: "E-commerce Platform",
          description: "Full-stack e-commerce solution with React, Node.js, and Stripe integration.",
          imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
          category: "Development",
        },
        {
          id: "3",
          title: "Mobile App UI Kit",
          description: "Comprehensive UI kit for a fitness tracking mobile application.",
          imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=700&fit=crop",
          category: "UI/UX Design",
        },
        {
          id: "4",
          title: "Corporate Website",
          description: "Modern corporate website built with Next.js and Tailwind CSS.",
          imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=500&fit=crop",
          category: "Development",
        },
        {
          id: "5",
          title: "Social Media Campaign",
          description: "Visual assets and templates for a comprehensive social media marketing campaign.",
          imageUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop",
          category: "Graphic Design",
        },
        {
          id: "6",
          title: "Dashboard Analytics",
          description: "Real-time analytics dashboard with data visualization and reporting features.",
          imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=450&fit=crop",
          category: "Development",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  if (isLoading) {
    return (
      <section id="projects" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Recent <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A showcase of my latest work across design and development.
            Each project represents a unique challenge and creative solution.
          </p>
        </motion.div>

        {/* Projects Grid */}
        {projects.length === 0 ? (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FolderOpen className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">No projects yet. Check back soon!</p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Masonry
              breakpointCols={breakpointColumns}
              className="masonry-grid"
              columnClassName="masonry-grid-column"
            >
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  variants={itemVariants}
                  className="mb-4"
                >
                  <motion.div
                    className="group relative overflow-hidden rounded-2xl glass-card cursor-pointer"
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => setSelectedProject(project)}
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={project.imageUrl}
                        alt={project.title}
                        className="w-full h-auto object-cover"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.5 }}
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      {/* View Button */}
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <Badge variant="secondary" className="mb-2">
                        {project.category}
                      </Badge>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {project.description}
                      </p>
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </Masonry>
          </motion.div>
        )}

        {/* Project Dialog */}
        <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
            {selectedProject && (
              <>
                <DialogHeader>
                  <DialogTitle className="text-2xl">{selectedProject.title}</DialogTitle>
                  <DialogDescription>
                    <Badge variant="secondary" className="mt-2">
                      {selectedProject.category}
                    </Badge>
                  </DialogDescription>
                </DialogHeader>
                <div className="mt-4">
                  <img
                    src={selectedProject.imageUrl}
                    alt={selectedProject.title}
                    className="w-full h-auto rounded-lg mb-4"
                  />
                  <p className="text-muted-foreground mb-6">
                    {selectedProject.description}
                  </p>
                  {selectedProject.link && (
                    <Button asChild className="w-full">
                      <a
                        href={selectedProject.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Live Project
                        <ExternalLink className="ml-2 w-4 h-4" />
                      </a>
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
}
