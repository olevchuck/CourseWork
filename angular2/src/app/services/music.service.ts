import {Injectable} from '@angular/core';
import {QueryService} from './query.service';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

export class Song {
  ID: number;
  SongName: string;
  Artist: string;
  AlbumID: number;
  Length: number;
  Adress: string;
  Cover: string;
}

export class Playlist {
  ID: number;
  PlaylistName: string;
}

@Injectable()

export class MusicService {
  private recommendations: Song[];
  private recommendationsSubject: Subject<Song[]>;
  private playlists: Playlist[];
  private playlistsSubject: Subject<Playlist[]>;

  public constructor(private queryService: QueryService) {
    this.recommendations = [];
    this.recommendationsSubject = new Subject<Song[]>();
    this.playlists = [];
    this.playlistsSubject = new Subject<Playlist[]>();
  }

  public getRecommendations(): Song[] {
    return this.recommendations;
  }

  public getRecommendationsObservable(): Observable<Song[]> {
    return this.recommendationsSubject.asObservable();
  }

  public getPlaylists(): Playlist[] {
    return this.playlists;
  }

  public getPlaylistsObservable(): Observable<Playlist[]> {
    return this.playlistsSubject.asObservable();
  }

  public refreshMusic(): void {
    this.queryService.getRecommendations().subscribe(response=>{
      let stringIds = response.body.split(',');
      let ids = stringIds.map((value)=>{
        return parseInt(value);
      });
      this.queryService.selectSongs(ids).subscribe(response=>{
        var songs = JSON.parse(response.body);
        this.recommendations = songs;
        this.recommendationsSubject.next(this.recommendations);
      }, err=>{
        console.log(err);
      });
    }, err=>{
      console.log(err);
    });
    this.queryService.listPlaylists().subscribe(response=>{
      var playlists = JSON.parse(response.body);
      this.playlists = playlists;
     this.playlistsSubject.next(this.playlists);
    }, err=>{
      console.log(err);
    });
  }
}
