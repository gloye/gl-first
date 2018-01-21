'''
# demo
'''
import os
import requests
import bs4


URL = "https://www.billboard.com/charts/hot-100"

print('Downloading page %s...' % URL)

os.makedirs('dragonball', exist_ok=True)

RES = requests.get(URL)
RES.raise_for_status()

SOUP = bs4.BeautifulSoup(RES.text, 'html5lib')


IMG_EL = SOUP.select('#center_box')
print(IMG_EL)
exit()
comicUrl = False
if IMG_EL == []:
    print('Could not find comic image.')
else:
    comicUrl = IMG_EL[0].get('src')
    print('Downloading image %s...' % (comicUrl))
    res = requests.get(comicUrl)
    res.raise_for_status()

if comicUrl:
    imageFile = open(os.path.join(
        'dragonball', os.path.basename(comicUrl)), 'wb')
    for chunk in res.iter_content(100000):
        imageFile.write(chunk)
        imageFile.close()
