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
  optArticleAuthorSelector = '.post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = 5,
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors-list';

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

function calculateTagsParams(tags) {
  const params = {
    max: 0,
    min: 999999
  };

  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times');

    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }
    if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }

  return params;
}

function calculateTagClass(count, params) {
  const classNumber = Math.floor((count - params.min) / ((params.max - params.min) / optCloudClassCount) + 1);
  return optCloudClassPrefix + classNumber;
}
function generateTags(){
  let allTags = {};
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
      if(!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;    
  }
  const tagList = document.querySelector(optTagsListSelector);
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  
  let allTagsHTML = '<ul class="tags">';
    for (let tag in allTags) {
      const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
      allTagsHTML += tagLinkHTML;
    }
  allTagsHTML += '</ul>';
  tagList.innerHTML = allTagsHTML;
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
  const authorsList = document.querySelector(optAuthorsListSelector);
  authorsList.innerHTML = '';
  
  const articles = document.querySelectorAll(optArticleSelector);
  let authors = {};
  
  for (let article of articles) {
    const articleAuthor = article.getAttribute('data-author');
    
    if (!authors[articleAuthor]) {
      authors[articleAuthor] = 1;
    } else {
      authors[articleAuthor]++;
    }
  }
  
  let html = '<ul>';
  
  for (let author in authors) {
    const authorHTML = '<li><a href="#author-' + author + '">' + author + ' (' + authors[author] + ')</a></li>';
    html += authorHTML;
  }
  
  html += '</ul>';
  authorsList.innerHTML = html;
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