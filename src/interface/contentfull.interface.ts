export interface IContentfull {
  sys: Sys;
  total: number;
  skip: number;
  limit: number;
  items: Item[];
}

export interface Item {
  metadata: Metadata;
  sys: Sys;
  fields: Fields;
}

export interface Fields {
  experiencia: Experiencia[];
  stackTecnologico: StackTecnologico[];
  proyectos: Proyectos[];
}

export interface Proyectos {
  proyectos: Proyecto[];
}

export interface Proyecto {
  titulo: string;
  descripcion: string;
  imagen: string;
  tecnologias: string;
  link: string;
  github: string;
}

export interface StackTecnologico {
  stack: Stack;
}

export interface Stack {
  frontend: Frontend[];
  backend_and_tools: BackendAndTool[];
  metodologias: string[];
}

export interface BackendAndTool {
  name: string;
  type: string;
}

export interface Frontend {
  name: string;
  level: string;
  icon: string;
}

export interface Experiencia {
  id: string;
  empresa: string;
  puesto: string;
  periodo: string;
  descripcion: string;
  tecnologias: string[];
  logros: string[];
}

export interface Sys {
  space: [Object];
  id: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  environment: [Object];
  publishedVersion: number;
  revision: number;
  contentType: [Object];
  locale: string;
}

export interface Metadata {
  tags: [];
  concepts: [];
}
