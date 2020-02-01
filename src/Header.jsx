import React, { Component } from 'react';
import serialize from 'serialize-javascript'
import parse, {domToReact} from 'html-react-parser';
import xss from 'xss';
 
class Header extends Component {
  static defaultProps = {
    label: ''
  }
  constructor(props) {
    super(props);
  }
  decodeUnicode(str) {
    var res = [];
    for (var i = 0; i < str.length; i++) {
        res[i] = "&#" + str.charCodeAt(i).toString(10);
    }
    return res.join("");
  }
  hasOnEvent(str) {
    let reg = /^on/i;
    return reg.test(str);
  }
  hasJavascript(str) {
    let reg = /^javascript/i;
    str = str.replace(/^\s+|\s+$/g,'');
    console.log(reg.test(str));
    return reg.test(str);
  }
  render() {
    const headStyle = {
      
    };
    if (this.props.data && typeof(this.props.data.content) == 'string') {
      let _dom = this.props.data.content;//"<div style='background:red;'><a id='asdfasdfasdf' href='javascript:alert('XSS');'>asdfasdfasdfasdfasdf</a><button type='submit' formaction='demo_admin.asp'>以管理员身份提交</button><a href='j&#97;vascript:alert&#40;3&#41;'>asdfasdfasdf</a><input type='submit' formaction='JaVaScript:alert(1)'><a href='http://www.baidu.com'>baidu</a><sCript>alert(1)</sCript><br/><br/><br/><br/><br/><button attr='<script>alert(1);</script>'>123123123</button><span><a href='JaVaScript:alert(1)'>asdfasdfasdf</a></span></div>"//this.props.data.content//this.decodeUnicode(this.props.data.content);
      let _parse = xss(_dom, {
        whiteList: {
          a: ["target", "href", "title"],
          abbr: ["title"],
          button: [],
          input: ["type"],
          address: [],
          area: ["shape", "coords", "href", "alt"],
          article: [],
          aside: [],
          audio: ["autoplay", "controls", "loop", "preload", "src"],
          b: [],
          bdi: ["dir"],
          bdo: ["dir"],
          big: [],
          blockquote: ["cite"],
          br: [],
          caption: [],
          center: [],
          cite: [],
          code: [],
          col: ["align", "valign", "span", "width"],
          colgroup: ["align", "valign", "span", "width"],
          dd: [],
          del: ["datetime"],
          details: ["open"],
          div: [],
          dl: [],
          dt: [],
          em: [],
          font: ["color", "size", "face"],
          footer: [],
          h1: [],
          h2: [],
          h3: [],
          h4: [],
          h5: [],
          h6: [],
          header: [],
          hr: [],
          i: [],
          img: ["src", "alt", "title", "width", "height"],
          ins: ["datetime"],
          li: [],
          mark: [],
          nav: [],
          ol: [],
          p: [],
          pre: [],
          s: [],
          section: [],
          small: [],
          span: [],
          sub: [],
          sup: [],
          strong: [],
          table: ["width", "border", "align", "valign"],
          tbody: ["align", "valign"],
          td: ["width", "rowspan", "colspan", "align", "valign"],
          tfoot: ["align", "valign"],
          th: ["width", "rowspan", "colspan", "align", "valign"],
          thead: ["align", "valign"],
          tr: ["rowspan", "align", "valign"],
          tt: [],
          u: [],
          ul: [],
          video: ["autoplay", "controls", "loop", "preload", "src", "height", "width"]  
        }
      });
      /* let _parse = parse(_dom, {
        replace: ({attribs, name}) => {
          let _blacklist = ['script','iframe','from', 'canvans', 'svg'];
          if (_blacklist.indexOf(name) > -1) {
            return <></>;
          }
          else if(attribs) {
            Object.keys(attribs).forEach((key) => {
              console.log(attribs[key]);
              if (this.hasOnEvent(key) || this.hasJavascript(attribs[key])) {
                delete attribs[key];
              }
            });    
          }
          return;
        }
      }); */

      return (
        <header className="nb-header" dangerouslySetInnerHTML={{ __html: _parse }}>
        </header>
      );
    }
    else {
      return (
        <header className="nb-header">
        </header>
      );
    }
    
  }
}
 
export default Header;
