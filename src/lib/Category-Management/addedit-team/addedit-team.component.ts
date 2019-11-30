import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ApiService } from '../../Service/api.service';
@Component({
  selector: 'lib-addedit-team',
  templateUrl: './addedit-team.component.html',
  styleUrls: ['./addedit-team.component.css']
})
export class AddeditTeamComponent implements OnInit {
  public CategoryManagementTeamForm: FormGroup;
  public DataListViaResolve: any = [];
  public allData:any=[];
  public SingledataEdit: any = [];
  public getDataEndpointData: any;
  public addEndpointData: any;
  public serverUrlData: any;
  public spinnerLoader: boolean;
  public listingPageUrl: any = '';
  public params_id:any;
  public ButtonText:any="Submit";
  @Input()          //getting all data list via resolve call from app
  set TeamData(val: any) {
    this.DataListViaResolve = (val) || '<no name set>';
    this.DataListViaResolve = val;
    console.log("in ts ",this.DataListViaResolve);
  }
  @Input()          //setting the server url from project
  set serverUrl(serverUrlval: any) {
    this.serverUrlData = (serverUrlval) || '<no name set>';
    this.serverUrlData = serverUrlval;
  }
  @Input()          //setting the server url from project
  set getDataEndpoint(endpointUrlval: any) {
    this.getDataEndpointData = (endpointUrlval) || '<no name set>';
    this.getDataEndpointData = endpointUrlval;
    console.log("data",this.getDataEndpointData);

  }
  @Input()
  set singleEditData(val:any){
    this.SingledataEdit = (val) || '<no name set>';
    this.SingledataEdit = val;
    if(this.activeroute.snapshot.params._id){
      this.ButtonText="Update";
    this.params_id=this.activeroute.snapshot.params._id;
    this.CategoryManagementTeamForm.controls['categoryName'].patchValue(val[0].categoryName);
    this.CategoryManagementTeamForm.controls['description'].patchValue(val[0].description);
    this.CategoryManagementTeamForm.controls['status'].patchValue(val[0].status);
    
    //this.CategoryManagementTeamForm.controls['role'].patchValue(val[0].role);
    // for (const i in this.SingledataEdit[0].role) {
      
    //     this.CategoryManagementTeamForm.controls['role'].patchValue(this.SingledataEdit[i].role)
    // }
    }
  }
  @Input()          //setting the server url from project
  set addEndpoint(endpointUrlval: any) {
    this.addEndpointData = (endpointUrlval) || '<no name set>';
    this.addEndpointData = endpointUrlval;
  }
  @Input()          //setting the url of listing page from app
  set ListPageRoute(Url: any) {
    this.listingPageUrl = (Url) || '<no name set>';
    this.listingPageUrl = Url;
   
  }

  constructor(public fb: FormBuilder, public activeroute: ActivatedRoute,
    public _http: HttpClient, public router: Router, public apiService: ApiService) {

    this.CategoryManagementTeamForm = this.fb.group({
      categoryName: ['', Validators.required],
      description: ['', Validators.required],
      status: [true,],
      role: ['']
    })
  }


  ngOnInit() {
    this.apiService.clearServerUrl();
    setTimeout(() => {
      this.apiService.setServerUrl(this.serverUrlData);
    }, 50);
    this.apiService.clearaddEndpoint();
    setTimeout(() => {
      this.apiService.setaddEndpoint(this.addEndpointData);
    }, 50);
    this.apiService.cleargetdataEndpoint();
    setTimeout(() => {
      this.apiService.setgetdataEndpoint(this.getDataEndpointData);
    }, 50);
    setTimeout(() => {
      this.getData();
    }, 50);
  }
  inputUntouch(form: any, val: any) {
    form.controls[val].markAsUntouched();
  }
  CategoryManagementTeamFormSubmit() {
    if (this.CategoryManagementTeamForm.valid) {
      let x: any;
      for (x in this.CategoryManagementTeamForm.controls) {
        this.CategoryManagementTeamForm.controls[x].markAsTouched();
      }
      if (this.CategoryManagementTeamForm.valid) {
        if (this.CategoryManagementTeamForm.value.status)
          this.CategoryManagementTeamForm.value.status = parseInt("1");
        else
          this.CategoryManagementTeamForm.value.status = parseInt("0");
      }
      var data: any;
      if (this.activeroute.snapshot.params._id) {
        
        data = {
          "source": "Team_category",
          "data": {
            "id": this.params_id,
            'categoryName': this.CategoryManagementTeamForm.value.categoryName,
            'description': this.CategoryManagementTeamForm.value.description,
            'status': this.CategoryManagementTeamForm.value.status,
            'role': this.CategoryManagementTeamForm.value.role
           
          }
        }

      }else{
        data = {
          "source": "Team_category",
          "data": this.CategoryManagementTeamForm.value
        }
      }
     
      this.spinnerLoader = true;
      this.apiService.addData(data).subscribe(response => {
        this.spinnerLoader = false;
        setTimeout(() => {
          this.router.navigateByUrl('/' + this.listingPageUrl);
        }, 100);
      })
    }
  }
  getData(){
    let data: any = {
      "source": "rolemanagement"
      }
      this.apiService.getData(data).subscribe(response => {
      let result: any = response;
      this.allData = result.res;
      
      })
  }
  ResetTeamForm() {
    this.CategoryManagementTeamForm.reset();
  }
}