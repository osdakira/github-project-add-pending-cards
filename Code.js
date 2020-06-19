/* exported doPost */
/* global moveProjectCards */

function doPost(e) {
  const jsonStr = e.postData.getDataAsString();
  const json = JSON.parse(jsonStr);
  moveProjectCards(json);
}
