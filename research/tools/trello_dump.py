import json,sys,collections
d=json.load(open(sys.argv[1]));out=sys.argv[2]
L={l['id']:(l['pos'],l['name']) for l in d['lists'] if not l['closed']}
com=collections.defaultdict(list)
for a in d['actions']:
    if a['type']=='commentCard': com[a['data']['card']['id']].append(a['data']['text'])
ck=collections.defaultdict(list)
for c in d.get('checklists',[]): ck[c['idCard']].append(c['name']+': '+'; '.join(i['name'] for i in c['checkItems']))
by=collections.defaultdict(list)
for c in d['cards']:
    if c['closed'] or c['idList'] not in L: continue
    by[c['idList']].append(c)
for lid,(pos,name) in sorted(L.items(),key=lambda x:x[1][0]):
    cs=sorted(by[lid],key=lambda c:c['pos'])
    s=f"# LIST: {name}\n\n"
    for c in cs:
        s+=f"## CARD: {c['name']}\nlabels: {[l['name'] for l in c['labels']]} | updated: {c['dateLastActivity'][:10]} | attachments: {c['badges']['attachments']}\n\n{c['desc']}\n"
        for x in ck[c['id']]: s+=f"\nCHECKLIST {x}\n"
        for x in com[c['id']]: s+=f"\nCOMMENT: {x}\n"
        s+="\n"
    fn=f"{out}/{int(pos):012d}_{name.split()[0].replace('/','-')}.md"
    open(fn,'w').write(s); print(len(s),len(cs),fn)
