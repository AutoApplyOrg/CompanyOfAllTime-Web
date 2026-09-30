# Company of All Time

Landing page for [companyofalltime.com](https://companyofalltime.com): a company that will make many products, eventually. The first one is AutoApply.

It's a plain static site with no build step and no dependencies.

| File | What it is |
|---|---|
| `index.html` | Page markup, with most styling inline (as exported from Claude Design) |
| `styles.css` | Global styles, animations, and the phone layout (below 640px) |
| `main.js` | Counter, cursor/touch effects, scroll-in animations, waitlist form |
| `assets/` | Logo (also used as the favicon and link-preview image) |
| `CNAME` | Custom domain for GitHub Pages |

## Run locally

```sh
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Deploy

Every push to `main` deploys to GitHub Pages through [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), usually within a minute. You can also run it by hand from the Actions tab.

- **Only org owners can push to `main`.** A repository ruleset blocks everyone else, along with force-pushes and deleting the branch. Other contributors open a pull request for an owner to merge.
- **Hosting:** GitHub Pages with HTTPS enforced. `companyofalltime.com` is a verified domain for the AutoApplyOrg organization.
- **DNS (GoDaddy):** four `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`; a `CNAME` for `www` pointing to `autoapplyorg.github.io`; and the `_github-pages-challenge-AutoApplyOrg` TXT record, which must stay for the domain to remain verified.

## Known gaps

- The waitlist form doesn't store emails yet. It only shows the confirmation message.

## License

Proprietary, all rights reserved. See [LICENSE](LICENSE).
