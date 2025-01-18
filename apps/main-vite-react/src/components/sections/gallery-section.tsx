import { motion } from "motion/react";

export default function GallerySection() {
  return (
    <section
      id="gallery"
      className="bg-indigo-900 bg-opacity-30 py-20"
      aria-hidden="true"
    >
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold">Gallery</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
            >
              <img
                src={"https://placehold.co/1280x780/png"}
                alt={`Game Screenshot ${index + 1}`}
                style={{ objectFit: "cover" }}
                className="transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50">
                <span className="text-lg font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  View Full Size
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
