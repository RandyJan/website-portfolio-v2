import { create } from "zustand";
import { ProjectVal } from "@/app/segment/portfolio/values";
import { PortfolioState } from "@/app/segment/portfolio/type";

export const PortfolioStore = create<PortfolioState>((set) => ({
  multiple_link: [],
  multiple_link_dialog: false,
  project_dialog: false,
  selected_project: ProjectVal,
  selected_images: [],
  selected_project_index: 0,
  is_loading: false,

  set_multiple_links: (multiple_link) => set({ multiple_link }),
  set_multiple_link_dialog: (multiple_link_dialog) => set({ multiple_link_dialog }),
  set_project_dialog: (project_dialog) => set({ project_dialog }),
  set_selected_project: (selected_project) => set({ selected_project }),
  set_selected_images: (selected_images) => set({ selected_images }),
  set_selected_project_index: (selected_project_index) => set({ selected_project_index }),
  set_is_loading: (is_loading) => set({ is_loading }),
}));
