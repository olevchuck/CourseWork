# -*- coding: utf-8 -*-

import requests
from bs4 import BeautifulSoup


def get_url(track_name):
    """
    Geting URL of page with searh results

    Args:
        track_name: str
            Name of track to search

    Returns:
        Page URL with search results
    """

    splited_track_name = track_name.split()
    search_track_name = '-'.join(splited_track_name)

    # site do circle redirects if track name contain upper case chars
    search_track_name = search_track_name.lower()
    url = 'https://zvonko.me/poisk/' + search_track_name
    return url


def get_html(url):
    """
    Getting HTML-page by URL

    Args:
        url: str
            URL of page to download

    Returns:
        Dict of request results 
    """

    r = requests.get(url)
    html_page = r.text
    return html_page


def get_track_url(track_name, limit_num_of_res_urls=5):
    """
    Getting download url by track name

    Args:
        track_name: str
            Searching track name
        limit_num_of_res_urls: int
            Maximal number of result urls

    Returns:
        Download url
    """

    # Get page with list of search results
    seach_page_url = get_url(track_name)
    search_page_html = get_html(seach_page_url)

    soup = BeautifulSoup(search_page_html, 'lxml')
    li_tags_list = soup.find_all('li', {'class': 'download'})[:limit_num_of_res_urls]
    href_list = [li_tag.find('a', class_='dl').get('href') for li_tag in li_tags_list]

    # Go to page with track and download it
    tracks_html_pages = [get_html(track_page_link) for track_page_link in href_list]

    download_links = [BeautifulSoup(track_html, 'lxml').find('a', {'class': 'button buttonDownload big'}).get('href')
                      for track_html in tracks_html_pages]
    return download_links

    
if __name__ == '__main__':
    track_name = 'Скрябін Місця щасливих людей'
    print(track_name, '\n', get_track_url(track_name))

    track_name = '12345'
    print(track_name, '\n', get_track_url(track_name))
