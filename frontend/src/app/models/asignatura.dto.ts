export interface AsignaturaFluxograma {
    idAsignatura: number;
    idPlan: number;
    areaFormacion: string;
    asignatura: {
        id: number;
        codigo: string;
        nombre: string;
        descripcion: string;
        linkSyllabus: string;
        unidad: string;
    };
    caracter: string;
    posicion: number;
    semestre: number;
    esRequeridaEn: {
        idAsignaturaTributada: number;
    }[];
    esTributadaEn: {
        idAsignaturaRequerida: number;
    }[];
}