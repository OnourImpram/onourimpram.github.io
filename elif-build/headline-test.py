"""Regression test for word spacing when the desktop line break is hidden on mobile."""
from pathlib import Path
from playwright.sync_api import sync_playwright
import os
with sync_playwright() as p:
    browser=p.chromium.launch(headless=True)
    page=browser.new_page(viewport={'width':390,'height':844})
    page.goto(os.environ.get('PREVIEW_URL','http://127.0.0.1:8080/elif-tasarim/'),wait_until='load')
    text=' '.join(page.locator('h1').inner_text().split())
    assert text=='Zamana değer katan mobilyalar.', text
    print('PASS mobile headline preserves word boundaries')
    page.screenshot(path='elif-build/evidence/mobile-headline-verified.png')
    browser.close()
