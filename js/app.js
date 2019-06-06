/**
 * @description create main element when page loads
 */
const loadPage = () => {
  mainElement();
}

/**
 * @description add main element for start of criteria cards
 */
const mainElement = () => {
  document.querySelector('header')
    .insertAdjacentHTML('afterend', `<main class="criterias" id="criterias"></main>`);

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

  const entries = criteriaSet.entries();

  //one card for each criteria from the array
  for (const [criteriaIndex, criteria] of entries) {
    document.querySelector('main').insertAdjacentHTML('afterbegin',
      `<section class="criteria">
          <div id="ctn${criteriaIndex}" style="position:relative;">
            <h2 class="criteria-header">${criteria}</h2>
            <a id="criteria${criteriaIndex}">&nbsp;</a>
          </div>
        </section>`);

    //populate Rubric criteria dropdown nav
    document.querySelector('ul').insertAdjacentHTML('afterbegin',
      `<li class="criteria-list">
         <a class="dropdown-link" href="#criteria${criteriaIndex}">${criteria}</a>
      </li>`)
    typeCard(criteria, criteriaIndex);
  }
}

/**
 * @description Dynamically create type card using forEach method
 */
function typeCard(criteria, criteriaIndex) {
  // typeSet so that there aren't duplicate entries
  const typeSet = new Set();
  resources.forEach(type => typeSet.add(`${type.type}`))

  const entries = typeSet.entries();

  for (const [typeIndex, type] of entries) {
    document.querySelector('section > div ')
      .insertAdjacentHTML('afterend',
        // criteriaIndex followed by typeIndex create a unique id for each type
        // card which is necessary to remove empty cards
        `<section class="type" id="${criteriaIndex}${typeIndex}">
          <h3 class="type-header">${type}</h3>
          <br/>
        `);

    resourceCard(criteria, type, criteriaIndex, typeIndex);
  }
}
/**
 * @description Dynamically create resource card using for..of loop
 * @param {string} type - value from type card for matching to resource card
 * @param {object} resource - object from Map to fill in type cards with resources
 */
function resourceCard(criteria, type, criteriaIndex, typeIndex) {
  for (const resource of resources) {
    if (resource[1].type === type && resource[1].criteria === criteria) {
      document.querySelector('h3')
        .insertAdjacentHTML('afterend', `
        <button class="resource" tabindex="-1">
          <a class="resource-link" href='${resource[1].url}'>
            ${resource[0]} </br>
            <span class="credit">Shared by: ${resource[1].sharer}</span>
          </a>
         </button>
       </section>
      `)
    }
  }
  removeEmpty(criteriaIndex, typeIndex);
}

/**
 * @description Remove type cards that don't have children resource cards
 */
const removeEmpty = (criteriaIndex, typeIndex) => {
  let card = document.getElementById(`${criteriaIndex}${typeIndex}`);
  if (card.children.length === 2) {
    card.style.display = "none";
  }
}

document.body.onload = loadPage();
