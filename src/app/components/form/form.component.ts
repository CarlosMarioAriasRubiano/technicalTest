import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { CustomersService } from '../../services/customers.service';
import { InvoiceService } from '../../services/invoice.service';
import notify from 'devextreme/ui/notify';
import { DxFormComponent } from 'devextreme-angular';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @ViewChild('myForm') myForm:DxFormComponent
  invoice: any;
  isEditMode: boolean = false;

  buttonOptions: any = {
    text: "Aceptar",
    type: "success",
    useSubmitBehavior: true
}
  
  constructor(public productService:ProductsService, 
              public customerService:CustomersService,
              public invoicesService:InvoiceService) { 
    this.invoice = {
      id: 0,
      invoiceNumber: '',
      productId: null,
      customerId: null,
      purchaseDate: new Date,
      quantity: 0
    }
  }

  ngOnInit(): void {
    this.productService.getProducts();
    this.customerService.getCustomers();
    this.loadInvoices();
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.saveInvoice();
  }

  loadInvoices(){
    this.invoicesService.getInvoices();
  } 

  saveInvoice(){
    this.invoicesService.saveInvoice(this.invoice).subscribe(data => {
      notify("Se ha guardado correctamente", "success", 1000);
      this.isEditMode = false;
      this.invoice.id = 0;
      this.myForm.instance.resetValues();
      this.loadInvoices();
    });
  }

  editRow(e){
    var rowData = e.data;
    
    this.invoice = {
      id: rowData.id,
      invoiceNumber: rowData.invoiceNumber,
      productId: rowData.productId,
      customerId: rowData.customerId,
      purchaseDate: rowData.purchaseDate,
      quantity: rowData.quantity
    }

    this.isEditMode = true;
    e.cancel = true;
  }

  deleteRow(e){
    if(this.isEditMode){
      e.cancel = true;
      return;
    }
    
    var rowData = e.data;

    if(rowData){
      this.invoicesService.deleteInvoice(rowData.id).subscribe(data => {
        notify("Se ha eliminado correctamente", "success", 1000);
      });
    }
  }

}
