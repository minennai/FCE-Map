import * as data from "./data";
import { COLORS } from "./theme";

export const CARRERAS = [
  {
    id: "administracion",
    link: "http://www.economicas.uba.ar/carreras/administracion/",
    graph: data.administracion,
    nombre: "Administración de Empresas",
    nombrecorto: "Administracion",
    finDeCarrera: [
      { id: "tesis", materia: "70.00" },
      { id: "tpp", materia: "70.99" },
    ],
    creditos: {
      total: 208,
      obligatorias: 178,
      checkbox: [
        {
          nombre: "Estadía Supervisada de al menos 200 horas",
          nombrecorto: "Estadía",
          bg: COLORS.habilitadas[50],
          color: "habilitadas",
        },
      ],
      electivas: { tesis: 12, tpp: 18 },
    },
  },
  {
    id: "contador",
    link: "https://www.fi.uba.ar/grado/carreras/ingenieria-de-alimentos/plan-de-estudios",
    graph: data.contador,
    nombre: "Contador Publico",
    nombrecorto: "Contador",
    creditos: {
      total: 234,
      materias: [
        {
          id: "76.44",
          nombrecorto: "pp",
          bg: COLORS.habilitadas[50],
          color: "habilitadas",
        },
        {
          id: "76.90",
          nombrecorto: "tesis",
          bg: COLORS.findecarrera[50],
          color: "findecarrera",
        },
      ],
      obligatorias: 208,
      electivas: 10,
    },
  },
  {
    id: "sistemas",
    link: "https://www.fi.uba.ar/grado/carreras/ingenieria-civil/plan-de-estudios",
    graph: data.sistemas,
    nombre: "Licenciatura en Sistemas de Información de las Organizaciones",
    nombrecorto: "Sistemas",
    creditos: {
      total: 257,
      obligatorias: 210,
      electivas: 34,
      materias: [
        {
          id: "84.99",
          nombrecorto: "TPP",
          bg: COLORS.findecarrera[50],
          color: "findecarrera",
        },
      ],
      checkbox: [
        {
          nombre: "Estadía Supervisada de al menos 200 horas",
          nombrecorto: "Estadía",
          bg: COLORS.habilitadas[50],
          color: "habilitadas",
        },
        {
          nombre: "Prueba de nivel de idioma inglés",
          nombrecorto: "Inglés",
          bg: COLORS.enfinal[50],
          color: "enfinal",
        },
      ],
    },
  },
  {
    id: "actuarioeco",
    link: "https://www.fi.uba.ar/grado/carreras/ingenieria-electricista/plan-de-estudios",
    graph: data.actuarioeco,
    nombre: "Actuario - Economía",
    nombrecorto: "Actuario E",
    finDeCarrera: [
      { id: "tesis", materia: "85.00" },
      { id: "tpp", materia: "85.99" },
    ],
    creditos: {
      total: 242,
      obligatorias: 206,
      checkbox: [
        {
          nombre: "Estadía Supervisada de al menos 200 horas",
          nombrecorto: "Estadía",
          bg: COLORS.habilitadas[50],
          color: "habilitadas",
        },
        {
          nombre: "Prueba de nivel de idioma inglés",
          nombrecorto: "Inglés",
          bg: COLORS.enfinal[50],
          color: "enfinal",
        },
      ],
      electivas: { tesis: 16, tpp: 22 },
    },
  },
  {
    id: "actuarioadmin",
    link: "https://www.fi.uba.ar/grado/carreras/ingenieria-electronica/plan-de-estudios",
    graph: data.actuarioadmin,
    nombre: "Actuario - Administración",
    nombrecorto: "Actuario A",
    orientaciones: [
      { nombre: "Procesamiento de Señales", colorScheme: "orientacion1" },
      { nombre: "Automatización y Control", colorScheme: "orientacion2" },
      { nombre: "Física Electrónica", colorScheme: "orientacion3" },
      { nombre: "Telecomunicaciones", colorScheme: "orientacion4" },
      {
        nombre: "Sistemas Digitales y Computación",
        colorScheme: "orientacion5",
      },
      { nombre: "Multimedia", colorScheme: "orientacion6" },
      { nombre: "Instrumentación Biomédica", colorScheme: "orientacion7" },
      { nombre: "Multiples Orientaciones", colorScheme: "orientacion8" },
    ],
    finDeCarrera: [
      { id: "tesis", materia: "86.00" },
      { id: "tpp", materia: "86.99" },
    ],
    creditos: {
      total: 240,
      obligatorias: 166,
      electivas: 56,
      checkbox: [
        {
          nombre: "Práctica  Profesional",
          nombrecorto: "PP",
          bg: COLORS.habilitadas[50],
          color: "habilitadas",
        },
        {
          nombre: "Prueba de nivel de idioma inglés",
          nombrecorto: "Inglés",
          bg: COLORS.enfinal[50],
          color: "enfinal",
        },
      ],
    },
  },
  {
    id: "economia",
    link: "https://www.fi.uba.ar/grado/carreras/ingenieria-industrial/plan-de-estudios",
    graph: data.economia,
    nombre: "Licenciatura en Economía",
    nombrecorto: "Economía",
    finDeCarrera: [
      { id: "tesis", materia: "92.00" },
      { id: "tpp", materia: "92.99" },
    ],
    creditos: {
      total: 245,
      obligatorias: 196,
      materias: [
        {
          id: "HUM",
          nombrecorto: "Humanística",
          bg: COLORS.orientacion1[50],
          color: "orientacion1",
        },
      ],
      checkbox: [
        {
          nombre: "Práctica Profesional de al menos 200 horas",
          nombrecorto: "PP",
          bg: COLORS.habilitadas[50],
          color: "habilitadas",
        },
        {
          nombre: "Prueba de nivel de idioma inglés",
          nombrecorto: "Inglés",
          bg: COLORS.enfinal[50],
          color: "enfinal",
        },
      ],
      electivas: 32,
    },
  },
];

export default CARRERAS;
