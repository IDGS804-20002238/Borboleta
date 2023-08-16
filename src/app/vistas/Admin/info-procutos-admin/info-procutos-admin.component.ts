import { Component, OnInit} from '@angular/core';
import { ProyectoApiService } from '../../../proyecto-api.service';
import { DetallePorProductoId } from '../../../models/modelo-general.model';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-info-procutos-admin',
  templateUrl: './info-procutos-admin.component.html',
  styleUrls: ['./info-procutos-admin.component.css']
})
export class InfoProcutosAdminComponent implements OnInit {
  DetallePorProductoId: DetallePorProductoId[] = [];

  currentPage = 1;
  pageSize = 10; // Cantidad de elementos por página
  totalPages = 0;

  constructor(private proyectoApiService: ProyectoApiService) { }
  ngOnInit(): void {
    this.obtenerDetalle();
  }

  // Método para manejar cambios de página
  pageChanged(event: any, action: string): void {
    if (action === 'next') {
      this.currentPage++;
    } else if (action === 'previous') {
      this.currentPage--;
    }
    this.obtenerDetalle(); // Actualizar los datos de la tabla según la página actual
  }

  obtenerDetalle(): void {
    const selectedMatPrima = localStorage.getItem('selectedMatPrima'); 
    if (selectedMatPrima) {
      const parsedSelectedMatPrima = JSON.parse(selectedMatPrima); 
      const idProducto = parsedSelectedMatPrima.idProducto; 
  
      const data = {
        idProducto: idProducto
      };
  
      this.proyectoApiService.getIdProductoDetalle(data).subscribe(
        (data) => {
          this.DetallePorProductoId = data; 

        // Calcular totalPages basado en el tamaño del array y pageSize
        this.totalPages = Math.ceil(data.length / this.pageSize);
        console.log(this.totalPages);
        },
        (error) => {
          console.error('Error al obtener el detalle del producto', error);
        }
      );
    }
  }
  

  

}
