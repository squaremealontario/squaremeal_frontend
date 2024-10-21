import { Link } from "react-router-dom";
import $ from 'jquery';
import { useState } from "react";



var Page404Dark=()=>
{
    const css = `
        
    * {
      margin: 0;
      padding: 0;
      -webkit-text-size-adjust: none;
    }
    
    html, body {
      height: 100%;
      overflow: hidden;
    }
    
    body {
      padding: 0;
      margin: 0;
      background: #181828;
      font-size: 14px;
      line-height: 1;
    }
    
    label {
      cursor: pointer;
    }
    
    a {
      margin: 0;
      padding: 0;
      vertical-align: baseline;
      background: transparent;
      text-decoration: none;
      color: #000;
    }
    
    input, select, button, textarea {
      margin: 0;
      font-size: 100%;
    }
    
    html, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code, del, dfn, em, font, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, input {
      border: 0;
      outline: 0;
      font-size: 100%;
      vertical-align: baseline;
      background: transparent;
    }
    
    
    .top-header:before {
        background-image: url(https://1.bp.blogspot.com/-gxsOcYWghHA/Xp_izTh4sFI/AAAAAAAAU8s/y637Fwg99qAuzW9na_NT_uApny8Vce95gCEwYBhgL/s1600/header-footer-gradient-bg.png);
    }
    .top-header:before {
        content: '';
        display: block;
        width: 100%;
        height: 4px;
        background-repeat: repeat-x;
        background-size: contain;
        position: absolute;
        top: 0;
        left: 0;
      opacity:0.5;
    }
    
    
    .starsec{
      content: " ";
        position: absolute;
        width: 3px;
        height: 3px;
        background: transparent;
       box-shadow: 571px 173px #00BCD4, 1732px 143px #00BCD4, 1745px 454px #FF5722, 234px 784px #00BCD4, 1793px 1123px #FF9800, 1076px 504px #03A9F4, 633px 601px #FF5722, 350px 630px #FFEB3B, 1164px 782px #00BCD4, 76px 690px #3F51B5, 1825px 701px #CDDC39, 1646px 578px #FFEB3B, 544px 293px #2196F3, 445px 1061px #673AB7, 928px 47px #00BCD4, 168px 1410px #8BC34A, 777px 782px #9C27B0, 1235px 1941px #9C27B0, 104px 1690px #8BC34A, 1167px 1338px #E91E63, 345px 1652px #009688, 1682px 1196px #F44336, 1995px 494px #8BC34A, 428px 798px #FF5722, 340px 1623px #F44336, 605px 349px #9C27B0, 1339px 1344px #673AB7, 1102px 1745px #3F51B5, 1592px 1676px #2196F3, 419px 1024px #FF9800, 630px 1033px #4CAF50, 1995px 1644px #00BCD4, 1092px 712px #9C27B0, 1355px 606px #F44336, 622px 1881px #CDDC39, 1481px 621px #9E9E9E, 19px 1348px #8BC34A, 864px 1780px #E91E63, 442px 1136px #2196F3, 67px 712px #FF5722, 89px 1406px #F44336, 275px 321px #009688, 592px 630px #E91E63, 1012px 1690px #9C27B0, 1749px 23px #673AB7, 94px 1542px #FFEB3B, 1201px 1657px #3F51B5, 1505px 692px #2196F3, 1799px 601px #03A9F4, 656px 811px #00BCD4, 701px 597px #00BCD4, 1202px 46px #FF5722, 890px 569px #FF5722, 1613px 813px #2196F3, 223px 252px #FF9800, 983px 1093px #F44336, 726px 1029px #FFC107, 1764px 778px #CDDC39, 622px 1643px #F44336, 174px 1559px #673AB7, 212px 517px #00BCD4, 340px 505px #FFF, 1700px 39px #FFF, 1768px 516px #F44336, 849px 391px #FF9800, 228px 1824px #FFF, 1119px 1680px #FFC107, 812px 1480px #3F51B5, 1438px 1585px #CDDC39, 137px 1397px #FFF, 1080px 456px #673AB7, 1208px 1437px #03A9F4, 857px 281px #F44336, 1254px 1306px #CDDC39, 987px 990px #4CAF50, 1655px 911px #00BCD4, 1102px 1216px #FF5722, 1807px 1044px #FFF, 660px 435px #03A9F4, 299px 678px #4CAF50, 1193px 115px #FF9800, 918px 290px #CDDC39, 1447px 1422px #FFEB3B, 91px 1273px #9C27B0, 108px 223px #FFEB3B, 146px 754px #00BCD4, 461px 1446px #FF5722, 1004px 391px #673AB7, 1529px 516px #F44336, 1206px 845px #CDDC39, 347px 583px #009688, 1102px 1332px #F44336, 709px 1756px #00BCD4, 1972px 248px #FFF, 1669px 1344px #FF5722, 1132px 406px #F44336, 320px 1076px #CDDC39, 126px 943px #FFEB3B, 263px 604px #FF5722, 1546px 692px #F44336;
      animation: animStar 150s linear infinite;
    }
    
    .starthird
    {
      content: " ";
        position: absolute;
        width: 3px;
        height: 3px;
        background: transparent;
       box-shadow: 571px 173px #00BCD4, 1732px 143px #00BCD4, 1745px 454px #FF5722, 234px 784px #00BCD4, 1793px 1123px #FF9800, 1076px 504px #03A9F4, 633px 601px #FF5722, 350px 630px #FFEB3B, 1164px 782px #00BCD4, 76px 690px #3F51B5, 1825px 701px #CDDC39, 1646px 578px #FFEB3B, 544px 293px #2196F3, 445px 1061px #673AB7, 928px 47px #00BCD4, 168px 1410px #8BC34A, 777px 782px #9C27B0, 1235px 1941px #9C27B0, 104px 1690px #8BC34A, 1167px 1338px #E91E63, 345px 1652px #009688, 1682px 1196px #F44336, 1995px 494px #8BC34A, 428px 798px #FF5722, 340px 1623px #F44336, 605px 349px #9C27B0, 1339px 1344px #673AB7, 1102px 1745px #3F51B5, 1592px 1676px #2196F3, 419px 1024px #FF9800, 630px 1033px #4CAF50, 1995px 1644px #00BCD4, 1092px 712px #9C27B0, 1355px 606px #F44336, 622px 1881px #CDDC39, 1481px 621px #9E9E9E, 19px 1348px #8BC34A, 864px 1780px #E91E63, 442px 1136px #2196F3, 67px 712px #FF5722, 89px 1406px #F44336, 275px 321px #009688, 592px 630px #E91E63, 1012px 1690px #9C27B0, 1749px 23px #673AB7, 94px 1542px #FFEB3B, 1201px 1657px #3F51B5, 1505px 692px #2196F3, 1799px 601px #03A9F4, 656px 811px #00BCD4, 701px 597px #00BCD4, 1202px 46px #FF5722, 890px 569px #FF5722, 1613px 813px #2196F3, 223px 252px #FF9800, 983px 1093px #F44336, 726px 1029px #FFC107, 1764px 778px #CDDC39, 622px 1643px #F44336, 174px 1559px #673AB7, 212px 517px #00BCD4, 340px 505px #FFF, 1700px 39px #FFF, 1768px 516px #F44336, 849px 391px #FF9800, 228px 1824px #FFF, 1119px 1680px #FFC107, 812px 1480px #3F51B5, 1438px 1585px #CDDC39, 137px 1397px #FFF, 1080px 456px #673AB7, 1208px 1437px #03A9F4, 857px 281px #F44336, 1254px 1306px #CDDC39, 987px 990px #4CAF50, 1655px 911px #00BCD4, 1102px 1216px #FF5722, 1807px 1044px #FFF, 660px 435px #03A9F4, 299px 678px #4CAF50, 1193px 115px #FF9800, 918px 290px #CDDC39, 1447px 1422px #FFEB3B, 91px 1273px #9C27B0, 108px 223px #FFEB3B, 146px 754px #00BCD4, 461px 1446px #FF5722, 1004px 391px #673AB7, 1529px 516px #F44336, 1206px 845px #CDDC39, 347px 583px #009688, 1102px 1332px #F44336, 709px 1756px #00BCD4, 1972px 248px #FFF, 1669px 1344px #FF5722, 1132px 406px #F44336, 320px 1076px #CDDC39, 126px 943px #FFEB3B, 263px 604px #FF5722, 1546px 692px #F44336;
      animation: animStar 10s linear infinite;
    }
    
    .starfourth
    {
      content: " ";
        position: absolute;
        width: 2px;
        height: 2px;
        background: transparent;
       box-shadow: 571px 173px #00BCD4, 1732px 143px #00BCD4, 1745px 454px #FF5722, 234px 784px #00BCD4, 1793px 1123px #FF9800, 1076px 504px #03A9F4, 633px 601px #FF5722, 350px 630px #FFEB3B, 1164px 782px #00BCD4, 76px 690px #3F51B5, 1825px 701px #CDDC39, 1646px 578px #FFEB3B, 544px 293px #2196F3, 445px 1061px #673AB7, 928px 47px #00BCD4, 168px 1410px #8BC34A, 777px 782px #9C27B0, 1235px 1941px #9C27B0, 104px 1690px #8BC34A, 1167px 1338px #E91E63, 345px 1652px #009688, 1682px 1196px #F44336, 1995px 494px #8BC34A, 428px 798px #FF5722, 340px 1623px #F44336, 605px 349px #9C27B0, 1339px 1344px #673AB7, 1102px 1745px #3F51B5, 1592px 1676px #2196F3, 419px 1024px #FF9800, 630px 1033px #4CAF50, 1995px 1644px #00BCD4, 1092px 712px #9C27B0, 1355px 606px #F44336, 622px 1881px #CDDC39, 1481px 621px #9E9E9E, 19px 1348px #8BC34A, 864px 1780px #E91E63, 442px 1136px #2196F3, 67px 712px #FF5722, 89px 1406px #F44336, 275px 321px #009688, 592px 630px #E91E63, 1012px 1690px #9C27B0, 1749px 23px #673AB7, 94px 1542px #FFEB3B, 1201px 1657px #3F51B5, 1505px 692px #2196F3, 1799px 601px #03A9F4, 656px 811px #00BCD4, 701px 597px #00BCD4, 1202px 46px #FF5722, 890px 569px #FF5722, 1613px 813px #2196F3, 223px 252px #FF9800, 983px 1093px #F44336, 726px 1029px #FFC107, 1764px 778px #CDDC39, 622px 1643px #F44336, 174px 1559px #673AB7, 212px 517px #00BCD4, 340px 505px #FFF, 1700px 39px #FFF, 1768px 516px #F44336, 849px 391px #FF9800, 228px 1824px #FFF, 1119px 1680px #FFC107, 812px 1480px #3F51B5, 1438px 1585px #CDDC39, 137px 1397px #FFF, 1080px 456px #673AB7, 1208px 1437px #03A9F4, 857px 281px #F44336, 1254px 1306px #CDDC39, 987px 990px #4CAF50, 1655px 911px #00BCD4, 1102px 1216px #FF5722, 1807px 1044px #FFF, 660px 435px #03A9F4, 299px 678px #4CAF50, 1193px 115px #FF9800, 918px 290px #CDDC39, 1447px 1422px #FFEB3B, 91px 1273px #9C27B0, 108px 223px #FFEB3B, 146px 754px #00BCD4, 461px 1446px #FF5722, 1004px 391px #673AB7, 1529px 516px #F44336, 1206px 845px #CDDC39, 347px 583px #009688, 1102px 1332px #F44336, 709px 1756px #00BCD4, 1972px 248px #FFF, 1669px 1344px #FF5722, 1132px 406px #F44336, 320px 1076px #CDDC39, 126px 943px #FFEB3B, 263px 604px #FF5722, 1546px 692px #F44336;
      animation: animStar 50s linear infinite;
    }
    
    .starfifth
    {
      content: " ";
        position: absolute;
        width: 1px;
        height: 1px;
        background: transparent;
       box-shadow: 571px 173px #00BCD4, 1732px 143px #00BCD4, 1745px 454px #FF5722, 234px 784px #00BCD4, 1793px 1123px #FF9800, 1076px 504px #03A9F4, 633px 601px #FF5722, 350px 630px #FFEB3B, 1164px 782px #00BCD4, 76px 690px #3F51B5, 1825px 701px #CDDC39, 1646px 578px #FFEB3B, 544px 293px #2196F3, 445px 1061px #673AB7, 928px 47px #00BCD4, 168px 1410px #8BC34A, 777px 782px #9C27B0, 1235px 1941px #9C27B0, 104px 1690px #8BC34A, 1167px 1338px #E91E63, 345px 1652px #009688, 1682px 1196px #F44336, 1995px 494px #8BC34A, 428px 798px #FF5722, 340px 1623px #F44336, 605px 349px #9C27B0, 1339px 1344px #673AB7, 1102px 1745px #3F51B5, 1592px 1676px #2196F3, 419px 1024px #FF9800, 630px 1033px #4CAF50, 1995px 1644px #00BCD4, 1092px 712px #9C27B0, 1355px 606px #F44336, 622px 1881px #CDDC39, 1481px 621px #9E9E9E, 19px 1348px #8BC34A, 864px 1780px #E91E63, 442px 1136px #2196F3, 67px 712px #FF5722, 89px 1406px #F44336, 275px 321px #009688, 592px 630px #E91E63, 1012px 1690px #9C27B0, 1749px 23px #673AB7, 94px 1542px #FFEB3B, 1201px 1657px #3F51B5, 1505px 692px #2196F3, 1799px 601px #03A9F4, 656px 811px #00BCD4, 701px 597px #00BCD4, 1202px 46px #FF5722, 890px 569px #FF5722, 1613px 813px #2196F3, 223px 252px #FF9800, 983px 1093px #F44336, 726px 1029px #FFC107, 1764px 778px #CDDC39, 622px 1643px #F44336, 174px 1559px #673AB7, 212px 517px #00BCD4, 340px 505px #FFF, 1700px 39px #FFF, 1768px 516px #F44336, 849px 391px #FF9800, 228px 1824px #FFF, 1119px 1680px #FFC107, 812px 1480px #3F51B5, 1438px 1585px #CDDC39, 137px 1397px #FFF, 1080px 456px #673AB7, 1208px 1437px #03A9F4, 857px 281px #F44336, 1254px 1306px #CDDC39, 987px 990px #4CAF50, 1655px 911px #00BCD4, 1102px 1216px #FF5722, 1807px 1044px #FFF, 660px 435px #03A9F4, 299px 678px #4CAF50, 1193px 115px #FF9800, 918px 290px #CDDC39, 1447px 1422px #FFEB3B, 91px 1273px #9C27B0, 108px 223px #FFEB3B, 146px 754px #00BCD4, 461px 1446px #FF5722, 1004px 391px #673AB7, 1529px 516px #F44336, 1206px 845px #CDDC39, 347px 583px #009688, 1102px 1332px #F44336, 709px 1756px #00BCD4, 1972px 248px #FFF, 1669px 1344px #FF5722, 1132px 406px #F44336, 320px 1076px #CDDC39, 126px 943px #FFEB3B, 263px 604px #FF5722, 1546px 692px #F44336;
      animation: animStar 80s linear infinite;
    }
    
    @keyframes animStar
    {
      0% {
        transform: translateY(0px);
    }
      100% {
        transform: translateY(-2000px);
    }
    }
    
    
    
    button {
      border: none;
      padding: 0;
      font-size: 0;
      line-height: 0;
      background: none;
      cursor: pointer;
    }
    
    :focus {
      outline: 0;
    }
    
    .clearfix:before, .clearfix:after {
      content: "";
      display: block;
      height: 0;
      visibility: hidden;
    }
    
    .clearfix:after {
      clear: both;
    }
    
    .clearfix {
      zoom: 1;
    }
    
                /* 1. END BODY */
    /***********************************/
    
    /***********************************
                /* 2. CONTENT */
    /***********************************/
    /* 2.1. Section error */
    .error {
      min-height: 100vh;
      position: relative;
      padding: 240px 0;
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      text-align: center;
      margin-top: 70px;
    }
    
    .error__overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }
    
    .error__content {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100%;
      -webkit-transform: translate(-50%, -50%);
              transform: translate(-50%, -50%);
    }
    
    .error__message {
      text-align: center;
      color: #181828;
    }
    
    .message__title {
      font-family: 'Montserrat', sans-serif;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 5px;
       font-size: 5.6rem;
      padding-bottom: 40px;
      max-width: 960px;
      margin: 0 auto;
    }
    
    .message__text {
      font-family: 'Montserrat', sans-serif;
      line-height: 42px;
      font-size: 18px;
      padding: 0 60px;
      max-width: 680px;
      margin: auto;
    }
    
    .error__nav {
      max-width: 600px;
      margin: 40px auto 0;
      text-align: center;
    }
    
    .e-nav__form {
      position: relative;
      height: 45px;
      overflow: hidden;
      width: 170px;
      display: inline-block;
      vertical-align: top;
      border: 1px solid #212121;
      padding-left: 10px;
      padding-right: 46px;
    }
    
    .e-nav__icon {
      position: absolute;
      right: 15px;
      top: 50%;
      -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
      color: #212121;
      -webkit-transition: color .25s ease;
      transition: color .25s ease;
    }
    
    .e-nav__link {
      height: 45px;
      line-height: 45px;
      width: 170px;
      display: inline-block;
      vertical-align: top;
      margin: 0 15px;
      border: 1px solid #181828;
      color: #181828;
      text-decoration: none;
      font-family: 'Montserrat', sans-serif;
      text-transform: uppercase;
      font-size: 11px;
      letter-spacing: .1rem;
      position: relative;
      overflow: hidden;
    }
    
    .e-nav__link:before {
      content: '';
      height: 200px;
      background: #212121;
      position: absolute;
      top: 70px;
      right: 70px;
      width: 260px;
      -webkit-transition: all .3s;
      transition: all .3s;
      -webkit-transform: rotate(50deg);
              transform: rotate(50deg);
    }
    
    .e-nav__link:after {
      -webkit-transition: all .3s;
      transition: all .3s;
      z-index: 999;
      position: relative;
    }
    
    .e-nav__link:after {
      content: "Home Page";
    }
    
    .e-nav__link:hover:before {
      top: -60px;
      right: -50px;
    }
    
    .e-nav__link:hover {
      color: #fff;
    }
    
    .e-nav__link:nth-child(2):hover:after {
      color: #fff;
    }
    /* 2.1. END Section Error */
    
    /* 2.2. Social style */
    .error__social {
      position: absolute;
      top: 50%;
      -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
      left: 20px;
      z-index: 10;
    }
    
    .e-social__list {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    
    .e-social__icon {
      padding-bottom: 30px;
    }
    
    .e-social__icon:last-child {
      padding-bottom: 0;
    }
    
    .e-social__link {
      color: #fff;
      -webkit-transition: all .25s ease;
      transition: all .25s ease;
      display: block;
    }
    
    .e-social__link:hover {
      opacity: .7;
    }
    /* 2.2. END Social style */
    
    /* 2.3. Lamp */
    .lamp {
      position: absolute;
      left: 0px;
      right: 0px;
      top: 0px;
      margin: 0px auto;
      width: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      transform-origin: center top;
      animation-timing-function: cubic-bezier(0.6, 0, 0.38, 1);
      animation: move 5.1s infinite;
    }
    
    @keyframes move {
      0% {
        transform: rotate(40deg);
      }
      50% {
        transform: rotate(-40deg);
      }
      100% {
        transform: rotate(40deg);
      }
    }
    
    .cable {
      width: 8px;
        height: 248px;
        background-image: linear-gradient(rgb(32 148 218 / 70%), rgb(193 65 25)), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7));
    }
    
    .cover {
      width: 200px;
      height: 80px;
      background: #0bd5e8;
      border-top-left-radius: 50%;
      border-top-right-radius: 50%;
      position: relative;
      z-index: 200;
    }
    
    .in-cover {
      width: 100%;
      max-width: 200px;
      height: 20px;
      border-radius: 100%;
      background: #08ffff;
      position: absolute;
      left: 0px;
      right: 0px;
      margin: 0px auto;
      bottom: -9px;
      z-index: 100;
    }
    .in-cover .bulb {
         width: 50px;
        height: 50px;
        background-color: #08fffa;
        border-radius: 50%;
        position: absolute;
        left: 0px;
        right: 0px;
        bottom: -20px;
        margin: 0px auto;
        -webkit-box-shadow: 0 0 15px 7px rgba(0,255,255,0.8), 0 0 40px 25px rgba(0,255,255,0.5), -75px 0 30px 15px rgba(0,255,255,0.2);
        box-shadow: 0 0 25px 7px rgb(127 255 255 / 80%), 0 0 64px 47px rgba(0,255,255,0.5), 0px 0 30px 15px rgba(0,255,255,0.2);
    }
    
    
    .light {
          width: 200px;
        height: 0px;
        border-bottom: 900px solid rgb(44 255 255 / 24%);
        border-left: 50px solid transparent;
        border-right: 50px solid transparent;
        position: absolute;
        left: 0px;
        right: 0px;
        top: 270px;
        margin: 0px auto;
        z-index: 1;
        border-radius: 90px 90px 0px 0px;
    }
    /* 2.3. END Lamp */
    /***********************************
                /* 2. END CONTENT */
    /***********************************/
    
    /***********************************
                /* 3. RESPONSIVE */
    /***********************************/
    .error {
      overflow: hidden;
      max-height: 100vh;
    }
    @media (max-width: 1400px) { 
      .lamp {
        zoom: .5;
      }
      .error__content {
        top: 55%;
      }
      .message__title {
        font-size: 3.5rem;
      }
    }
    @media (max-width: 900px) {
    
      .message__title {
        font-size: 34px;
    
      }
      .error__content {
        top: 55%;
      }
      }
    @media (max-width: 950px) {
      .lamp__wrap {
        max-height: 100vh;
        overflow: hidden;
        max-width: 100vw;
      }
      .error__social {
        bottom: 30px;
        top: auto;
        transform: none;
        width: 100%;
        position: fixed;
        left: 0;
      }
      .e-social__icon {
        display: inline-block;
        padding-right: 30px;
      }
      .e-social__icon:last-child {
        padding-right: 0;
      }
      .e-social__icon {
        padding-bottom: 0;
      }
    }
    @media (max-width: 750px) {
      body, html, {
        max-height: 100vh;
      }
       .error__content {
        position: static;
        margin: 0 auto;
        transform: none;
        padding-top: 300px;
      }
      .error {
        padding-top: 0;
        padding-bottom: 100px;
        height: 100vh;
      }
      }
    @media (max-width: 650px) {
      .message__title {
        font-size: 36px;
        padding-bottom: 20px;
      }
      .message__text {
        font-size: 16px;
        line-height: 2;
        padding-right: 20px;
        padding-left: 20px;
      }
      .lamp {
        zoom: .6;
      }
      .error__content {
        padding-top: 180px;
      }
      }
    @media (max-width: 480px) {
    
      .message__title {
        font-size: 30px;
      }
      .message__text {
        padding-left: 10px;
        padding-right: 10px;
        font-size: 15px;
      }
      .error__nav {
        margin-top: 20px;
      }
    }
    `
    return(
        <>
        <style>
            {css}
        </style>
        
        <Link to={`/`}>
            <div className="top-header">
            </div>
            {/* <!--dust particel--> */}
            <div>
                <div className="starsec"></div>
                <div className="starthird"></div>
                <div className="starfourth"></div>
                <div className="starfifth"></div>
            </div>
            {/* <!--Dust particle end---> */}


            <div className="lamp__wrap">
                <div className="lamp">
                    <div className="cable"></div>
                    <div className="cover"></div>
                    <div className="in-cover">
                        <div className="bulb"></div>
                    </div>
                    <div className="light"></div>
                </div>
            </div>
            {/* <!-- END Lamp --> */}
            <section className="error">
                {/* <!-- Content --> */}
                <div className="error__content">
                    <div className="error__message message">
                        <h1 className="message__title">Page Not Found</h1>
                        <p className="message__text">We're sorry, the page you were looking for isn't found here. The link you followed may either be broken or no longer exists. Please try again, or take a look at our.</p>
                    </div>
                    <div className="error__nav e-nav">
                        <Link to={`/`} className="e-nav__link"></Link>
                    </div>
                </div>
                {/* <!-- END Content --> */}

            </section>
            </Link>
        </>
    )
}

