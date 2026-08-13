import re

files = ['admin-dashboard.html', 'doctor-dashboard.html', 'patient-dashboard.html']

for fname in files:
    with open(fname, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace patterns like "\/api/ with `${API_BASE_URL}/api/
    content = re.sub(r'"\\\/api/', r'`${API_BASE_URL}/api/', content)
    content = re.sub(r'`\\\/api/', r'`${API_BASE_URL}/api/', content)
    
    # Clean up any remaining backslashes before /api
    content = content.replace('\\/', '/')
    
    with open(fname, 'w', encoding='utf-8') as f:
        f.write(content)
    
    print(f'✓ Fixed {fname}')

print('All files updated successfully!')
