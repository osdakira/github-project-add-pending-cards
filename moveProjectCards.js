/* global PropertiesService */
/* global UrlFetchApp */
/* exported moveProjectCards */

function getProperty(propertyName) {
  return PropertiesService.getScriptProperties().getProperty(propertyName);
}

function callGraphql(data) {
  const token = getProperty('GITHUB_API_TOKEN');
  const url = 'https://api.github.com/graphql';
  const response = UrlFetchApp.fetch(url, {
    headers: {
      Authorization: `token ${token}`,
    },
    method: 'POST',
    contentType: 'application/json',
    payload: JSON.stringify(data),
  });
  return JSON.parse(response);
}

function makePendingCardsJson() {
  const repoName = getProperty('GITHUB_REPO_NAME');
  const owner = getProperty('GITHUB_REPO_OWNER');
  const projectNumber = getProperty('GITHUB_PROJECT_NUMBER');
  const QUERY = `
    {
      repository(name: "${repoName}", owner: "${owner}") {
        project(number: ${projectNumber}) {
          pendingCards(first: 10) {
            nodes {
              id
            }
          }
        }
      }
    }
  `;
  return { query: QUERY.replace(/\s+/g, ' ') };
}

function fetchPendingCardIds() {
  const pendingCardsJson = makePendingCardsJson();
  const pendingCards = callGraphql(pendingCardsJson);
  const pendingCardIds = pendingCards.data.repository.project.pendingCards.nodes.map((x) => x.id);
  return pendingCardIds;
}

function makeMoveNewColumnsJsons(pendingCardIds) {
  const newColumnId = getProperty('GITHUB_PROJECT_COLUMN_ID');
  return pendingCardIds.map((id) => {
    const QUERY = `
      mutation {
        moveProjectCard(input: {
          columnId: "${newColumnId}",
          cardId: "${id}"
        }) {
          clientMutationId
        }
      }
    `;
    return { query: QUERY.replace(/\s+/g, ' ') };
  });
}

function moveProjectCards() {
  const pendingCardIds = fetchPendingCardIds();
  const jsons = makeMoveNewColumnsJsons(pendingCardIds);
  jsons.forEach((json) => callGraphql(json));
}
