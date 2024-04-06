# School Portal Scraper

This project is a Node.js application that automates login to my university portal and scrapes internship postings using Playwright.

## Features

- Automated login to the school portal.
- Scraping of internship postings.
- Generation of an HTML page with the listings.
- Scheduling to run the scraper daily.

## Prerequisites

- Node.js
- Playwright
- A system with cron or an equivalent scheduler for automation.

## Installation

Clone the repository:

```bash
git clone https://github.com/yourusername/school-scraper.git
cd school-scraper
```

## Install dependencies

```bash
npm install
```
## Usage
To run the scraper manually:
```bash
node scraper.js
```

To schedule the scraper, add a cron job (edit with crontab -e):
```cron
0 7 * * * /usr/bin/node /path/to/your/scraper.js
```

## Logs
Logs are managed via systemd and can be monitored using:
```bash
journalctl -u school-scraper.service
```
