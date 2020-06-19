# github-project-add-pending-cards
Add a card to a column instead of triaging on the github project

# install

1. Setup clasp

```
npm i @google/clasp -g
clasp login
clasp push
clasp deploy
```

2. Set GAS property.

```
clasp open
```

- GITHUB_API_TOKEN
- GITHUB_REPO_NAME
- GITHUB_REPO_OWNER
- GITHUB_PROJECT_NUMBER
- GITHUB_PROJECT_COLUMN_ID

3. Set github webhook to gas url

You must check `Issues, Project cards,Project columns` events.

# development

```
npm i @google/clasp -g
clasp login
clasp create
```
