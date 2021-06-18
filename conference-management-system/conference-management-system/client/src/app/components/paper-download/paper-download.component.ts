import {Component, OnInit} from '@angular/core';
import * as fileSaver from 'file-saver'
import {PaperResourceService} from "../../../api";

@Component({
  selector: 'cms-paper-download',
  templateUrl: './paper-download.component.html',
  styleUrls: ['./paper-download.component.css']
})
export class PaperDownloadComponent implements OnInit {
  paperNames: Array<String>;
  fileNameToBeDownloaded: string = null;
  data: string[];

  constructor(
    private paperResourceService: PaperResourceService
  ) { }

  ngOnInit(): void {
    this.paperResourceService.getAllPaperNames().subscribe(paperNames => this.paperNames = paperNames);
  }

  returnBlob(resource): Blob{
    console.log("File downloaded")
    return new Blob([resource], {type: 'application/pdf'})
  }


  download(){
    this.paperResourceService.downloadPaper(this.fileNameToBeDownloaded).subscribe(data => {
      if(data){
        fileSaver.saveAs(this.returnBlob(data), this.fileNameToBeDownloaded)
      }
    });

  }

  getFileExtension(fileName: string): string{
    return fileName.split('.').pop();
  }

  changedPaper(event) {
    this.fileNameToBeDownloaded = event.value;
  }


}
