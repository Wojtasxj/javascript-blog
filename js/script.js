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
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post-author';

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
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles){
    const tagsWrapper = article.querySelector(optArticleTagsSelector); 
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    // console.log('article tags:', articleTags);
    const articleTagsArray = articleTags.split(' ');
    // console.log('article tags array:', articleTagsArray);
    for(let tag of articleTagsArray){
      const tagHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
      html += tagHTML;
    }
    tagsWrapper.innerHTML = html;    
  }
}
generateTags();
function tagClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for(let activeTagLink of activeTagLinks){ 
    activeTagLink.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for(let tagLink of tagLinks){
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
  tagLinks.forEach(tagLink => tagLink.addEventListener('click', tagClickHandler));
}

addClickListenersToTags();

function generateAuthors() {
  const articles = document.querySelectorAll(optArticleSelector);
  
  for (let article of articles) {
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = article.getAttribute('data-author');
    
    const authorHTML = '<p><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></p>';
    html += authorHTML;
    
    authorWrapper.innerHTML = html;
  }
}
generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();
  
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const author = href.replace('#author-', '');
  
  const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  for (let activeAuthorLink of activeAuthorLinks) {
    activeAuthorLink.classList.remove('active');
  }
  
  const authorLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let authorLink of authorLinks) {
    authorLink.classList.add('active');
  }

  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {
  const authorLinks = document.querySelectorAll('a[href^="#author-"]');
  authorLinks.forEach(authorLink => authorLink.addEventListener('click', authorClickHandler));
}
addClickListenersToAuthors();