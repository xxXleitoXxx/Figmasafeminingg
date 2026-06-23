import { Role } from "../context/AuthContext";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  roles: Role[];
  isActive: boolean;
}

export const manualConfig = {
  admin: "https://example.com/manual-safemining-admin.pdf",
  company: "https://example.com/manual-safemining-company.pdf",
  coordinator: "https://example.com/manual-safemining-coordinator.pdf",
  employee: "https://example.com/manual-safemining-employee.pdf"
};

export const mockFaqs: FAQ[] = [
  {
    id: "f1",
    question: "¿Cómo asigno un programa a un empleado?",
    answer: "Para asignar un programa, diríjase a la sección de 'Programas', seleccione el programa deseado y haga clic en 'Asignar'. Luego, busque y seleccione a los empleados correspondientes.",
    roles: ["company", "coordinator"],
    isActive: true,
  },
  {
    id: "f2",
    question: "¿Cómo puedo descargar mi certificado de finalización?",
    answer: "Una vez que haya completado un programa y aprobado todas sus simulaciones y exámenes, diríjase a 'Mis Certificados' desde el menú principal para descargar su comprobante.",
    roles: ["employee"],
    isActive: true,
  },
  {
    id: "f3",
    question: "¿Qué debo hacer si una simulación VR no carga?",
    answer: "Asegúrese de tener una conexión estable a internet y de que sus gafas VR estén actualizadas. Si el problema persiste, reinicie el dispositivo e intente de nuevo.",
    roles: ["company", "coordinator", "employee"],
    isActive: true,
  },
  {
    id: "f4",
    question: "¿Cómo doy de alta una nueva empresa?",
    answer: "Desde el Panel de Administración, vaya a 'Empresas' y seleccione 'Nueva Empresa'. Complete los datos requeridos y asigne un Administrador de Empresa.",
    roles: ["admin"],
    isActive: true,
  },
  {
    id: "f5",
    question: "¿Cuáles son los requisitos mínimos para el hardware VR?",
    answer: "Recomendamos visores Meta Quest 2 o superiores, con al menos 64GB de almacenamiento y conexión Wi-Fi de 5GHz para una sincronización fluida de los resultados.",
    roles: ["admin", "company", "coordinator"],
    isActive: true,
  },
  {
    id: "f6",
    question: "¿Puedo pausar una simulación y continuarla después?",
    answer: "Actualmente, por cuestiones de evaluación de seguridad, las simulaciones deben completarse en una única sesión. Si retira el visor o sale antes de finalizar, se contará como un intento.",
    roles: ["employee", "coordinator"],
    isActive: true,
  },
  {
    id: "f7",
    question: "¿Cómo genero un reporte de progreso de mi equipo?",
    answer: "Diríjase a la sección de 'Reportes' en el menú principal, seleccione el grupo que desea evaluar, defina el rango de fechas y haga clic en 'Exportar' (PDF o Excel).",
    roles: ["company", "coordinator"],
    isActive: true,
  }
];

export const getFaqsByRole = (role: Role) => mockFaqs.filter(f => f.isActive && f.roles.includes(role));
