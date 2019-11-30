import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'lib-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {
  public DataList: any = [];
  public serverUrlData: any = '';
  public tokenVal:any='';
  public DelEndpoint:any='';
  public editroute :any='';
  public updatendpoint:any='';
  public collectionName:any='';
  public searchingSource:any='';
  public searchingEndpoint:any='';
  public addPageRoute:any='';

 
  @Input()    //getting all data via resolve call from app
  set allData(val: any) {
    this.DataList = (val) || '<no name set>';
    this.DataList = val;
  }
  public data_skip: any = ["_id","multipleemail","bulletarray"];
  public data_modify_header: any = { "membername" : "Member Name","description":"Description",
  "categoryName":"Category Name","multiplephone":"Phone Numbers","images":"Images"
 };
 public search_settings: any =
    {
      textsearch: [{ label: "Search By Category Name", field: 'categoryname' },
      { label: "Search By Member Name" , field:'membername'},
      { label: "Search By E-Mail" , field:'multipleemail'}],
      // selectsearch:[{label:'Search By email',field:''}],
      // search:[{label:"Search By E-Mails",field:'multipleemail'}]
    };
   pendingmodelapplicationarray_detail_datatype:any=[{
      key: "images",
      value: 'image',
      fileurl: 'https://s3.us-east-2.amazonaws.com/crmfiles.influxhostserver/team/'    // Image path 
    }];
  @Input()          //setting the server url from project
  set serverUrl(serverUrlval: any) {
    this.serverUrlData = (serverUrlval) || '<no name set>';
    this.serverUrlData = serverUrlval;
  }
  @Input()         //getting token from application
  set Token(val:any){
    this.tokenVal = (val) || '<no name set>';
    this.tokenVal = val;

  }
  @Input()       //getting delete endpoint from application
  set DeleteEndpoint(val:any){
    this.DelEndpoint = (val) || '<no name set>';
    this.DelEndpoint = val;
  }
  @Input()      //getting edit route from application
  set EditRoute(val:any){
    this.editroute = (val) || '<no name set>';
    this.editroute = val;
  }
  @Input()      //getting the update endpoint from application
  set UpdateEndpoint(val:any){
    this.updatendpoint = (val) || '<no name set>';
    this.updatendpoint = val;
  }
  @Input()      //getting the source name from application
  set SourceName(val:any){
    this.collectionName = (val) || '<no name set>';
    this.collectionName = val;
  } 
  @Input()      //getting the searching endpoint from the application
  set SearchSourceName(val:any){
    this.searchingSource = (val) || '<no name set>';
    this.searchingSource = val;
  }
  @Input()     //getting the search endpoint from endpoint
  set SearchEndpoint(val:any){
    this.searchingEndpoint = (val) || '<no name set>';
    this.searchingEndpoint = val;
  }
  @Input()   //getting the add page route from application
  set AddPageRoute(val:any){
    this.addPageRoute = (val) || '<no name set>';
    this.addPageRoute = val;
  }
 
  constructor(public router : Router) { }

  ngOnInit() {
    console.log('this.preview_detail_listing')
    console.log(this.pendingmodelapplicationarray_detail_datatype)
  }
  addButton(){
    this.router.navigateByUrl('/' + this.addPageRoute);
  }

}
