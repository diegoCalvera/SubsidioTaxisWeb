import { Component } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.css',
})
export class ReporteComponent {
  reporte_data: string =
    'https://app.powerbi.com/view?r=eyJrIjoiMGM2ZWY1MzktNDhlZi00YTgyLTg5NjEtMzZlMGQ1YmVlYTNmIiwidCI6ImU5ODk2YzIxLWE3NGQtNGZmNy1iZjYwLWY1MzBiZmY0NjNlZCJ9';
  urlSafe!: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) {}
  ngOnInit() {
    this.urlSafe = this.sanitizer.bypassSecurityTrustResourceUrl(
      this.reporte_data
    );
  }
}
