# JavaScript Assignment Template

Welcome to the LearnHub JavaScript assignment workspace. This template is optimised for StackBlitz and CodeSandbox, and mirrors the workflow students follow inside the LMS.

## Getting Started

1. Click **Open in StackBlitz** (preferred) or **Open in CodeSandbox** from your course assignment page.
2. Authenticate with GitHub in the online editor when prompted.
3. Create a branch using the assignment naming convention:
   ```
   assign/<assignment-slug>/<github-handle>
   ```
4. Complete the tasks described in [`TASKS.md`](TASKS.md) or the assignment brief.
5. Run the automated tests:
   ```bash
   npm test
   ```
6. Commit your work with meaningful messages and push the branch to your fork.
7. Open a Pull Request (PR) targeting `main` and fill in the PR template checklist.

## Tooling

- **Runtime:** Node 20
- **Tests:** [Vitest](https://vitest.dev/)
- **Linting:** ESLint (Standard config)

## Repository Structure

```
src/
  index.js         # Main entry point
  exercises.js     # Sample function to implement
  README.snippet.md
  ...
tests/
  exercises.test.js
.github/
  pull_request_template.md
  workflows/ci.yml
```

## Scripts

| Command      | Description                      |
|--------------|----------------------------------|
| `npm test`   | Runs Vitest in CI mode           |
| `npm run dev`| Executes the sample program      |
| `npm run lint` | Runs ESLint against the project |

## Submission

- Ensure **all tests pass** before opening a PR.
- Attach a screenshot and a short self-assessment in the PR template.
- Once CI finishes, your LMS status will update automatically.

Good luck and happy coding! 🚀
