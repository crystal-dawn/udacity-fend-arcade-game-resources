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
function criteriaCard() {
  for (i = 0; i < criteriasList.length; i++) {
    const criterias = criteriasList.map((criteria, index) => {
      document.querySelector('main')
        .insertAdjacentHTML('afterbegin',
          `<section class="criteria">
          <h2 class="criteria-header" id="criteria${index}">${criteria}</h2>
        </section>`);

      document.querySelectorAll('span')[1].insertAdjacentHTML('afterbegin',
        `<a class="dropdown-content-link" href="#criteria${index}">${criteria}</a>`)
    })
  }
}

document.body.onload = loadPage();
