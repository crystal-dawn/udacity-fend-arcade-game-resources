
/**
 * @todo remove unused criterias dynamically
 */
const criteriasList = [
  "One",
  "two two",
  "three three three"
];

const types = [
  "a",
  "b",
  "c",
  "d"
];

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
 * @description loop through array of criterias creating each section
 * @todo remove empty cards
 */
const criteriaCard = () => {
  for (i = 0; i < criteriasList.length; i++) {
    const criterias = criteriasList.map((criteria, index) => {
      document.querySelector('main')
        .insertAdjacentHTML('afterbegin',
          `<section class="criteria">
          <h2 class="criteria-header" id="criteria${index}">${criteria}</h2>
        </section>`);

            document.querySelectorAll('span')[1].insertAdjacentHTML('afterbegin',
              `<a class="dropdown-content-link" href="#criteria${index}">${criteria}</a>`)
      typeCard(criteria);
    })

  }
}

/**
 * @description create type cards for each type of resources
 */
const typeCard = (criteria) => {
  types.map(type => {
    document.querySelector('h2')
      .insertAdjacentHTML('afterend',
        `<section class="type">
          <h3 class="type-header">${type}</h3>
          <br/>
        `);
    resourceCard(criteria, type);
  })
}

/**
 * @description create resource card buttons for each resource
 */
const resourceCard = (criteria, type) => {
  for (i = 0; i < resources.length; i++) {
    if (type === resources[i].type && criteria === resources[i].criteria) {
      document.querySelector('h3')
        .insertAdjacentHTML('afterend', `
          <button class="resource">
            <a class="link" href=${resources[i].url}>
              <h4 class="link-header">${resources[i].page}</h4>
              <span class="credit">Shared by: ${resources[i].sharer}</span>
            </a>
           </button>
         </section>
        `)
    }
  }
}

document.body.onload = loadPage();