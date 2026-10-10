from pathlib import Path
import json

def page(id,locale,type,title,description,eyebrow,lead,sections,related,project=None,visual=None,maturity=None):
 r=dict(id=id,locale=locale,type=type,title=title,description=description,eyebrow=eyebrow,lead=lead,sections=sections,relatedIds=related,project=project,sourceReferences=['HP-1.1/project-context','SM-0.3/'+id],sourceRevision='2026-10-09 (AIFIELD snapshot: September 2026)',editorialState='draft',modifiedAt='2026-10-09T21:00:00.000Z',reviews=dict(facts=None,language=None,assets=None),privateNotes='Locally authored from supplied summary. Factual, translation and asset owner review pending. Original PDFs were not supplied.')
 if visual:r['visual']=visual
 if maturity:r['maturity']=maturity
 f=Path(f'content/pages/{locale}/{id}.json')
 if f.exists():raise RuntimeError('Refusing to overwrite authored record: '+str(f))
 f.write_text(json.dumps(r,ensure_ascii=False,indent=2)+'\n')
def section(id,title,*paragraphs,items=None,rows=None,links=None):
 r=dict(id=id,title=title,paragraphs=list(paragraphs))
 if items:r['items']=items
 if rows:r['rows']=rows
 if links:r['links']=[{'id':s} if isinstance(s,str) else s for s in links]
 return r
