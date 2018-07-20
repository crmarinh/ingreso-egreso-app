import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { IngresoEgreso } from '../ingreso-egreso.model';
import { Subscription } from '../../../../node_modules/rxjs';
import { IngresoEgresoService } from '../ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy {
  items: IngresoEgreso[];
  subscription: Subscription = new Subscription();

  constructor(private store : Store<AppState>,
              public ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.store.select('ingrsoEgreso')
      .subscribe(ingresoEgreso=>{
        this.items = ingresoEgreso.items;
      })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  borrarItem( item: IngresoEgreso ){
    this.ingresoEgresoService.borrarIngresoEgreso(item.uid).then(()=>{
        Swal('Eliminado', item.descripcion, 'success');
    });
  }

}
