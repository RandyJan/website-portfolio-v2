"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faLayerGroup,
  faLink,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobalStore } from "@/app/GlobalStore";
import { PortfolioStore } from "@/app/segment/portfolio/store";
import { ProjectType } from "@/app/segment/portfolio/type";
import { useProjectsContent } from "@/lib/content-store";

function getProjectPreview(project: ProjectType) {
  const previewType =
    project.isWebFirst && project.images_num_web > 0
      ? "web"
      : project.images_num_mobile && project.images_num_mobile > 0
        ? "mobile"
        : project.images_num_web > 0
          ? "web"
          : null;

  if (!previewType) {
    return null;
  }

  return `${project.images_path}/${previewType}/1.png`;
}

function getBriefDescription(project: ProjectType) {
  if (project.long_description.length <= 135) {
    return project.long_description;
  }

  return `${project.long_description.slice(0, 132).trim()}...`;
}

export default function Carousel() {
  const { is_dark } = GlobalStore();
  const {
    set_selected_project,
    set_multiple_links,
    set_multiple_link_dialog,
    set_project_dialog,
    set_selected_project_index,
  } = PortfolioStore();

  const { data: projects } = useProjectsContent();

  return (
    <div
      className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
      data-aos="fade-up"
      data-aos-delay="180"
      data-aos-duration="600"
    >
      {projects.map((project, index) => {
        const previewImage = getProjectPreview(project);

        return (
          <Card
            key={project.name}
            className="overflow-hidden rounded-[1.75rem] border border-slate-200/80 bg-white/80 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_28px_70px_rgba(14,165,233,0.18)] dark:border-white/10 dark:bg-slate-950/70"
          >
            <CardContent className="h-full p-0">
              <div className="flex h-full flex-col bg-gradient-to-b from-white to-slate-50 dark:from-slate-950 dark:to-slate-900">
                <div className="relative h-56 overflow-hidden border-b border-slate-200/80 bg-slate-100 dark:border-white/10 dark:bg-slate-900">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt={`${project.name} preview`}
                      className="h-full w-full object-cover object-top transition duration-500 hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-sky-100 to-orange-100 text-slate-500 dark:from-slate-800 dark:to-slate-900 dark:text-slate-300">
                      Preview unavailable
                    </div>
                  )}

                  <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-slate-950/75 to-transparent px-4 pb-4 pt-10 text-white">
                    <Badge className="bg-white/15 text-white backdrop-blur-sm">
                      {project.type}
                    </Badge>
                    <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium backdrop-blur-sm">
                      {project.platform.join(" / ")}
                    </span>
                  </div>
                </div>

                <div className="flex h-full flex-col p-6">
                  <div className="grow">
                    <p className="text-2xl font-semibold text-slate-950 dark:text-white">
                      {project.name}
                    </p>

                    <div className="mt-3 flex items-center gap-2 text-sm text-sky-700 dark:text-sky-300">
                      <FontAwesomeIcon icon={faLayerGroup} />
                      <span>{project.description}</span>
                    </div>

                    <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">
                      {getBriefDescription(project)}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-2">
                      {project.technology.slice(0, 4).map((item) => (
                        <Badge
                          key={`${project.name}-${item}`}
                          className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"
                        >
                          {item}
                        </Badge>
                      ))}
                      {project.technology.length > 4 ? (
                        <Badge className="bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                          +{project.technology.length - 4} more
                        </Badge>
                      ) : null}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-row items-center justify-center gap-3">
                    {!Array.isArray(project.source_code) && project.source_code ? (
                      <a
                        href={project.source_code}
                        target="_blank"
                        className="grow text-sky-500 enlarge"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faGithub} size="2xl" />
                      </a>
                    ) : project.source_code.length > 0 ? (
                      <FontAwesomeIcon
                        icon={faGithub}
                        size="2xl"
                        className="grow cursor-pointer text-sky-500 enlarge"
                        onClick={() => {
                          set_multiple_links(project.source_code);
                          set_multiple_link_dialog(true);
                        }}
                      />
                    ) : null}

                    <button
                      onClick={() => {
                        set_selected_project(project);
                        set_project_dialog(true);
                        set_selected_project_index(index);
                      }}
                      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-300 enlarge ${
                        is_dark
                          ? "border border-white/15 bg-white/5 text-white hover:bg-white/10"
                          : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      <FontAwesomeIcon icon={faEye} />
                      <span>View</span>
                    </button>

                    {project.project_link ? (
                      <a
                        href={project.project_link}
                        target="_blank"
                        className="grow text-sky-500 enlarge"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faLink} size="2xl" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
