
import React from 'react';

const ProjectsSection = () => {
  return (
    <div className="relative bg-white">
      {/* Top Gradient */}
      <div
        className="absolute inset-x-0 top-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-7 py-40 skew-y-0 opacity-30"
          style={{
            clipPath:
              'polygon(40% 0, 60% 0%, 100% 50%, 100% 50%, 100% 100%, 60% calc(50% + 16px), 40% 100%, 0 100%, 0 50%, 0% 50%)',
          }}
        />
      </div>

      {/* Bottom Gradient */}
      <div
        className="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden opacity-30 blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] px-7 py-40 skew-y-0 opacity-30"
          style={{
            clipPath:
              'polygon(30% 0%, 70% 0%, 100% 30%, 100% 60%, 73% 100%, 27% 100%, 0 60%, 0 30%)',
          }}
        />
      </div>

      {/* Projects Section Content */}
      <div className="mx-auto max-w-7xl px-6 pt-20 pb-32 sm:pt-24 sm:pb-40 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            My Projects
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </div>
        <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-8 lg:grid-cols-3">
          {/* Project Cards Go Here */}
        </div>
      </div>
    </div>
  );
};

export default ProjectsSection;
