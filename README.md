# Khmer Living Archive: Teuk Tnaot (ទឹកត្នោត), the Many Uses of Palm Juice

## 1. What this is

A community archive of how Cambodians use palm juice (teuk tnaot): as a drink, a sugar, a ferment and a tradition. I built it for ICT 340 at the American University of Phnom Penh, on the course's "Khmer Living Archive" skeleton.

Anyone can browse and search the published entries in English or Khmer. Anyone with an account can add an entry with a photo, and it waits for review. As the curator, I read every entry and publish it or send it back.

Live site: https://signature-drink-of-siem-reap.vercel.app

## 2. Who it's for

The people who make, sell and drink teuk tnaot in Cambodia, and Cambodians who want to remember or learn these traditions. Most of them will open the site on a phone, often on mobile data, and many read Khmer more easily than English.

What I did for them:
- **Khmer first:** every entry has a Khmer title (`title_khmer` is required), and search matches Khmer titles. The status words, the "waiting for review" message, the review buttons and messages, and the "See more · មើលបន្ថែម" links are in Khmer and English.
- **Phones and slow connections:** I tested the live site on my phone on 5G mobile data. Photos are limited to 5 MB, and the "uses" cards use small drawings instead of large photos.
- **Credit:** every entry shows who it came from ("Contributed by") and where (place).
- **Honest gap:** the sign-in and sign-up pages and their error messages are still English only. I found this in my phone audit and haven't fixed it yet.

## 3. How it works

- **Site:** Next.js 15 (App Router, React 19, plain JavaScript), deployed on Vercel. Styling is inline style objects and one CSS file.
- **Supabase** provides three things:
  1. **Accounts:** email and password sign-up and sign-in (Supabase Auth). `/auth/confirm` handles the link in a confirmation email. Sessions are kept in cookies by `middleware.js` and `@supabase/ssr`.
  2. **Data:** the `entries` table and the `reviewers` table.
  3. **Photos:** the `photos` storage bucket. Each photo is saved as `<user id>/<random uuid>.<ext>` (JPG, PNG or WebP, up to 5 MB). The form checks the file's real first bytes, not just its name.

### Tables
- **`entries`**: `id`, `created_at`, `title`, `title_khmer`, `description`, `contributor`, `place`, `photo_url`, `owner` (the account that added it), `status`. The app always takes `owner` from the logged-in session, never from the form.
- **`reviewers`**: one column, `user_id`. Row-level security is on and it has **no policies**, so nobody can read or change it through the API. The only way onto the list is the Supabase SQL Editor. Right now it holds one account: mine.

### The three statuses
A check constraint only allows these three values:
- **pending**: waiting for review. This is the column default, and the contribute form sends no status on purpose so the default applies.
- **published**: visible to everyone.
- **returned**: sent back to the contributor to change.

### Policies (row-level security)
| Table | Policy | Rule |
|---|---|---|
| entries | anyone can read published entries | SELECT if `status = 'published'`, or you are the owner, or `is_reviewer()` |
| entries | owners add their own entries | INSERT only as yourself (`auth.uid() = owner`) and only with `status = 'pending'` |
| entries | owners edit their own entries | UPDATE only your own rows; the new row must be `pending` unless `is_reviewer()` |
| entries | owners delete their own entries | DELETE only your own rows |
| storage.objects | contributors upload into their own folder | INSERT only into `photos/<your user id>/` |
| storage.objects | contributors delete their own photos | DELETE only in `photos/<your user id>/` |

### Two database functions
- **`is_reviewer()`** returns true if the logged-in user is in `reviewers`.
- **`review_entry(entry_id, decision)`** is the only way to publish or return an entry. See section 4.

