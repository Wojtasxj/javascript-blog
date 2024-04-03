'use strict';
const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink: Handlebars.compile(document.querySelector('#template-tagcloud-link').innerHTML),
  authorCloudLink: Handlebars.compile(document.querySelector('#template-authorcloud-link').innerHTML),
}
const titleClickHandler = function(event) {
  event.preventDefault();
  
  const clickedElement = this;
  
  const activeLinks = document.querySelectorAll('.titles a.active');
  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }   
  
  clickedElement.classList.add('active');
  
  const activeArticles = document.querySelectorAll('.posts .active');
  for (let activeArticle of activeArticles) {
    activeArticle.classList.remove('active');
  }

  const articleSelector = clickedElement.getAttribute('href');
  
  const targetArticle = document.querySelector(articleSelector);
  targetArticle.classList.toggle('active');
};

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
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    const articleAuthor = article.getAttribute('data-author');
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
    html += linkHTML;
    const authorElement = article.querySelector('.post-author');
    if (authorElement) {
      authorElement.innerHTML = templates.authorLink({ author: articleAuthor });
    }
  }
  titleList.innerHTML = html;

  const links = document.querySelectorAll('.titles a');
  for (let link of links) {
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

function generateTags() {
  let allTags = {};
  const articles = document.querySelectorAll(optArticleSelector);
  const tagsParams = calculateTagsParams(allTags);
  for (let article of articles) {
    const tagsWrapper = article.querySelector(optArticleTagsSelector); 
    let html = '';
    const articleTags = article.getAttribute('data-tags');
    const articleTagsArray = articleTags.split(' ');
    for (let tag of articleTagsArray) {
      const tagHTMLData = { className: calculateTagClass(allTags[tag], tagsParams), tagName: tag };
      const tagHTML = templates.tagLink(tagHTMLData);
      
      html += tagHTML;
      if (!allTags[tag]) {
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
    }
    tagsWrapper.innerHTML = html;    
  }
  const tagList = document.querySelector(optTagsListSelector);
  
  
  const allTagsData = {tags: []};
  for (let tag in allTags) {
    // const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</a></li>';
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
  }
  // allTagsHTML += '</ul>';
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function tagClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  const tag = href.replace('#tag-', '');
  const activeTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  for (let activeTagLink of activeTagLinks) { 
    activeTagLink.classList.remove('active');
  }
  const tagLinks = document.querySelectorAll('a[href="' + href + '"]');
  for (let tagLink of tagLinks) {
    tagLink.classList.add('active');
  }

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
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
    const authorHTMLData = { author: author, count: authors[author] };
    const authorHTML = templates.authorCloudLink(authorHTMLData);
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