var Page404Galaxy=()=>
{
    const css = `
    

@import url('https://fonts.googleapis.com/css?family=Dosis:300,400,500');

@-moz-keyframes rocket-movement { 100% {-moz-transform: translate(1200px,-600px);} }
@-webkit-keyframes rocket-movement {100% {-webkit-transform: translate(1200px,-600px); } }
@keyframes rocket-movement { 100% {transform: translate(1200px,-600px);} }
@-moz-keyframes spin-earth { 100% { -moz-transform: rotate(-360deg); transition: transform 20s;  } }
@-webkit-keyframes spin-earth { 100% { -webkit-transform: rotate(-360deg); transition: transform 20s;  } }
@keyframes spin-earth{ 100% { -webkit-transform: rotate(-360deg); transform:rotate(-360deg); transition: transform 20s; } }

@-moz-keyframes move-astronaut {
    100% { -moz-transform: translate(-160px, -160px);}
}
@-webkit-keyframes move-astronaut {
    100% { -webkit-transform: translate(-160px, -160px);}
}
@keyframes move-astronaut{
    100% { -webkit-transform: translate(-160px, -160px); transform:translate(-160px, -160px); }
}
@-moz-keyframes rotate-astronaut {
    100% { -moz-transform: rotate(-720deg);}
}
@-webkit-keyframes rotate-astronaut {
    100% { -webkit-transform: rotate(-720deg);}
}
@keyframes rotate-astronaut{
    100% { -webkit-transform: rotate(-720deg); transform:rotate(-720deg); }
}

@-moz-keyframes glow-star {
    40% { -moz-opacity: 0.3;}
    90%,100% { -moz-opacity: 1; -moz-transform: scale(1.2);}
}
@-webkit-keyframes glow-star {
    40% { -webkit-opacity: 0.3;}
    90%,100% { -webkit-opacity: 1; -webkit-transform: scale(1.2);}
}
@keyframes glow-star{
    40% { -webkit-opacity: 0.3; opacity: 0.3;  }
    90%,100% { -webkit-opacity: 1; opacity: 1; -webkit-transform: scale(1.2); transform: scale(1.2); border-radius: 999999px;}
}

.spin-earth-on-hover{
    
    transition: ease 200s !important;
    transform: rotate(-3600deg) !important;
}

html, body{
    margin: 0;
    width: 100%;
    height: 100%;
    font-family: 'Dosis', sans-serif;
    font-weight: 300;
    -webkit-user-select: none; /* Safari 3.1+ */
    -moz-user-select: none; /* Firefox 2+ */
    -ms-user-select: none; /* IE 10+ */
    user-select: none; /* Standard syntax */
}

.bg-purple{
    background: url(http://salehriaz.com/404Page/img/bg_purple.png);
    background-repeat: repeat-x;
    background-size: cover;
    background-position: left top;
    height: 100%;
    overflow: hidden;
    
}

.custom-navbar{
    padding-top: 15px;
}

.brand-logo{
    margin-left: 25px;
    margin-top: 5px;
    display: inline-block;
}

.navbar-links{
    display: inline-block;
    float: right;
    margin-right: 15px;
    text-transform: uppercase;
    
    
}

ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
/*    overflow: hidden;*/
    display: flex; 
    align-items: center; 
}

li {
    float: left;
    padding: 0px 15px;
}

li a {
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    letter-spacing : 2px;
    font-size: 12px;
    
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    -ms-transition: all 0.3s ease-in;
    -o-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

li a:hover {
    color: #ffcb39;
}

.btn-request{
    padding: 10px 25px;
    border: 1px solid #FFCB39;
    border-radius: 100px;
    font-weight: 400;
}

.btn-request:hover{
    background-color: #FFCB39;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0,0,0,0.1);
}

.btn-go-home{
    position: relative;
    z-index: 200;
    margin: 15px auto;
    width: max-content;
    padding: 10px 15px;
    border: 1px solid #FFCB39;
    border-radius: 100px;
    font-weight: 400;
    display: block;
    color: white;
    text-align: center;
    text-decoration: none;
    letter-spacing : 2px;
    font-size: 11px;
    
    -webkit-transition: all 0.3s ease-in;
    -moz-transition: all 0.3s ease-in;
    -ms-transition: all 0.3s ease-in;
    -o-transition: all 0.3s ease-in;
    transition: all 0.3s ease-in;
}

.btn-go-home:hover{
    background-color: #FFCB39;
    color: #fff;
    transform: scale(1.05);
    box-shadow: 0px 20px 20px rgba(0,0,0,0.1);
}

.central-body{
/*    width: 100%;*/
    padding: 17% 5% 10% 5%;
    text-align: center;
}

.objects img{
    z-index: 90;
    pointer-events: none;
}

.object_rocket{
    z-index: 95;
    position: absolute;
    transform: translateX(-50px);
    top: 75%;
    pointer-events: none;
    animation: rocket-movement 200s linear infinite both running;
}

.object_earth{
    position: absolute;
    top: 20%;
    left: 15%;
    z-index: 90;
/*    animation: spin-earth 100s infinite linear both;*/
}

.object_moon{
    position: absolute;
    top: 12%;
    left: 25%;
/*
    transform: rotate(0deg);
    transition: transform ease-in 99999999999s;
*/
}

.earth-moon{
    
}

.object_astronaut{
    animation: rotate-astronaut 200s infinite linear both alternate;
}

.box_astronaut{
    z-index: 110 !important;
    position: absolute;
    top: 60%;
    right: 20%;
    will-change: transform;
    animation: move-astronaut 50s infinite linear both alternate;
}

.image-404{
    position: relative;
    z-index: 100;
    pointer-events: none;
}

.stars{
    background: url(http://salehriaz.com/404Page/img/overlay_stars.svg);
    background-repeat: repeat;
    background-size: contain;
    background-position: left top;
}

.glowing_stars .star{
    position: absolute;
    border-radius: 100%;
    background-color: #fff;
    width: 3px;
    height: 3px;
    opacity: 0.3;
    will-change: opacity;
}

.glowing_stars .star:nth-child(1){
    top: 80%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 1s;
}
.glowing_stars .star:nth-child(2){
    top: 20%;
    left: 40%;
    animation: glow-star 2s infinite ease-in-out alternate 3s;
}
.glowing_stars .star:nth-child(3){
    top: 25%;
    left: 25%;
    animation: glow-star 2s infinite ease-in-out alternate 5s;
}
.glowing_stars .star:nth-child(4){
    top: 75%;
    left: 80%;
    animation: glow-star 2s infinite ease-in-out alternate 7s;
}
.glowing_stars .star:nth-child(5){
    top: 90%;
    left: 50%;
    animation: glow-star 2s infinite ease-in-out alternate 9s;
}

@media only screen and (max-width: 600px){
    .navbar-links{
        display: none;
    }
    
    .custom-navbar{
        text-align: center;
    }
    
    .brand-logo img{
        width: 120px;
    }
    
    .box_astronaut{
        top: 70%;
    }
    
    .central-body{
        padding-top: 25%;
    }
}

    `

    return(
        <>
        <style>
            {css}
        </style>

            <div className="bg-purple">

                <div className="stars">
                    <div className="custom-navbar">
                        <div className="brand-logo">
                            <Link to={`/`}><img src="/img/Logo.png" width="80px" />
                            </Link>
                        </div>
                        <div className="navbar-links">
                            <ul>
                                <li><Link to={`/`}>Home</Link></li>
                                <li><Link to={`/Cart`}>Cart</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="central-body">
                        <img className="image-404" src="http://salehriaz.com/404Page/img/404.svg" width="300px" />
                        <Link to={`/`} className="btn-go-home">GO BACK HOME</Link>
                    </div>
                    <div className="objects">
                        <img className="object_rocket" src="http://salehriaz.com/404Page/img/rocket.svg" width="40px" />
                        <div className="earth-moon">
                            <img className="object_earth" src="http://salehriaz.com/404Page/img/earth.svg" width="100px" />
                            <img className="object_moon" src="http://salehriaz.com/404Page/img/moon.svg" width="80px" />
                        </div>
                        <div className="box_astronaut">
                            <img className="object_astronaut" src="http://salehriaz.com/404Page/img/astronaut.svg" width="140px" />
                        </div>
                    </div>
                    <div className="glowing_stars">
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>
                        <div className="star"></div>

                    </div>

                </div>

            </div>
        </>
    )
}

var NotFoundURL=()=>
{
    const [list, setList] = useState(get_random([0,1]));

    function get_random (list) {
        return list[Math.floor((Math.random()*list.length))];
      }
    return(
        <>
        {
            list===0?
            <>
            <Page404Dark/>
            </>
            :
            list===1?
            <>
                <Page404Galaxy />
            </>
            :
            <>
                <Page404Galaxy />
            </>
        }
        </>
    )
}


export default NotFoundURL;