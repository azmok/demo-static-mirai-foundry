## Task: Initialize Git repository and push to new GitHub repository

### Prerequisites check
First, verify the following tools are available:
- `git` command
- `gh` command (GitHub CLI)

If `gh` is not installed, install it first:
- Windows: `winget install GitHub.cli`
- After install, run: `gh auth login` (browser-based auth)

---

### Step 1: Ask the user for repository name

Before doing anything, ask the user:

> "新しいGitHubリポジトリの名前を教えてください。
> また、公開リポジトリ（public）にしますか？それとも非公開（private）にしますか？"

Wait for the user's response before proceeding.

---

### Step 2: Initialize local Git repository

Run the following commands in the current working directory:
```bash
git init
git checkout -b main
```

If a `master` branch already exists (i.e., commits exist), rename it:
```bash
git branch -m master main
```

---

### Step 3: Stage and commit
```bash
git add .
git commit -m "initial commit"
```

If there is nothing to commit, skip the commit step and notify the user.

---

### Step 4: Create GitHub repository and push

Using the repository name provided by the user (e.g., `REPO_NAME`) and visibility (`public` or `private`):
```bash
gh repo create REPO_NAME --public --source=. --remote=origin --push
# or for private:
gh repo create REPO_NAME --private --source=. --remote=origin --push
```

---

### Step 5: Confirm success

After pushing, run:
```bash
git remote -v
git log --oneline -3
```

Then report to the user:
- The GitHub repository URL
- The current branch name (should be `main`)
- The latest commit hash and message