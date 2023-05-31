import { createGlobalStyle } from "styled-components";

export const Styles = createGlobalStyle`

    @font-face {
        font-family: "Motiva Sans Light";
        src: url("/fonts/Petersburg.ttf") format("truetype");
        font-style: normal;
    }

    @font-face {
        font-family: "Motiva Sans Bold";
        src: url("/fonts/Petersburg.ttf") format("truetype");
        font-style: normal;
    }


    body,
    html,
    a {
        font-family: 'Motiva Sans Light', sans-serif;
    }


    body {
        margin:0;
        padding:0;
        border: 0;
        outline: 0;
        background: #fff;
        overflow-x: hidden;
    }
    #root {
        height: 100%;
    }

    a:hover {
        color: #18216d;
    }

    input,
    textarea {
        border-radius: 4px;
        border: 0;
        background: rgb(241, 242, 243);
        transition: all 0.3s ease-in-out;  
        outline: none;
        width: 100%;  
        padding: 1rem 1.25rem;

        :focus-within {
            background: none;
            box-shadow: #2e186a 0px 0px 0px 1px;
        }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-family: 'Motiva Sans Bold', serif;
        color: #18216d;
        font-size: 56px;
        line-height: 1.18;

        @media only screen and (max-width: 890px) {
          font-size: 47px;
        }
      
        @media only screen and (max-width: 414px) {
          font-size: 32px;
        }
    }

    p {
        color: #18216d;
        font-size: 21px;        
        line-height: 1.41;
    }

    h1 {
        font-weight: 600;
    }

    a {
        text-decoration: none;
        outline: none;
        color: #2E186A;

        :hover {
            color: #2e186a;
        }
    }
    
    *:focus {
        outline: none;
    }

    .about-block-image svg {
        text-align: center;
    }

    .ant-drawer-body {
        display: flex;
        flex-direction: column;
        text-align: left;
        padding-top: 1.5rem;
    }

    .ant-drawer-content-wrapper {
        width: 300px !important;
    }
    .review {
      background: var(--clr-white);
      padding: 1.5rem 2rem;
      border-radius: var(--radius);
      box-shadow: var(--light-shadow);
      transition: var(--transition);
      text-align: center;
    }
    .review:hover {
      box-shadow: var(--dark-shadow);
    }
    .img-container {
      position: relative;
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin: 0 auto;
      margin-bottom: 1.5rem;
    }
    .person-img {
      width: 100%;
      display: block;
      height: 100%;
      object-fit: cover;
      border-radius: 50%;
      position: relative;
    }
    .quote-icon {
      position: absolute;
      top: 0;
      left: 0;
      width: 2.5rem;
      height: 2.5rem;
      display: grid;
      place-items: center;
      border-radius: 50%;
      transform: translateY(25%);
      background: var(--clr-primary-5);
      color: var(--clr-white);
    }
    .img-container::before {
      content: '';
      width: 100%;
      height: 100%;
      background: var(--clr-primary-5);
      position: absolute;
      top: -0.25rem;
      right: -0.5rem;
      border-radius: 50%;
    }
    .author {
      margin-bottom: 0.25rem;
    }
    .job {
      margin-bottom: 0.5rem;
      text-transform: uppercase;
      color: var(--clr-primary-5);
      font-size: 0.85rem;
    }
    .info {
      margin-bottom: 0.75rem;
      margin-left: 0.9rem;
    }
    .prev-btn,
    .next-btn {
      color: var(--clr-primary-7);
      font-size: 1.25rem;
      background: transparent;
      border-color: transparent;
      margin: 0 0.5rem;
      transition: var(--transition);
      cursor: pointer;
    }
    .prev-btn:hover,
    .next-btn:hover {
      color: var(--clr-primary-5);
    }
    .random-btn {
      margin-top: 0.5rem;
      background: var(--clr-primary-10);
      color: var(--clr-primary-5);
      padding: 0.25rem 0.5rem;
      text-transform: capitalize;
      border-radius: var(--radius);
      transition: var(--transition);
      border-color: transparent;
      cursor: pointer;
    }
    .random-btn:hover {
      background: var(--clr-primary-5);
      color: var(--clr-primary-1);
    }
    .review-container {
      width: 80vw;
      max-width: var(--fixed-width);
    }
    .loginform{
      max-width: 500px;
      min-width: 300px;
      max-height: 700px;
      width: 30%;
      height: 60%;
      margin: 100px auto;
      background-color: #FF0000;
      border-radius: 25px;
    }
    @keyframes spinner {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }    
    .loading-spinner {
      width: 50px;
      height: 50px;
      border: 10px solid #f3f3f3; /* Light grey */
      border-top: 10px solid #383636; /* Black */
      border-radius: 50%;
      animation: spinner 1.5s linear infinite;
    }
    
    
    .cssload-dots {
        outline: 1px solid red;
        filter: url(#goo);
            -o-filter: url(#goo);
            -ms-filter: url(#goo);
            -webkit-filter: url(#goo);
            -moz-filter: url(#goo);
    }
    
    .cssload-dot {
        width: 0;
        height: 0;
        position: absolute;
        left: 0;
        top: 0;
    }
    .cssload-dot:before {
        content: "";
        width: 34px;
        height: 34px;
        border-radius: 49px;
        background: rgb(251,211,1);
        position: absolute;
        left: 50%;
        transform: translateY(0);
            -o-transform: translateY(0);
            -ms-transform: translateY(0);
            -webkit-transform: translateY(0);
            -moz-transform: translateY(0);
        margin-left: -17.5px;
        margin-top: -17.5px;
    }
    
    
    
    .cssload-dot:nth-child(5):before {
        z-index: 100;
        width: 44.5px;
        height: 44.5px;
        margin-left: -21.75px;
        margin-top: -21.75px;
        animation: cssload-dot-colors 4.6s ease infinite;
            -o-animation: cssload-dot-colors 4.6s ease infinite;
            -ms-animation: cssload-dot-colors 4.6s ease infinite;
            -webkit-animation: cssload-dot-colors 4.6s ease infinite;
            -moz-animation: cssload-dot-colors 4.6s ease infinite;
    }
    
    
    .cssload-dot:nth-child(1) {
        animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
            -o-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
            -ms-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
            -webkit-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
            -moz-animation: cssload-dot-rotate-1 4.6s 0s linear infinite;
    }
    .cssload-dot:nth-child(1):before {
        background-color: rgb(255,50,112);
        animation: cssload-dot-move 4.6s 0s ease infinite;
            -o-animation: cssload-dot-move 4.6s 0s ease infinite;
            -ms-animation: cssload-dot-move 4.6s 0s ease infinite;
            -webkit-animation: cssload-dot-move 4.6s 0s ease infinite;
            -moz-animation: cssload-dot-move 4.6s 0s ease infinite;
    }
    
    .cssload-dot:nth-child(2) {
        animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
            -o-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
            -ms-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
            -webkit-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
            -moz-animation: cssload-dot-rotate-2 4.6s 1.15s linear infinite;
    }
    .cssload-dot:nth-child(2):before {
        background-color: rgb(32,139,241);
        animation: cssload-dot-move 4.6s 1.15s ease infinite;
            -o-animation: cssload-dot-move 4.6s 1.15s ease infinite;
            -ms-animation: cssload-dot-move 4.6s 1.15s ease infinite;
            -webkit-animation: cssload-dot-move 4.6s 1.15s ease infinite;
            -moz-animation: cssload-dot-move 4.6s 1.15s ease infinite;
    }
    
    .cssload-dot:nth-child(3) {
        animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
            -o-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
            -ms-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
            -webkit-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
            -moz-animation: cssload-dot-rotate-3 4.6s 2.3s linear infinite;
    }
    .cssload-dot:nth-child(3):before {
        background-color: rgb(175,225,2);
        animation: cssload-dot-move 4.6s 2.3s ease infinite;
            -o-animation: cssload-dot-move 4.6s 2.3s ease infinite;
            -ms-animation: cssload-dot-move 4.6s 2.3s ease infinite;
            -webkit-animation: cssload-dot-move 4.6s 2.3s ease infinite;
            -moz-animation: cssload-dot-move 4.6s 2.3s ease infinite;
    }
    
    .cssload-dot:nth-child(4) {
        animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
            -o-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
            -ms-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
            -webkit-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
            -moz-animation: cssload-dot-rotate-4 4.6s 3.45s linear infinite;
    }
    .cssload-dot:nth-child(4):before {
        background-color: rgb(251,211,1);
        animation: cssload-dot-move 4.6s 3.45s ease infinite;
            -o-animation: cssload-dot-move 4.6s 3.45s ease infinite;
            -ms-animation: cssload-dot-move 4.6s 3.45s ease infinite;
            -webkit-animation: cssload-dot-move 4.6s 3.45s ease infinite;
            -moz-animation: cssload-dot-move 4.6s 3.45s ease infinite;
    }
    
    @keyframes cssload-dot-move {
        0% {
            transform: translateY(0);
        }
        18%, 22% {
            transform: translateY(-68px);
        }
        40%, 100% {
            transform: translateY(0);
        }
    }
    
    @-o-keyframes cssload-dot-move {
        0% {
            -o-transform: translateY(0);
        }
        18%, 22% {
            -o-transform: translateY(-68px);
        }
        40%, 100% {
            -o-transform: translateY(0);
        }
    }
    
    @-ms-keyframes cssload-dot-move {
        0% {
            -ms-transform: translateY(0);
        }
        18%, 22% {
            -ms-transform: translateY(-68px);
        }
        40%, 100% {
            -ms-transform: translateY(0);
        }
    }
    
    @-webkit-keyframes cssload-dot-move {
        0% {
            -webkit-transform: translateY(0);
        }
        18%, 22% {
            -webkit-transform: translateY(-68px);
        }
        40%, 100% {
            -webkit-transform: translateY(0);
        }
    }
    
    @-moz-keyframes cssload-dot-move {
        0% {
            -moz-transform: translateY(0);
        }
        18%, 22% {
            -moz-transform: translateY(-68px);
        }
        40%, 100% {
            -moz-transform: translateY(0);
        }
    }
    
    @keyframes cssload-dot-colors {
        0% {
            background-color: rgb(251,211,1);
        }
        25% {
            background-color: rgb(255,50,112);
        }
        50% {
            background-color: rgb(32,139,241);
        }
        75% {
            background-color: rgb(175,225,2);
        }
        100% {
            background-color: rgb(251,211,1);
        }
    }
    
    @-o-keyframes cssload-dot-colors {
        0% {
            background-color: rgb(251,211,1);
        }
        25% {
            background-color: rgb(255,50,112);
        }
        50% {
            background-color: rgb(32,139,241);
        }
        75% {
            background-color: rgb(175,225,2);
        }
        100% {
            background-color: rgb(251,211,1);
        }
    }
    
    @-ms-keyframes cssload-dot-colors {
        0% {
            background-color: rgb(251,211,1);
        }
        25% {
            background-color: rgb(255,50,112);
        }
        50% {
            background-color: rgb(32,139,241);
        }
        75% {
            background-color: rgb(175,225,2);
        }
        100% {
            background-color: rgb(251,211,1);
        }
    }
    
    @-webkit-keyframes cssload-dot-colors {
        0% {
            background-color: rgb(251,211,1);
        }
        25% {
            background-color: rgb(255,50,112);
        }
        50% {
            background-color: rgb(32,139,241);
        }
        75% {
            background-color: rgb(175,225,2);
        }
        100% {
            background-color: rgb(251,211,1);
        }
    }
    
    @-moz-keyframes cssload-dot-colors {
        0% {
            background-color: rgb(251,211,1);
        }
        25% {
            background-color: rgb(255,50,112);
        }
        50% {
            background-color: rgb(32,139,241);
        }
        75% {
            background-color: rgb(175,225,2);
        }
        100% {
            background-color: rgb(251,211,1);
        }
    }
    
    @keyframes cssload-dot-rotate-1 {
        0% {
            transform: rotate(-105deg);
        }
        100% {
            transform: rotate(270deg);
        }
    }
    
    @-o-keyframes cssload-dot-rotate-1 {
        0% {
            -o-transform: rotate(-105deg);
        }
        100% {
            -o-transform: rotate(270deg);
        }
    }
    
    @-ms-keyframes cssload-dot-rotate-1 {
        0% {
            -ms-transform: rotate(-105deg);
        }
        100% {
            -ms-transform: rotate(270deg);
        }
    }
    
    @-webkit-keyframes cssload-dot-rotate-1 {
        0% {
            -webkit-transform: rotate(-105deg);
        }
        100% {
            -webkit-transform: rotate(270deg);
        }
    }
    
    @-moz-keyframes cssload-dot-rotate-1 {
        0% {
            -moz-transform: rotate(-105deg);
        }
        100% {
            -moz-transform: rotate(270deg);
        }
    }
    
    @keyframes cssload-dot-rotate-2 {
        0% {
            transform: rotate(165deg);
        }
        100% {
            transform: rotate(540deg);
        }
    }
    
    @-o-keyframes cssload-dot-rotate-2 {
        0% {
            -o-transform: rotate(165deg);
        }
        100% {
            -o-transform: rotate(540deg);
        }
    }
    
    @-ms-keyframes cssload-dot-rotate-2 {
        0% {
            -ms-transform: rotate(165deg);
        }
        100% {
            -ms-transform: rotate(540deg);
        }
    }
    
    @-webkit-keyframes cssload-dot-rotate-2 {
        0% {
            -webkit-transform: rotate(165deg);
        }
        100% {
            -webkit-transform: rotate(540deg);
        }
    }
    
    @-moz-keyframes cssload-dot-rotate-2 {
        0% {
            -moz-transform: rotate(165deg);
        }
        100% {
            -moz-transform: rotate(540deg);
        }
    }
    
    @keyframes cssload-dot-rotate-3 {
        0% {
            transform: rotate(435deg);
        }
        100% {
            transform: rotate(810deg);
        }
    }
    
    @-o-keyframes cssload-dot-rotate-3 {
        0% {
            -o-transform: rotate(435deg);
        }
        100% {
            -o-transform: rotate(810deg);
        }
    }
    
    @-ms-keyframes cssload-dot-rotate-3 {
        0% {
            -ms-transform: rotate(435deg);
        }
        100% {
            -ms-transform: rotate(810deg);
        }
    }
    
    @-webkit-keyframes cssload-dot-rotate-3 {
        0% {
            -webkit-transform: rotate(435deg);
        }
        100% {
            -webkit-transform: rotate(810deg);
        }
    }
    
    @-moz-keyframes cssload-dot-rotate-3 {
        0% {
            -moz-transform: rotate(435deg);
        }
        100% {
            -moz-transform: rotate(810deg);
        }
    }
    
    @keyframes cssload-dot-rotate-4 {
        0% {
            transform: rotate(705deg);
        }
        100% {
            transform: rotate(1080deg);
        }
    }
    
    @-o-keyframes cssload-dot-rotate-4 {
        0% {
            -o-transform: rotate(705deg);
        }
        100% {
            -o-transform: rotate(1080deg);
        }
    }
    
    @-ms-keyframes cssload-dot-rotate-4 {
        0% {
            -ms-transform: rotate(705deg);
        }
        100% {
            -ms-transform: rotate(1080deg);
        }
    }
    
    @-webkit-keyframes cssload-dot-rotate-4 {
        0% {
            -webkit-transform: rotate(705deg);
        }
        100% {
            -webkit-transform: rotate(1080deg);
        }
    }
    
    @-moz-keyframes cssload-dot-rotate-4 {
        0% {
            -moz-transform: rotate(705deg);
        }
        100% {
            -moz-transform: rotate(1080deg);
        }
    }    
`;
