#!/usr/bin/env python3
"""
GitHub Stats Fetcher for Nehal Garg's Portfolio
Fetches public repo data, language breakdown, and star count from GitHub API.
"""

import json
import urllib.request
import urllib.error
from collections import Counter

USERNAME = "NehalGarg29"
BASE_URL = f"https://api.github.com/users/{USERNAME}"


def fetch_json(url: str) -> dict | list | None:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "portfolio-stats-fetcher"})
        with urllib.request.urlopen(req, timeout=5) as response:
            return json.loads(response.read().decode())
    except (urllib.error.URLError, urllib.error.HTTPError, Exception):
        return None


def get_stats() -> dict:
    # Fetch user profile
    user = fetch_json(BASE_URL)
    repos_list = fetch_json(f"{BASE_URL}/repos?per_page=100")

    if not user:
        return {
            "repos": 28,
            "stars": 9,
            "followers": 2,
            "topLangs": ["JavaScript", "Python", "TypeScript", "HTML", "Kotlin"],
        }

    # Count languages across repos
    lang_counter: Counter = Counter()
    total_stars = 0

    if repos_list and isinstance(repos_list, list):
        for repo in repos_list:
            if repo.get("language"):
                lang_counter[repo["language"]] += 1
            total_stars += repo.get("stargazers_count", 0)

    top_langs = [lang for lang, _ in lang_counter.most_common(5)]
    if not top_langs:
        top_langs = ["JavaScript", "Python", "TypeScript", "HTML", "Kotlin"]

    return {
        "repos": user.get("public_repos", 28),
        "stars": total_stars,
        "followers": user.get("followers", 2),
        "topLangs": top_langs,
    }


if __name__ == "__main__":
    stats = get_stats()
    print(json.dumps(stats))
