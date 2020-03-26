/*
 *  GuriQuery.js
 *  Version 1.0.2
 *  https://github.com/Gurigraphics/GuriQuery.js
 *
 *  Licensed under the MIT license:
 *  http://www.opensource.org/licenses/MIT
 *  
 *  GuriQuery.js is a library that use objects Javascript/JSON to create and manipulate tags HTML/XML.
 *  
 */  
var GGQuery = function(){

  var DOM = {
      RENDER: [],   
      get( el ){                    
        if( UTILS.contains( el, "#" ) ){
          el = document.getElementById( UTILS.subs( el ) )
          el.addClass = ( classe ) => el.classList.add( classe )
          el.removeClass = ( classe ) => el.hasClass( classe ) ? el.classList.remove( classe ) : 0
          el.hasClass = ( classe ) => el.classList.contains( classe )
          el.toogleClass = ( classeOld, classeNew ) => el.addClass( classeNew ).remove( classeOld )  
          el.hide = () => el.style.display = 'none'
          el.show = () => el.style.display = 'block'
          el.val = ( param ) => param !== undefined ? el[0].value : el[0].value = param
          el.attr = ( attr, value ) => value == undefined ? el.getAttribute( attr ) : el.setAttribute( attr, value )
          el.html = ( content ) => content !== undefined ? el.innerHTML = content : el.innerHTML
          el.append = ( content ) => el.insertAdjacentHTML('beforeend', content )
          el.prepend = ( content ) => el.insertAdjacentHTML('afterbegin', content )          
          return el
        }else{
          el = document.querySelectorAll( el )          
          el[0].addClass = ( classe ) => el.forEach(function(els){ els.classList.add( classe ) })
          el[0].removeClass = ( classe ) => { el[0].hasClass( classe ) ? el.forEach(function(els){ els.classList.remove( classe ) }) : UTILS.zero() }
          el[0].hasClass = ( classe ) => el[0].classList.contains( classe )
          el[0].toogleClass = ( classeOld, classeNew ) => { el[0].addClass( classeNew ); el[0].removeClass( classeOld ) } 
          el[0].hide = () => el.forEach(function(els){ els.style.display = 'none' })
          el[0].show = () => el.forEach(function(els){ els.style.display = 'block' })
          el[0].val = ( param ) => param !== undefined ? el[0].value = param : el[0].value
          el[0].attr = ( attr, value ) => value == undefined ? el[0].getAttribute( attr ) : el[0].setAttribute( attr, value )
          el[0].html = ( content ) => content !== undefined ? el.forEach(function(els){ els.innerHTML = content }) : 0
          el[0].append = ( content ) => el.forEach(function(els){ els.insertAdjacentHTML('beforeend', content ) })
          el[0].prepend = ( content ) => el.forEach(function(els){ els.insertAdjacentHTML('afterbegin', content ) })
          return el[0]
        }     
      }
  }

  var MOD = {      
      emptyElements: [ "area","base","br","col","embed","hr","img","input","keygen","link","meta","param","source","track","wbr" ],
      h: ( data ) => data ? MOD.mount( data ) : 0, 
      mount( data ){  
        data.style ? data.style = data.style.split("\n").join(" ") : UTILS.zero()       
        !data.tag ? data.tag = "div" : UTILS.zero()
        var el = "<"+data.tag  
        for(let index in data ) index != "tag" && index != "html" ? el+= (" "+index+"='"+data[ index ]+"' ") : UTILS.zero()
        if( MOD.emptyElements.includes( data.tag ) ) return el+"/>"
        else if( data.html ) el+= ">" + data.html     
        else el+=">"  
        return el+="</"+data.tag+">"
      }
  }

  var UTILS = { 
    zero: () => 0,
    subs: ( str ) => str.substring(1),   
    contains: ( el, value ) => ( el.indexOf( value ) !== -1 ? true : false ),
    isString: ( value ) => typeof value === 'string' || value instanceof String, 
    isArray: ( value ) => value && typeof value === 'object' && value.constructor === Array,
    isObject: ( obj ) => obj === Object( obj )
  } 
 
  return{
    get: (v) => DOM.get(v),
    h: (v) => MOD.h(v)
  }
}

export default GGQuery;
