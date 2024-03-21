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
  
  const links = document.querySelectorAll('.titles a');
    for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
  /* kolejny submoduł */
  const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  
  function clearMessages(){
	document.getElementById('titleList').innerHTML = '';
  }
  /* for each article */

    /* get the article id */

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();