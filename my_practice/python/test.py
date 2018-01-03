'''
#web
'''

import bs4


CASE = open('demo.html')
CASE_BS = bs4.BeautifulSoup(CASE, 'html.parser')
SPAN_EL = CASE_BS.select('span')[0]

SPAN = str(SPAN_EL)

print(SPAN)
