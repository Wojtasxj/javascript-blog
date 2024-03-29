'use strict';

const titleClickHandler = function(event){
  // console.log('Link was clicked!');
  // console.log(event);
  
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }   
  event.preventDefault();
  const clickedElement = this;
  clickedElement.classList.add('active');
  // console.log('clickedElement:', clickedElement);

  const activeArticles = document.querySelectorAll('.posts .active');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  // console.log('articleSelector:', articleSelector);
  
  const targetArticle = document.querySelector(articleSelector);
  // console.log('targetArticle:', targetArticle);

  targetArticle.classList.toggle('active');

};
  
  
/* kolejny submoduł */
const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list';

function generateTitleLinks() {
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  const articles = document.querySelectorAll(optArticleSelector);
  let html = '';
  for (let article of articles) {
    const articleId = article.getAttribute('id');
    // console.log('articleId:', articleId);
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    // console.log('articleTitle:', articleTitle);
    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    // console.log('linkHTML:', linkHTML);
    html = html + linkHTML;
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  // console.log('links:', links);
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

function generateTags(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector); 
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = articles.getAttribute('data-tags');
    console.log('article tags:', articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    console.log('article tags array:', articleTagsArray);
    /* START LOOP: for each tag */
    for(let tag of articleTagsArray){
      /* generate HTML of the link */
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      /* add generated code to html variable */
      html += tagHTML;
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;    
  }
  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event){
  event.preventDefault(); // prevent default action for this event

  const clickedElement = this; // make new constant named "clickedElement" and give it the value of "this"
  const href = clickedElement.getAttribute('href'); // make a new constant "href" and read the attribute "href" of the clicked element
  const tag = href.replace('#tag-', ''); // make a new constant "tag" and extract tag from the "href" constant

  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]'); // find all tag links with class active
  for(let activeTagLink of activeTagLinks){ // START LOOP: for each active tag link
    activeTagLink.classList.remove('active'); // remove class active
  } // END LOOP: for each active tag link

  const tagLinks = document.querySelectorAll('a[href="' + href + '"]'); // find all tag links with "href" attribute equal to the "href" constant
  for(let tagLink of tagLinks){ // START LOOP: for each found tag link
    tagLink.classList.add('active'); // add class active
  } // END LOOP: for each found tag link

  generateTitleLinks('[data-tags~="' + tag + '"]'); // execute function "generateTitleLinks" with article selector as argument
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]'); // find all links to tags
  for(let tagLink of tagLinks){ // START LOOP: for each link
    tagLink.addEventListener('click', tagClickHandler); // add tagClickHandler as event listener for that link
  } // END LOOP: for each link
}

addClickListenersToTags();

