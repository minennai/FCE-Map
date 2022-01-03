import CARRERAS from "./carreras";
import { COLORS } from "./theme";

export const USER_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdJJNbo0937o6Lb68d9mv6ODu6AGgLBNaiX1Soxc_78-UXndg/formResponse";

export const USER_FORM_ENTRIES = {
  padron: "entry.657244342",
  carrera: "entry.979688332",
  orientacion: "entry.659577924",
  finDeCarrera: "entry.347359543",
};

export const GRAPH_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSfyhLgA-d-ZpjH3sEO7cnCuaVFkd1coNQrZRvOMLCW_OyJjRA/formResponse";

export const GRAPH_FORM_ENTRIES = {
  padron: "entry.1632426062",
  carrera: "entry.982143349",
  map: "entry.151179448",
};

export const BUGS_FORM =
  "https://docs.google.com/forms/d/e/1FAIpQLSdZQBp3MGItCF_qKEZuHwx5D4QOYe8UXH6LX01LFgfpP1eHRg/formResponse";

export const BUGS_FORM_ENTRIES = {
  padron: "entry.361294849",
  carrera: "entry.784231061",
  orientacion: "entry.1472878618",
  finDeCarrera: "entry.914097257",
  bug: "entry.200735557",
};

export const SPREADSHEET =
  "https://sheets.googleapis.com/v4/spreadsheets/1OBZL-dAMRjgDdhmbl11DADyjYK1fzCuNIv7tvkszzu0/values";

export const SHEETS = {
  user: "usuarios",
  registros: "registros",
};

export const KEY = "4/0AX4XfWiXTMWotfsNTQ4lrq14QUJOARrbs6O3j3MKomxNiuhwb8CQwip_AXvYwtLH9BW4lQ";

export const GRUPOS = {
  Aprobadas: { color: COLORS.aprobadas[400] },
  CBC: {
    shape: "hexagon",
    size: 30,
  },
  "*CBC": {
    color: COLORS.aprobadas[100],
    shape: "square",
    size: 15,
  },
  Habilitadas: { color: COLORS.habilitadas[400] },
  "En Final": { color: COLORS.enfinal[400] },
  "Materias Obligatorias": { color: COLORS.obligatorias[400] },
  "Materias Electivas": { color: COLORS.electivas[400] },
  "Fin de Carrera": {
    color: COLORS.findecarrera[400],
    shape: "diamond",
    size: 45,
  },
  "Fin de Carrera (Obligatorio)": {
    color: COLORS.findecarrera[400],
    shape: "diamond",
    size: 45,
  },
  Cursando: { color: COLORS.cursando[500] },
  "A Cursar (1)": { color: COLORS.futuro[100] },
  "A Cursar (2)": { color: COLORS.futuro[200] },
  "A Cursar (3)": { color: COLORS.futuro[300] },
  "A Cursar (4)": { color: COLORS.futuro[400] },
  "A Cursar (5)": { color: COLORS.futuro[500] },
  "A Cursar (6)": { color: COLORS.futuro[600] },
  "A Cursar (7)": { color: COLORS.futuro[700] },
  "A Cursar (8)": { color: COLORS.futuro[800] },
  "A Cursar (9)": { color: COLORS.futuro[900] },
  "A Cursar (10)": { color: COLORS.futuro[1000] },
  ...CARRERAS.filter((c) => c.orientaciones)
    .flatMap((c) => c.orientaciones)
    .reduce(function (map, obj) {
      obj.color = COLORS[obj.colorScheme][500];
      map[obj.nombre] = obj;
      return map;
    }, {}),
};

export const GRAPHOPTIONS = {
  nodes: { shape: "box" },
  interaction: {
    hover: true,
  },
  physics: {
    // Las fisicas del grafo estan desactivadas porque no son compatibles con el atributo .hidden de los nodos individuales
    // Al hacer un batch update de nodos donde cambia el atributo hidden, se rearma todo el grafo, haciendo que ande todo mal
    // La solucion a esto sería no manejar el .hidden a nivel individual, pero a nivel grupo
    // Entonces, se puede tener un grupo nuevo 'HiddenGroup' que tenga hidden en true, y poner que todos los otros grupos tengan hidden en false
    // Asi, el boton de prender y apagar nodos tiene que manejar el grupo, y no directamente el atributo hidden
    // Se puede tener un nuevo atributo custom (nodo._hidden), y que ese atributo sea el que al cambiar haga que el nodo cambie de grupo (en el actualizar() de Node.js)
    // enabled: true
    enabled: false,
    hierarchicalRepulsion: {
      nodeDistance: 90,
    },
    stabilization: {
      iterations: 30,
      fit: true,
    },
  },
  layout: {
    hierarchical: {
      enabled: true,
      levelSeparation: 145,
      treeSpacing: 0,
      edgeMinimization: false,
      direction: "LR",
    },
  },
  edges: {
    arrowStrikethrough: false,
    arrows: {
      to: { enabled: true, scaleFactor: 0.7, type: "arrow" },
    },
    color: { inherit: "from" },
  },
  groups: { ...GRUPOS },
};
