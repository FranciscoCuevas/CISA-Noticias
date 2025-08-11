import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface MediaSource {
  id: string;
  name: string;
  selected: boolean;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  
  mediaSources: MediaSource[] = [
    { id: 'elpais', name: 'El País', selected: false },
    { id: 'elmundo', name: 'El Mundo', selected: false },
    { id: 'abc', name: 'ABC', selected: false },
    { id: 'lavanguardia', name: 'La Vanguardia', selected: false },
    { id: '20minutos', name: '20 Minutos', selected: false },
    { id: 'eldiario', name: 'ElDiario.es', selected: false },
    { id: 'elespanol', name: 'El Español', selected: false },
    { id: 'sur', name: 'Sur', selected: false },
    { id: 'larazon', name: 'La Razón', selected: false },
    { id: 'okdiario', name: 'OkDiario', selected: false }
  ];

  isScrapingActive = false;
  scrapingProgress = 0;
  currentScrapingMedia = '';
  scrapedNews: any[] = [];

  constructor(private apiService: ApiService) {}

  startScraping() {
    const selectedMedia = this.mediaSources.filter(media => media.selected);
    
    if (selectedMedia.length === 0) {
      alert('Por favor, selecciona al menos un medio para scrapear');
      return;
    }

    this.isScrapingActive = true;
    this.scrapingProgress = 0;
    this.scrapedNews = [];
    this.currentScrapingMedia = '';

    this.simulateScraping(selectedMedia);
  }

  stopScraping() {
    this.isScrapingActive = false;
    this.scrapingProgress = 0;
    this.currentScrapingMedia = '';
    console.log('Scraping detenido');
  }

  selectAllMedia() {
    this.mediaSources.forEach(media => media.selected = true);
  }

  deselectAllMedia() {
    this.mediaSources.forEach(media => media.selected = false);
  }

  private simulateScraping(selectedMedia: MediaSource[]) {
    let currentIndex = 0;
    const totalMedia = selectedMedia.length;

    const processNextMedia = () => {
      if (currentIndex < totalMedia && this.isScrapingActive) {
        const media = selectedMedia[currentIndex];
        this.currentScrapingMedia = media.name;
        
        for (let i = 1; i <= 5; i++) {
          setTimeout(() => {
            if (this.isScrapingActive) {
              this.scrapedNews.push({
                media: media.name,
                title: `Noticia ${i} de ${media.name}`,
                url: `https://${media.id}.com/noticia-${i}`,
                timestamp: new Date()
              });
            }
          }, i * 500);
        }

        setTimeout(() => {
          currentIndex++;
          this.scrapingProgress = Math.round((currentIndex / totalMedia) * 100);
          
          if (currentIndex < totalMedia && this.isScrapingActive) {
            processNextMedia();
          } else if (this.isScrapingActive) {
            this.isScrapingActive = false;
            this.currentScrapingMedia = '';
            console.log('Scraping completado');
          }
        }, 3000);
      }
    };

    processNextMedia();
  }
}