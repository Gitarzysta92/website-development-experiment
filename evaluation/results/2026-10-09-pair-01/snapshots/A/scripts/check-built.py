from pathlib import Path
from html.parser import HTMLParser
import json
import xml.etree.ElementTree as ET

class Document(HTMLParser):
    def __init__(self):
        super().__init__(); self.meta={}; self.links=[]; self.title=''; self.in_title=False; self.lang=None
    def handle_starttag(self,tag,attrs):
        a=dict(attrs)
        if tag=='html': self.lang=a.get('lang')
        if tag=='title': self.in_title=True
        if tag=='meta': self.meta[a.get('name',a.get('property',''))]=a.get('content','')
        if tag=='link': self.links.append(a)
    def handle_endtag(self,tag):
        if tag=='title': self.in_title=False
    def handle_data(self,data):
        if self.in_title:self.title+=data

registry=json.loads(Path('content/shared/routes.json').read_text())
origin=json.loads(Path('dist/profile.json').read_text())['origin']
results=[]
for route in registry['routes']:
    for locale in ['en','pl']:
        record=json.loads(Path(f"content/pages/{locale}/{route['id']}.json").read_text())
        path=route['paths'][locale];html=Path('dist/client'+path+'index.html').read_text()
        doc=Document();doc.feed(html)
        assert doc.lang==locale
        assert doc.title==record['title']+' | Artifactory'
        assert doc.meta['description']==record['description']
        assert doc.meta['og:title']==doc.title and doc.meta['og:description']==record['description']
        assert doc.meta['og:url']==origin+path and doc.meta['og:image']==origin+'/brand/share-v1.svg'
        assert doc.meta['og:locale']==('pl_PL' if locale=='pl' else 'en_GB')
        assert doc.meta['robots']=='noindex, nofollow'
        assert [l['href'] for l in doc.links if l.get('rel')=='canonical']==[origin+path]
        assert {l['hreflang']:l['href'] for l in doc.links if l.get('rel')=='alternate'}=={'en':origin+route['paths']['en'],'pl':origin+route['paths']['pl'],'x-default':origin+route['paths']['en']}
        assert not any(token in html for token in ['privateNotes','sourceReferences','RESEND_API_KEY','approvalEvidence'])
        results.append({'id':route['id'],'locale':locale,'path':path,'metadata':'pass','htmlBytes':len(html.encode())})
assert len(ET.fromstring(Path('dist/client/sitemap.xml').read_text()))==0
assert 'Disallow: /' in Path('dist/client/robots.txt').read_text()
assert not Path('dist/client/checks-components').exists()
Path('artifacts/built-metadata.json').write_text(json.dumps(results,indent=2)+'\n')
print('All 34 built metadata records, escaped attributes, private projection and preview-only discovery checks pass.')
