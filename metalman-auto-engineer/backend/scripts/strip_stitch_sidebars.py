"""
Strip internal sidebars and logos from Stitch HTML files.
Creates "content_only.html" versions that can be embedded cleanly
in the Metalman unified sidebar wrapper.
"""
import os
from html.parser import HTMLParser

# Internally integrated path
STITCH_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "stitch_suite"))
SKIP_FOLDERS = {"landing_page_metalmind_data_sync", "login_metalman"}

class SidebarStripper(HTMLParser):
    def __init__(self):
        super().__init__()
        self.output = []
        self.skip_depth = 0
        self.skip_tags = set()
        self.current_depth = 0
        self.in_skip = False
        self.skip_start_depth = 0
        
    def is_sidebar_tag(self, tag, attrs):
        attrs_dict = dict(attrs)
        cls = attrs_dict.get('class', '')
        id_ = attrs_dict.get('id', '')
        if tag == 'aside': return True
        if tag == 'nav' and any(x in cls for x in ['fixed', 'lg:flex', 'hidden lg:', 'sidebar', 'sidenav']):
            return True
        return False
    
    def handle_starttag(self, tag, attrs):
        self.current_depth += 1
        if self.in_skip:
            self.skip_depth += 1
            return
        if self.is_sidebar_tag(tag, attrs):
            self.in_skip = True
            self.skip_start_depth = self.current_depth
            self.skip_depth = 1
            return
        attrs_str = ''
        for name, val in attrs:
            if val is None: attrs_str += f' {name}'
            else: attrs_str += f' {name}="{val}"'
        self.output.append(f'<{tag}{attrs_str}>')
    
    def handle_endtag(self, tag):
        if self.in_skip:
            self.skip_depth -= 1
            if self.skip_depth == 0: self.in_skip = False
            self.current_depth -= 1
            return
        self.current_depth -= 1
        void_elements = {'area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr'}
        if tag not in void_elements:
            self.output.append(f'</{tag}>')
    
    def handle_data(self, data):
        if not self.in_skip: self.output.append(data)
    
    def handle_comment(self, data):
        if not self.in_skip: self.output.append(f'<!--{data}-->')
    
    def get_output(self):
        return ''.join(self.output)

def strip_sidebar_from_html(html_content):
    stripper = SidebarStripper()
    stripper.feed(html_content)
    result = stripper.get_output()
    result = result.replace('lg:ml-64', '').replace('ml-64', '')
    return result

def process_all():
    if not os.path.exists(STITCH_DIR):
        print(f"Error: Directory not found {STITCH_DIR}")
        return
    for folder_name in os.listdir(STITCH_DIR):
        folder_path = os.path.join(STITCH_DIR, folder_name)
        if not os.path.isdir(folder_path) or folder_name in SKIP_FOLDERS:
            continue
        input_file = os.path.join(folder_path, 'code.html')
        output_file = os.path.join(folder_path, 'content_only.html')
        if not os.path.exists(input_file):
            continue
        with open(input_file, 'r', encoding='utf-8', errors='replace') as f:
            html_content = f.read()
        stripped = strip_sidebar_from_html(html_content)
        with open(output_file, 'w', encoding='utf-8') as f:
            f.write(stripped)
        print(f"  [ok] {folder_name} -> content_only.html")
    print("Done!")

if __name__ == '__main__':
    process_all()
