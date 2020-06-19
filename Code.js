/* exported doPost */
/* global moveProjectCards */

function doPost(e) {
  const jsonStr = e.postData.getDataAsString();
  const json = JSON.parse(jsonStr);
  if (json.issue === undefined) return;
  if (json.action !== 'opened') return;

  moveProjectCards();
}
