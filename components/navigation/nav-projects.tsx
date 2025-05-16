import type { IProject } from "@/types/navigation";

export function NavProjects({ projects }: { projects: IProject[] }) {
  return (
    <div className="py-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-sm text-zinc-700 dark:text-zinc-400">
        <div className="mt-2 space-y-2">
          {projects.map((project) => (
            <a
              key={project.name}
              href={project.url}
              className="group relative flex items-center gap-2 rounded-md p-2 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="relative h-4 w-4 rounded-full bg-zinc-500">
                <span className="absolute -inset-1 animate-ping rounded-full bg-zinc-500 opacity-75"></span>
              </div>
              <span className="font-medium text-zinc-700 group-hover:text-zinc-900 dark:text-zinc-400 dark:group-hover:text-zinc-100">
                {project.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