### Pages
- `/`: published entries only, newest first, with search on the English and Khmer titles. Everyone sees the whole published archive, logged in or not.
- `/contribute`: logged-in users add an entry with a photo. Afterwards they see a Khmer and English "waiting for review" message.
- `/my-entries`: a logged-in user's own entries, with their status in Khmer and English.
- `/entries/[id]`: one entry. Edit and Delete only show for its owner.
- `/review`: the review queue. Pending entries, oldest first, with Publish and Return buttons. Only reviewers see it.
- `/login`, `/signup`.

## 4. Security decisions

### The gate
Every new entry starts as **pending**, and only a reviewer can make it **published**. This is enforced in the database, not in the page:
- The insert policy refuses any new entry that isn't `pending`.
- The update policy refuses an owner's edit that tries to set `published` (unless they are a reviewer).
- `review_entry` is a `security definer` function that checks everything itself. It returns **false** if the caller isn't a reviewer, if the decision isn't `published` or `returned`, or if the entry isn't `pending` anymore. It only changes `status`, nothing else, so reviewers never get permission to edit someone else's entry.
- Logged-out visitors can't call `review_entry` at all (execute is revoked from `anon`).

### What a hidden Publish button does and doesn't protect
The Review link only shows when `is_reviewer()` is true, and `/review` checks it on the server before loading anything. That keeps the page tidy, but **it is not the security**. A stranger can skip the page and call the API from the browser console. I tested this as a second account: inserting an entry as `published`, updating my own entry to `published` and adding myself to `reviewers` were all refused by row-level security, and calling `review_entry` returned `false`. Logged out, asking for anything not published returned an empty list.

The queue only counts a button press as success when `review_entry` returns exactly `true` (`components/ReviewQueue.js`), because the function says "no" by returning false, not with an error.

### Decisions the briefs left to me
- **An edit goes back to review.** When a contributor edits a published entry, it becomes pending again, so a published entry can't be changed into something else without a reviewer seeing it. My own edits as reviewer stay published.
- **What a returned entry says:** the contributor sees "បានបញ្ជូនត្រឡប់វិញ · Returned to you for changes" on `/my-entries`. It does **not** say why yet, because I didn't add a note column. That's a known gap.
- **Reviewers can't take down published entries.** `review_entry` only acts on pending entries, so the queue can't un-publish anything. A published entry can only be removed by its owner deleting it, or by me in the Supabase dashboard.
- **What search shows a contributor about their own pending entries:** nothing. The home page and search filter `status = 'published'`, so contributors don't see their own pending entries mixed into the public archive. They follow them on `/my-entries` instead.

## 5. AI use

I used two AI tools. Every commit that contains AI-written code is marked "(AI-assisted)".

| Model | Where | Task | Verdict |
|---|---|---|---|
| Cline | VS Code | Sprint 1 and Sprint 2 features (Supabase setup, sign-up and login, contribution form with photo upload, edit and delete own entries, validation fixes) | Kept after reading each diff and testing with a second account |
| Claude (claude-opus-5-5) | Chat | Visual touch-ups: palm-sugar background, sparkles, crayon icons for the "uses" cards | Kept the small changes. Rejected an earlier redesign that changed my fonts and layout, and reverted it with git |
| Claude (claude-opus-5-5) | Chat | Lab 10 contributor side (8 files) and Lab 11 review queue (7 files). The labs said to use Cline; I used Claude instead | Kept, after checking the gate risks line by line and attacking it as a stranger (section 4) |
| DeepSeek V4 Flash, via OpenRouter in Cline | VS Code | Review-day fixes from my classmate Sopheak: "See more" links, clickable "uses" cards with more information | Kept. I tested it, found that opening one card pushed the others' content down, and asked for a follow-up fix |
| DeepSeek V4 Flash, via OpenRouter in Cline | VS Code | First draft of this README | Rewrote most of it (see below) |
| Claude (claude-opus-5-5) | Chat | Checking the README draft against my code and my real Supabase policies; wording help for discussion posts and journals | Used as a reviewer; the decisions are mine |

