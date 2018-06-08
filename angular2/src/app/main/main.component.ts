import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {QueryService} from '../services/query.service';
import {MusicService, Playlist, Song} from '../services/music.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, OnDestroy {
  @ViewChild('audio') audio: ElementRef;

  public selectedSong: Song;
  public recommendations: Song[];
  private recommendationsSubscription: Subscription;
  public selectedPlaylist: Playlist;
  public playlists: Playlist[];
  private playlistsSubscription: Subscription;
  public playlistSongs: Song[];

  constructor(private musicService: MusicService, private queryService: QueryService) {
    this.selectedSong = null;
    this.recommendations = this.musicService.getRecommendations();
    this.selectedPlaylist = null;
    this.playlists = this.musicService.getPlaylists();
    this.playlistSongs = [];
  }

  public ngOnInit() {
    this.audio.nativeElement.volume = 0.4;
    this.recommendationsSubscription = this.musicService.getRecommendationsObservable().subscribe(data=>{
      this.recommendations = data;
      if (this.selectedSong) {
        let id = this.selectedSong.ID;
        this.selectedSong = null;
        for (let song in this.recommendations) {
          if (this.recommendations[song].ID === id) {
            this.selectSong(this.recommendations[song]);
          }
        }
      }
    });
    this.playlistsSubscription = this.musicService.getPlaylistsObservable().subscribe(data=>{
      this.playlists = data;
      if (this.selectedPlaylist) {
        let id = this.selectedPlaylist.ID;
        this.selectedPlaylist = null;
        for (let playlist in this.playlists) {
          if (this.playlists[playlist].ID === id) {
            this.selectPlaylist(this.playlists[playlist]);
          }
        }
      }
      this.playlistSongs = [];
    });
    this.musicService.refreshMusic();
  }

  public ngOnDestroy() {
    this.recommendationsSubscription.unsubscribe();
    this.playlistsSubscription.unsubscribe();
  }

  public selectSong(song: Song): void {
    this.selectedSong = song;
    this.queryService.registerListen(song.ID).subscribe();
  }

  public selectPlaylist(playlist: Playlist): void {
    this.selectedPlaylist = playlist;
    this.queryService.getPlaylistSongs(this.selectedPlaylist.ID).subscribe(data=>{
      let songs = JSON.parse(data.body);
      this.playlistSongs = songs;
    },err=>{
      console.log(err);
    });
  }

  public deletePlaylist(id: number): void {
    this.queryService.deletePlaylist(id).subscribe(data=>{
      this.musicService.refreshMusic();
    });
  }

  public addPlaylist(val): void {
    this.queryService.createPlaylist(val).subscribe(data=>{
      this.musicService.refreshMusic();
    });
  }

  public insertInPlaylist(id: number): void {
    this.queryService.insertInPlaylist(this.selectedPlaylist.ID, id).subscribe(data=>{
      this.musicService.refreshMusic();
    });
  }

  public deleteFromPlaylist(song: Song): void {
    this.queryService.deleteFromPlaylist(this.selectedPlaylist.ID, song.ID, this.playlistSongs.indexOf(song)).subscribe(data=>{
      this.musicService.refreshMusic();
    });
  }
}
