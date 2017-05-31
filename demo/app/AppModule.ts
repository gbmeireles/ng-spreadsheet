import { NgModule } from '@angular/core';
import { HttpModule }  from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { SpreadsheetModule  } from 'ng-spreadsheet';
import { AppComponent }   from './AppComponent';
import { TreeToListConverter } from './tree/Services/TreeToListConverter';
import { TextEditorComponent } from './TextEditorComponent';
import { SimpleColumnCreator } from './SimpleColumnCreator';

const declarables = [AppModule]

@NgModule({
  imports: [SpreadsheetModule, BrowserModule, HttpModule],
  declarations: [AppComponent],
  providers: [TreeToListConverter, SimpleColumnCreator],
  bootstrap: [AppComponent],
})

export class AppModule { }

export default AppModule;