### Where the AI got it wrong, and how I caught it
- **The README draft described things my code doesn't do.** Cline wrote that logged-out visitors only see a preview of half the entries, but `app/page.js` shows everyone the whole published archive. It also wrote that sign-up redirects to `/auth/confirm`. It couldn't see my SQL, so it guessed the policies. I replaced section 3 with the real policies from `pg_policies` in Supabase.
- **Cline broke my rules and then said it hadn't.** My README prompt said "Do not run any commands." Cline ran a `find` command anyway, and its summary then said "Did not run any commands." Earlier, during the review fixes, it ran `pkill` on its own and stopped my dev server. Both happened because "Execute commands" was on auto-approve.
- **A redesign went too far.** An early AI redesign changed my fonts and Khmer fonts when I'd asked for colors only. I reverted it and kept only small, scoped changes.
- **Cline wrote React-style attributes in a plain SVG file.** When it made `app/icon.svg`, it used `strokeWidth` and `strokeLinecap`, which only work in React. I caught it in the diff and changed them to `stroke-width` and `stroke-linecap` by hand.

### How I checked the work
I read every diff with `git diff` before committing. I tested each feature on localhost and on the live site, with my own account and a second "stranger" account. I attacked the gate from the browser console (section 4), and I ran a two-tab test on the queue to make sure a stale Publish button fails safely.

## 6. Sources and credits

- **Knowledge:** the entries come from what I learned visiting villages as a volunteer, from palm sap tappers, sugar makers, vendors and families in Siem Reap and Kampong Speu. I didn't record people's names or ask permission to publish them, so each entry credits them by their role and place (for example "Sugar makers, Siem Reap"), never by name.
- **Hero photo:** sergk1 on Pexels (Angkor Wat, Siem Reap). The credit shows under the photo on the home page.
- **Entry photos:** downloaded from Pexels, Unsplash and Google Images. Pexels and Unsplash photos are free to use. I didn't record the photographer for each one, and for the Google Images photos I couldn't confirm the licence. That's a known gap: they should be replaced with my own photos or properly credited.
- **Starter code:** the ICT 340 "Khmer Living Archive" template.

## 7. Running it locally

```bash
git clone https://github.com/khadana/Signature-Drink-of-Siem-Reap.git
cd Signature-Drink-of-Siem-Reap
npm install
npm run dev
```

Then open http://localhost:3000. Use `localhost`, not your network IP address: photo upload uses `crypto.randomUUID()`, which only works on https or localhost.

Create a `.env.local` file with these two variables (names only, never commit the values):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`

The publishable key is designed to be public: it ships to every visitor's browser, and row-level security is what protects the data. It is still not committed to this repo; it lives in `.env.local` (git-ignored) and in Vercel's environment variables. No secret key is used anywhere.

## 8. Submission checklist

- Live URL loads logged out and shows published entries only: yes, https://signature-drink-of-siem-reap.vercel.app
- A stranger cannot publish their own entry through the page or the console: yes, tested Oct 25 and Nov 7, 2026
- Logged out, the API returns nothing pending or returned: yes, tested Oct 25, 2026
- Contributors can edit and delete only their own entries: yes
- No secrets anywhere in the repo history: yes, checked with `git log -p` (searched every commit for keys, tokens and .env files)
- At least eight real entries, each with a credited source: yes, 12 published entries
- Khmer renders on every screen a user meets, including the queue: yes
- Works at phone width: yes, tested on my iPhone on 5G
- No test entries, lorem ipsum or TODO comments in shipped pages: yes
- No console errors on the main pages: yes
- jesseorndorff is a collaborator on this repo: yes, invited Nov 22, 2026
- Supabase project restored and awake on Nov 22, 2026
- Demo video link opens in a private window: yes, https://youtu.be/UC_FYbOhi5M
- Reflection pasted in the Canvas submission: yes
- Posted in the Show Your Archive discussion: yes
- Q&A slot booked for Fri Dec 4, 2026, 9:55 AM