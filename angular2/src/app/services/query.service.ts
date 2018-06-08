import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

// const API_HOST: string = 'http://138.68.69.43/';
const API_HOST: string = '';
export const DOMAIN = '138.68.69.43';

@Injectable()

export class QueryService {
  constructor(private http: HttpClient) {}

  public register(login: string, password: string): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('login', login)
      .append('pass', password);
    return this.http.get(API_HOST + 'method/regUser',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public login(login: string, password: string): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('login', login)
      .append('pass', password);
    let headers = new HttpHeaders()
      .append('Content-Type', 'application/x-www-form-urlencoded');
    return this.http.get(API_HOST + 'method/login',{
      withCredentials: true,
      params: params,
      headers: headers,
      observe: 'response',
      responseType: 'text'
    });
  }

  public registerListen(id: number): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('id', id.toString());
    return this.http.get(API_HOST + 'method/registerListen',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public getRecommendations(): Observable<HttpResponse<string>> {
    return this.http.get(API_HOST + 'method/getRecomendations',{
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    });
  }

  public selectSongs(ids: number[]): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('ids', ids.join(','));
    return this.http.get(API_HOST + 'method/selectSongs',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public createPlaylist(name: string): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('name', name);
    return this.http.get(API_HOST + 'method/createPlaylist',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public deletePlaylist(playlistId): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('playlist', playlistId);
    return this.http.get(API_HOST + 'method/deletePlaylist',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public insertInPlaylist(playlistId, songId): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('playlist', playlistId)
      .append('song', songId)
      .append('prevPos', '0')
      .append('nextPos', '0');
    return this.http.get(API_HOST + 'method/insertInPlaylist',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public deleteFromPlaylist(playlistId, songId, pos: number): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('playlist', playlistId)
      .append('song', songId)
      .append('pos', pos.toString());
    return this.http.get(API_HOST + 'method/deleteFromPlaylist',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public getPlaylistSongs(playlistId): Observable<HttpResponse<string>> {
    let params = new HttpParams()
      .append('playlist', playlistId);
    return this.http.get(API_HOST + 'method/getPlaylistSongs',{
      withCredentials: true,
      params: params,
      observe: 'response',
      responseType: 'text'
    });
  }

  public listPlaylists(): Observable<HttpResponse<string>> {
    return this.http.get(API_HOST + 'method/listPlaylists',{
      withCredentials: true,
      observe: 'response',
      responseType: 'text'
    });
  }
}
