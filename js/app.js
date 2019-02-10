/**
 * @description create main element when page loads
 * @todo Try and do IFFE for page loads
 */
const loadPage = () => {
  mainElement();
}

/**
 * @description add main element for start of criteria cards
 */
const mainElement = () => {
  document.querySelector('nav')
  .insertAdjacentHTML('afterend', `<main class="criterias"></main>`);

  criteriaCard();
}

/**
 * @description Create one criteria card for each item from the rubric
 */
function criteriaCard() {
  //create a Set for criterias. Sets automatically don't add duplicate values
  //without sending an error. This creates one list with a single entry for
  //any criteria listed in resources
  let criteriaSet = new Set();
  resources.forEach(criteria => criteriaSet.add(criteria.criteria));

  // create an array so that an index can be established.
  let criteriaArray = [...criteriaSet.values()];

  //one card for each criteria from the array
  criteriaArray.forEach((criteria, criteriaIndex) => {
    document.querySelector('nav')
      .insertAdjacentHTML('afterend',
        `<section class="criteria">
        <h2 class="criteria-header" id="criteria${criteriaIndex}">${criteria}</h2>
      </section>`);

    //populate Rubric criteria dropdown nav
    document.querySelectorAll('span')[1].insertAdjacentHTML('afterbegin',
      `<a class="dropdown-content-link" href="#criteria${criteriaIndex}">${criteria}</a>`)
  })
}

document.body.onload = loadPage();
