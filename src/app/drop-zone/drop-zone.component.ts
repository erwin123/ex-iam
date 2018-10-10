import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { UploadEvent, UploadFile, FileSystemDirectoryEntry, FileSystemFileEntry } from 'ngx-file-drop';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnInit {

  @Output() dataDrop: EventEmitter<any> = new EventEmitter();
  fl:string;
  public files: UploadFile[] = [];
  constructor() { }

  ngOnInit() {
    
  }
  public fileOver(event) {
    //console.log(event);
  }

  public fileLeave(event) {
    //console.log(event);
  }

  public onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      /* read workbook */
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      /* grab first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* throw data */
      this.dataDrop.emit(XLSX.utils.sheet_to_json(ws, { header: 1 }));
      this.fl = null;
    };
    reader.readAsBinaryString(target.files[0]);
  }

  public dropped(event: UploadEvent) {
    this.files = event.files;
    if (this.files.length !== 1) throw new Error('Cannot use multiple files');
    for (const droppedFile of event.files) {

      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          const reader: FileReader = new FileReader();
          reader.onload = (e: any) => {
            /* read workbook */
            const bstr: string = e.target.result;
            const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

            /* grab first sheet */
            const wsname: string = wb.SheetNames[0];
            const ws: XLSX.WorkSheet = wb.Sheets[wsname];

            /* throw data */
            this.dataDrop.emit(XLSX.utils.sheet_to_json(ws, { header: 1 }));
            
          };
          reader.readAsBinaryString(file);

        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        console.log(droppedFile.relativePath, fileEntry);
      }
    }
  }
}
