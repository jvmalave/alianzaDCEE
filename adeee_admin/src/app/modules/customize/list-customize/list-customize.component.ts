import { Component, OnInit } from '@angular/core';
import { CustomizeService, Config } from '../services/customize.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Si usas ng-bootstrap para modal
import { FormBuilder, FormGroup, Validators } from '@angular/forms';




@Component({
  selector: 'app-list-customize',
  templateUrl: './list-customize.component.html',
  styleUrls: ['./list-customize.component.scss']
})
export class ListCustomizeComponent implements OnInit {

  config: Config | null = null;
  isLoading$ = this.customizeService.isLoading$;

  // Formulario y control modal
  editForm!: FormGroup;
  editingParam: 'tasaCambio' | 'porcIva' | null = null;

  constructor(
    private customizeService: CustomizeService,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadConfig();
  }

  loadConfig() {
    this.customizeService.getConfig().subscribe({
      next: data => this.config = data,
      error: err => console.error('Error cargando configuración', err)
    });
  }

  // Abrir modal de edición
  openEditModal(content: any, param: 'tasaCambio' | 'porcIva') {
    this.editingParam = param;

    // Inicializar formulario según parámetro a editar
    if (param === 'tasaCambio') {
      this.editForm = this.fb.group({
        tasaCambio_bcv: [this.config?.tasaCambio_bcv, [Validators.required, Validators.min(0)]],
        fecha_vigencia: [this.config?.fecha_vigencia ? this.config.fecha_vigencia.substring(0,10) : '', Validators.required] // formato yyyy-MM-dd
      });
    } else if (param === 'porcIva') {
      this.editForm = this.fb.group({
        porc_iva: [this.config?.porc_iva, [Validators.required, Validators.min(0), Validators.max(100)]]
      });
    }

    this.modalService.open(content, { centered: true });
  }

  // Enviar formulario
  submitEdit(modal: any) {
    if (this.editForm.invalid) return;

    if (this.editingParam === 'tasaCambio') {
      this.customizeService.updateTasaCambio(this.editForm.value).subscribe({
        next: res => {
          this.loadConfig();
          modal.close();
        },
        error: err => console.error(err)
      });
    } else if (this.editingParam === 'porcIva') {
      this.customizeService.updatePorcIva(this.editForm.value).subscribe({
        next: res => {
          this.loadConfig();
          modal.close();
        },
        error: err => console.error(err)
      });
    }
  }

  // Form controls getters
  get f() {
    return this.editForm.controls;
  }

}





