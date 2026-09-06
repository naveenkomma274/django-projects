from django.shortcuts import render
import requests
from bs4 import BeautifulSoup
from django.http import HttpResponseRedirect
from urllib.parse import urljoin
from .models import Link

def scrape(request):
    if request.method == 'POST':
        # Retrieve and sanitize URL input
        site = request.POST.get('site', '').strip().replace(' ', '')
        
        if site:
            # Set a standard User-Agent header so sites don't block requests
            headers = {'User-Agent': 'Mozilla/5.0'}
            page = requests.get(site, headers=headers)
            soup = BeautifulSoup(page.content, 'html.parser')

            for link in soup.find_all('a'):
                link_address = link.get('href')
                
                # Extract text reliably, even with nested HTML tags
                link_text = link.text.strip() if link.text else "No Title"

                if link_address:
                    # Convert relative paths (e.g. '/wiki') to full URLs
                    full_address = urljoin(site, link_address)
                    
                    # Store non-empty records
                    Link.objects.create(address=full_address, name=link_text)

        return HttpResponseRedirect('/')
    else:
        data = Link.objects.all()
        return render(request, 'myapp/result.html', {'data': data})

def delete_links(request):
    Link.objects.all().delete()
    return render(request, 'myapp/result.html')