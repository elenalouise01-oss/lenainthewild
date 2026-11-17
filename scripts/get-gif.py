#!/usr/bin/env python3
"""Download GIFs from Tenor for reels.

  python3 scripts/get-gif.py --url <tenor view link> [--out DIR] [--name NAME]
  python3 scripts/get-gif.py --search "chandler shocked" [--count 6] [--out DIR]

Saves each GIF and its MP4 (the MP4 is usually sharper and smaller) into DIR
(default ./gifs-download) and prints a one-line summary per GIF. Needs the
tenor.com and media*.tenor.com hosts to be allowed. Nothing here is part of
the website, and downloaded GIFs must never be committed to the repo.
"""
import argparse, html, os, re, sys, urllib.parse, urllib.request

UA = {"User-Agent": "Mozilla/5.0"}


def fetch(url, binary=False):
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=40) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", "replace")


def meta(page, prop):
    m = re.search(r'<meta[^>]+(?:property|name)="%s"[^>]+content="([^"]+)"' % re.escape(prop), page)
    return html.unescape(m.group(1)) if m else None


def search(term, count):
    page = fetch("https://tenor.com/search/%s-gifs" % urllib.parse.quote(term.strip().replace(" ", "-")))
    links = []
    for path in re.findall(r'href="(/(?:[a-z]{2}-[A-Z]{2}/)?view/[^"]+)"', page):
        url = "https://tenor.com" + path
        if url not in links:
            links.append(url)
    return links[:count]


def download(view_url, out, name=None):
    page = fetch(view_url)
    gif, mp4 = meta(page, "og:image"), meta(page, "og:video")
    if not gif:
        raise RuntimeError("no GIF found on " + view_url)
    base = name or re.sub(r"-gif-\d+$", "", view_url.rstrip("/").rsplit("/", 1)[-1])[:80]
    os.makedirs(out, exist_ok=True)
    w, h = meta(page, "og:image:width"), meta(page, "og:image:height")
    with open(os.path.join(out, base + ".gif"), "wb") as f:
        f.write(fetch(gif, True))
    if mp4:
        with open(os.path.join(out, base + ".mp4"), "wb") as f:
            f.write(fetch(mp4, True))
    print("%s  %sx%s  %s  <- %s" % (os.path.join(out, base + ".gif"), w, h, "+mp4" if mp4 else "", view_url))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--url", action="append", default=[])
    ap.add_argument("--search")
    ap.add_argument("--count", type=int, default=6)
    ap.add_argument("--out", default="gifs-download")
    ap.add_argument("--name")
    a = ap.parse_args()
    urls = list(a.url) + (search(a.search, a.count) if a.search else [])
    if not urls:
        ap.error("give --url or --search")
    failed = 0
    for u in urls:
        try:
            download(u, a.out, a.name if len(urls) == 1 else None)
        except Exception as e:  # keep going with the rest
            failed += 1
            print("FAILED %s (%s)" % (u, e), file=sys.stderr)
    sys.exit(1 if failed == len(urls) else 0)


main()
