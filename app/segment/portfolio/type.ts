export interface ProjectType {
  name: string;
  project_link: string;
  project_logo: string;
  description: string;
  long_description: string;
  technology: string[];
  platform: string[];
  status: string[];
  type: string;
  role: string[];
  source_code: LinkItem[]
  images_path: string;
  images_num_web: number;
  images_num_mobile?: number;
  demo_accounts?: { role: string; username: string; password: string }[];
  higlights: string[];
  isWebFirst: boolean;
}

export interface LinkItem {
  Frontend?: string;
  Backend?: string;
  Mobile?: string;
  source_code?: string;
}

export interface PortfolioState {
  multiple_link: LinkItem[];
  multiple_link_dialog: boolean;
  project_dialog: boolean;
  selected_project: ProjectType;
  selected_images: any;
  selected_project_index: number;
  is_loading: boolean;

  set_multiple_links: (multiple_link: LinkItem[]) => void;
  set_multiple_link_dialog: (multiple_link_dialog: boolean) => void;
  set_project_dialog: (project_dialog: boolean) => void;
  set_selected_project: (selected_project: ProjectType) => void;
  set_selected_images: (selected_images: any) => void;
  set_selected_project_index: (selected_project_index: any) => void;
  set_is_loading: (is_loading: boolean) => void;
}
