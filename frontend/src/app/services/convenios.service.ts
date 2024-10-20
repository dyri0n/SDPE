import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Convenio, ConvenioListaTest, CreateConvenioDTO, DetalleConvenio, DetalleConvenioTest, NuevoConvenio } from '../models/convenios.dto';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConveniosService {
  constructor(private http: HttpClient) { }

  private apiUrl= 'http://localhost:3000/convenios'

  public convenios: Convenio[] = [
    {
      id: 1,
      nombre: "Práctica en Inclusión Educativa",
      centroPractica: "Escuela Especial de Lenguaje 'Palabras Mágicas'",
      inicio: 2023,
      modalidad: "Atención Directa a Estudiantes",
      imagen: "https://images.pexels.com/photos/3184642/pexels-photo-3184642.jpeg",
    },
    {
      id: 2,
      nombre: "Práctica en Apoyo Psicoeducativo",
      centroPractica: "Centro de Atención Integral 'Crecer Juntos'",
      inicio: 2022,
      modalidad: "Intervención en Aula Inclusiva",
      imagen: "https://images.pexels.com/photos/7107430/pexels-photo-7107430.jpeg",
    },
    {
      id: 3,
      nombre: "Práctica en Intervención Educativa",
      centroPractica: "Fundación 'Caminos de Aprendizaje'",
      inicio: 2024,
      modalidad: "Asesoría y Capacitación a Profesores",
      imagen: "https://images.pexels.com/photos/5212337/pexels-photo-5212337.jpeg",
    },
    {
      id: 4,
      nombre: "Práctica en Diversidad Funcional",
      centroPractica: "Colegio Inclusivo 'Diversidad y Aprendizaje'",
      inicio: 2021,
      modalidad: "Desarrollo de Programas Individualizados",
      imagen: "https://dici.uta.cl/wp-content/uploads/2023/03/Ivar-Ramirez--scaled.jpg",
    },
    {
      id: 5,
      nombre: "Práctica en Neuroeducación",
      centroPractica: "Centro Educacional 'Nuevas Oportunidades'",
      inicio: 2023,
      modalidad: "Talleres de Sensibilización",
      imagen: "https://images.pexels.com/photos/5427837/pexels-photo-5427837.jpeg",
    },
  ];

  public detallesConvenios: DetalleConvenio[] = this.convenios.map(convenio => {
    const aprobacion = Math.floor(Math.random() * 101); 
    const reprobacion = 100 - aprobacion; 
    const promedioPracticas = Math.random() * (6.5 - 3) + 3;
    return {
        convenio: convenio,
        practicasRealizadas: Math.floor(Math.random() * 100),
        promedioPracticas: parseFloat(promedioPracticas.toFixed(1)),
        aprobacion: aprobacion, // Porcentaje de aprobación
        reprobacion: reprobacion, 
        linkPdf: "", 
    };
});

  public obtenerConvenios(): Observable<Convenio[]>{
    return of(this.convenios);
  }

  public obtenerConveniosTest(): Observable<ConvenioListaTest[]>{
    return this.http.get<ConvenioListaTest[]>(this.apiUrl + "/")
  }

  public obtenerDetalleConvenio(idConvenio: number): Observable<DetalleConvenio>{
    return of(this.detallesConvenios.find(convenio => convenio.convenio.id == idConvenio)!);
  }

  public obtenerDetalleConvenioTest(idConvenio: number): Observable<DetalleConvenioTest>{
    return this.http.get<DetalleConvenioTest>(this.apiUrl + "/" + idConvenio)
  }

  public eliminarConvenio(idConvenio: number): Observable<any>{
    return this.http.delete(this.apiUrl + "/" + idConvenio)
  }

  //deberia mandarlo al backend
  public nuevoConvenio(convenio:NuevoConvenio){
    console.log(convenio)
  }

  public nuevoConvenioTest(convenioTest:CreateConvenioDTO): Observable<CreateConvenioDTO>{
    console.log(convenioTest)
    return this.http.post<CreateConvenioDTO>(this.apiUrl, convenioTest)
  }
}
