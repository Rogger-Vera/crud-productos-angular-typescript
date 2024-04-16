import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { from } from 'rxjs';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edid-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {

  formProduct: FormGroup;
  loading: boolean = false;
  id: number;
  operacion: string = 'Agregar'

  constructor(private fb: FormBuilder, 
    private _productService: ProductService, 
    private toastr: ToastrService, 
    private router: Router, 
    private aRouter: ActivatedRoute){
    this.formProduct = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, Validators.required],
      stock: [null, Validators.required]
    })
    this.id = Number(aRouter.snapshot.paramMap.get('id'));

  }

  ngOnInit(): void {
    if (this.id !== 0) {
      this.operacion = 'Editar'
      this.getProduct(this.id);
    }
  }

  addProduct(){
    // console.log(this.formProduct.get('name')?.value);
    const product: Product = {
      name: this.formProduct.value.name,
      description: this.formProduct.value.description,
      price: this.formProduct.value.price,
      stock: this.formProduct.value.stock,
    }

    this.loading = true;
    if (this.id !== 0) {
      // product.id = this.id;
      this._productService.updateProduct(this.id, product).subscribe(() => {
        this.toastr.info(`El producto ${product.name} fue actualizado con exito`, 'Producto actualizado');
      })
      
    } else {
      this._productService.saveProducto(product).subscribe(() => {
        this.toastr.success(`El producto ${product.name} fue agregado con exito`, 'Producto agregado');
      })
    }
    this.loading = false;
    this.router.navigate(['/'])

  }

  getProduct(id: number){
    this.loading = true;
    this._productService.getProduct(id).subscribe((data: Product) => {
      this.loading = false;
      // se le tiene que pasar todas las propiedades
      this.formProduct.setValue({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock,
      })
      // this.formProduct.patchValue() ==> permite pasar algunas de las propiedades
    })
  }

}
