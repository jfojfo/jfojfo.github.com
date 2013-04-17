#!/usr/bin/python
#encoding:utf8
import sys
import os
import zipfile
import tempfile
import codecs
import HTMLParser
from htmlentitydefs import entitydefs
import shutil

if len(sys.argv) == 1:
    print "Usage:", sys.argv[0], "bookFile [bookFile2, ...]"
    sys.exit()


class TitleParser(HTMLParser.HTMLParser): 
    def __init__(self): 
        self.taglevels=[] 
        self.handledtags=['title', 'body'] #提出标签 
        self.processing=None 
        self.title=""
        self.body=""
        HTMLParser.HTMLParser.__init__(self) 
    def handle_starttag(self,tag,attrs): 
        if tag in self.handledtags: 
            self.data='' 
            self.processing=tag 
    def handle_data(self,data): 
        if self.processing: 
            self.data +=data 
    def handle_endtag(self,tag): 
        if tag==self.processing: 
            self.processing=None 
            if tag == "title":
                self.title = self.data
            else:
                self.body = self.data
    def handle_entityref(self,name): 
        if entitydefs.has_key(name): 
            self.handle_data(entitydefs[name]) 
        else: 
            self.handle_data('&'+name+';') 
    def handle_charref(self,name): 
        try: 
            charnum=int(name) 
        except ValueError: 
            return 
        if charnum<1 or charnum>255: 
            return 
        self.handle_data(chr(charnum)) 
    def gettitle(self): 
        return self.title
    def getbody(self): 
        return self.body


# unzip a file
def unzip(path, target):
    zfile = zipfile.ZipFile(path)
    for name in zfile.namelist():
        (dirname, filename) = os.path.split(name)
        if filename == '':
            # directory
            dirname = target + "/" + dirname;
            if not os.path.exists(dirname):
                os.mkdir(dirname)
        else:
            # file
            tname = target + "/" + name;
            fd = open(tname, 'w')
            fd.write(zfile.read(name))
            fd.close()
    zfile.close()


def convert(name):
    print "converting", name
    t = tempfile.mkdtemp(prefix="tmp")
    print "unzip to:", t
    unzip(name, t)

    d = t + "/OPS/"
    files = [s for s in os.listdir(d) if s.endswith(".xhtml")]
    files.sort(key=lambda x:int(x[:-6]))
    parser = TitleParser()
    #out = codecs.open(name.split('.')[0] + ".txt", "w", "utf-8")
    out = open(name.split('.')[0] + ".txt", "w")
    for file in files:
        print file
        f = open(d + file)
        content = f.read()
        f.close()
        parser.feed(content)
        out.write(parser.gettitle() + "\n" + parser.getbody())
    out.close()
    shutil.rmtree(t)

for a in sys.argv[1:]:
    convert(a)
