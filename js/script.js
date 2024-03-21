"use strict";

const titleClickHandler = function(event){
    console.log('Link was clicked!');
    console.log(event);
    
    const activeLinks = document.querySelectorAll('.titles a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
      }   
    event.preventDefault();
    const clickedElement = this;
      clickedElement.classList.add('active');
      console.log('clickedElement:', clickedElement);

    const activeArticles = document.querySelectorAll('.posts .active');
    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
      }
  
    const articleSelector = clickedElement.getAttribute('href');
    console.log('articleSelector:', articleSelector);
    
    const targetArticle = document.querySelector(articleSelector);
    console.log('targetArticle:', targetArticle);

    targetArticle.classList.toggle('active');

}
  
  
  /* kolejny submoduł */
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

  function generateTitleLinks() {
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';
    for (let article of articles) {
      const articleId = article.getAttribute('id');
      console.log('articleId:', articleId);
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log('articleTitle:', articleTitle);
      const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      console.log('linkHTML:', linkHTML);
      html = html + linkHTML;
    }
    titleList.innerHTML = html;

    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
    for(let link of links){
      link.addEventListener('click', titleClickHandler);
    }
  
  }
  
  generateTitleLinks();