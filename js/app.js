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
    typeCard(criteria, criteriaIndex);
  })
}

/**
 * @description Dynamically create type card using forEach method
 */
function typeCard(criteria, criteriaIndex) {
  // typeSet so that there aren't duplicate entries
  const typeSet = new Set();
  resources.forEach(type => typeSet.add(`${type.type}`))

  // create an array so that an index can be established
  let typeArray = [...typeSet.values()];

  //one card for each type from the array
  typeArray.forEach((type, typeIndex) => {
    document.querySelector('h2')
      .insertAdjacentHTML('afterend',
        // criteriaIndex followed by typeIndex create a unique id for each type
        // card which is necessary to remove empty cards
        `<section class="type" id="${criteriaIndex}${typeIndex}">
          <h3 class="type-header">${type}</h3>
          <br/>
        `);
    resourceCard(criteria, type, criteriaIndex, typeIndex);
  })
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
            <button class="resource">
              <a class="link" href='${resource[1].url}'>
                <h4 class="link-header">${resource[0]}</h4>
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
  console.log(card.children.length);
  if (card.children.length === 2) {
    card.style.display = "none";
  }
}

document.body.onload = loadPage();
