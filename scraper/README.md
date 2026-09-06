# Django Projects Monorepo

Welcome to my Django project portfolio! This repository contains a collection of full-stack web applications and tools built using Python and the Django framework.

---

## 📁 Included Projects

| Project | Description | Tech Stack |
| :--- | :--- | :--- |
| [Web Scraper](./scraper) | Real-time web scraping tool that extracts, cleans, and stores webpage links. | Django, BeautifulSoup4, Requests, Bootstrap 4 |

---

## 🚀 Projects Overview

### 🔍 Web Scraper App (`/scraper`)
A web application built to crawl web links from any submitted URL, sanitize paths, and store structured data into a relational database for front-end rendering.

**Key Features:**
* Dynamic URL scraping using `requests` and `BeautifulSoup4`.
* Path sanitization and relative link resolution via `urllib.parse.urljoin`.
* Front-end UI built with Bootstrap 4 tables and forms.
* Clean DB handling and custom string representations in Django Models.

---

## 🛠️ Local Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/naveenkomma274/django-projects.git](https://github.com/naveenkomma274/django-projects.git)
   cd django-projects