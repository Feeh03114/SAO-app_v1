if(!self.define){let e,s={};const a=(a,i)=>(a=new URL(a+".js",i).href,s[a]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=a,e.onload=s,document.head.appendChild(e)}else e=a,importScripts(a),s()})).then((()=>{let e=s[a];if(!e)throw new Error(`Module ${a} didn’t register its module`);return e})));self.define=(i,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let n={};const f=e=>a(e,t),d={module:{uri:t},exports:n,require:f};s[t]=Promise.all(i.map((e=>d[e]||f(e)))).then((e=>(c(...e),n)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Bcr3Tun3zDkJaHt83y6mM/_buildManifest.js",revision:"76eb0432609f6015f659ba1b0a6eca2a"},{url:"/_next/static/Bcr3Tun3zDkJaHt83y6mM/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/1a48c3c1-bfffbe12a0c64d36.js",revision:"bfffbe12a0c64d36"},{url:"/_next/static/chunks/2146-fe870ca113451d60.js",revision:"fe870ca113451d60"},{url:"/_next/static/chunks/221-75a6b1dbadf7c025.js",revision:"75a6b1dbadf7c025"},{url:"/_next/static/chunks/31664189-c8a30edede0fbae5.js",revision:"c8a30edede0fbae5"},{url:"/_next/static/chunks/3175-191f82e0e1f0d846.js",revision:"191f82e0e1f0d846"},{url:"/_next/static/chunks/4368-2930f2c3b72f5aee.js",revision:"2930f2c3b72f5aee"},{url:"/_next/static/chunks/5036-b076c3bdb76aaafb.js",revision:"b076c3bdb76aaafb"},{url:"/_next/static/chunks/545f34e4-ec767841d4c695c3.js",revision:"ec767841d4c695c3"},{url:"/_next/static/chunks/6114-be640645967ad36f.js",revision:"be640645967ad36f"},{url:"/_next/static/chunks/6154-3971e6276894b386.js",revision:"3971e6276894b386"},{url:"/_next/static/chunks/6310-6f4052d47be039d9.js",revision:"6f4052d47be039d9"},{url:"/_next/static/chunks/6685-1ddcb4d14db4982f.js",revision:"1ddcb4d14db4982f"},{url:"/_next/static/chunks/6893-fa2acb4fd05c4e3b.js",revision:"fa2acb4fd05c4e3b"},{url:"/_next/static/chunks/7536-05e011fa0f7adb8e.js",revision:"05e011fa0f7adb8e"},{url:"/_next/static/chunks/78e521c3-912219751d1de88d.js",revision:"912219751d1de88d"},{url:"/_next/static/chunks/8388-b678a10eb949fa28.js",revision:"b678a10eb949fa28"},{url:"/_next/static/chunks/8468-85f9f16767ee213f.js",revision:"85f9f16767ee213f"},{url:"/_next/static/chunks/901-629ef5b400aac34e.js",revision:"629ef5b400aac34e"},{url:"/_next/static/chunks/95b64a6e-5df565af8776ccc9.js",revision:"5df565af8776ccc9"},{url:"/_next/static/chunks/98ea7ec2-7111401c30865d1f.js",revision:"7111401c30865d1f"},{url:"/_next/static/chunks/d7eeaac4-14efbad5c1b22178.js",revision:"14efbad5c1b22178"},{url:"/_next/static/chunks/framework-3671d8951bf44e4e.js",revision:"3671d8951bf44e4e"},{url:"/_next/static/chunks/main-11916964220a837f.js",revision:"11916964220a837f"},{url:"/_next/static/chunks/pages/_app-8b082172aa6e48f2.js",revision:"8b082172aa6e48f2"},{url:"/_next/static/chunks/pages/_error-bd1da5a6907513b5.js",revision:"bd1da5a6907513b5"},{url:"/_next/static/chunks/pages/disciplines-96e298ebea3477e9.js",revision:"96e298ebea3477e9"},{url:"/_next/static/chunks/pages/disciplines/add-af0bfe585fedb7e6.js",revision:"af0bfe585fedb7e6"},{url:"/_next/static/chunks/pages/disciplines/edit/%5Bid%5D-7d7e5d9a57f30272.js",revision:"7d7e5d9a57f30272"},{url:"/_next/static/chunks/pages/finance-8c3770cb8eefabdb.js",revision:"8c3770cb8eefabdb"},{url:"/_next/static/chunks/pages/finance/edit/%5Bid%5D-6e5773fc8b08f3fb.js",revision:"6e5773fc8b08f3fb"},{url:"/_next/static/chunks/pages/index-492dd5c558cf6d98.js",revision:"492dd5c558cf6d98"},{url:"/_next/static/chunks/pages/login-1499258a2351d876.js",revision:"1499258a2351d876"},{url:"/_next/static/chunks/pages/pages-13e74ecd6ea4beea.js",revision:"13e74ecd6ea4beea"},{url:"/_next/static/chunks/pages/pages/add-1b86948a83ec1010.js",revision:"1b86948a83ec1010"},{url:"/_next/static/chunks/pages/pages/edit/%5Bid%5D-06e1f5dc8faf3f8f.js",revision:"06e1f5dc8faf3f8f"},{url:"/_next/static/chunks/pages/patients-b64c41dd824f83ec.js",revision:"b64c41dd824f83ec"},{url:"/_next/static/chunks/pages/patients/add-cb6c41fec7e7e58c.js",revision:"cb6c41fec7e7e58c"},{url:"/_next/static/chunks/pages/patients/edit/%5Bid%5D-6b25c953db3ede75.js",revision:"6b25c953db3ede75"},{url:"/_next/static/chunks/pages/profiles-8db449650d8f581f.js",revision:"8db449650d8f581f"},{url:"/_next/static/chunks/pages/profiles/add-a5a1d2a45e1f7a3a.js",revision:"a5a1d2a45e1f7a3a"},{url:"/_next/static/chunks/pages/profiles/edit/%5Bid%5D-c5c61f615e5f5528.js",revision:"c5c61f615e5f5528"},{url:"/_next/static/chunks/pages/resetpassword-49a1b7834a722f48.js",revision:"49a1b7834a722f48"},{url:"/_next/static/chunks/pages/schedule-faccbd02ee2667e1.js",revision:"faccbd02ee2667e1"},{url:"/_next/static/chunks/pages/schedule/DayListModal-52a1b4c214603828.js",revision:"52a1b4c214603828"},{url:"/_next/static/chunks/pages/schedule/ScheduleModal-aa324ae9d7b09dbf.js",revision:"aa324ae9d7b09dbf"},{url:"/_next/static/chunks/pages/schedule/report_patient/%5Bid%5D-793abeb7fb8453ad.js",revision:"793abeb7fb8453ad"},{url:"/_next/static/chunks/pages/terms-privacy-79f7d79b7330c0b9.js",revision:"79f7d79b7330c0b9"},{url:"/_next/static/chunks/pages/terms-privacy/add-8b2de4fb512db4f5.js",revision:"8b2de4fb512db4f5"},{url:"/_next/static/chunks/pages/users-4aabf8322da971e3.js",revision:"4aabf8322da971e3"},{url:"/_next/static/chunks/pages/users/edit/%5Bid%5D-b5d07c2fb884560c.js",revision:"b5d07c2fb884560c"},{url:"/_next/static/chunks/pages/waiting-line-d60fa16a1f2b0c3e.js",revision:"d60fa16a1f2b0c3e"},{url:"/_next/static/chunks/pages/waiting-line/edit/%5Bid%5D-aeb9341148821df3.js",revision:"aeb9341148821df3"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-9055d1a5821fee74.js",revision:"9055d1a5821fee74"},{url:"/_next/static/css/2182.css",revision:"366e318db2b69839fab0ceee84bbb36d"},{url:"/_next/static/css/37aaffb7eece03b1.css",revision:"37aaffb7eece03b1"},{url:"/_next/static/css/5eca4a48665d6cf5.css",revision:"5eca4a48665d6cf5"},{url:"/_next/static/css/686f460182f81f34.css",revision:"686f460182f81f34"},{url:"/_next/static/css/pages/_app.css",revision:"7e6ccda9be080b36bef705413c9757f3"},{url:"/_next/static/css/pages/schedule.css",revision:"f8c609b4352a29f5f3359aeaab09fffe"},{url:"/_next/static/css/pages/schedule/ScheduleModal.css",revision:"f8c609b4352a29f5f3359aeaab09fffe"},{url:"/_next/static/media/05a31a2ca4975f99-s.woff2",revision:"f1b44860c66554b91f3b1c81556f73ca"},{url:"/_next/static/media/0662b626da5db789-s.woff2",revision:"7092f7117afa134bee383085e5baffcb"},{url:"/_next/static/media/10939feefdad71be-s.woff2",revision:"72b3ae37567ee5efdf2254b657c36ba9"},{url:"/_next/static/media/1b097aa12b72d9f9-s.woff2",revision:"ba40202b1c1dcacbdbb7bcd2042a410f"},{url:"/_next/static/media/1fe84a733deddad4-s.woff2",revision:"c9f346d5d19d0d10e27b26904f5f6d7f"},{url:"/_next/static/media/20b8b8f6f47c1e10-s.woff2",revision:"7def222d1a45cb1cb7d8c3ae675dbdcc"},{url:"/_next/static/media/370d1cc320ec5619-s.woff2",revision:"a6ff41d10fa89e7f8fec937c243d7428"},{url:"/_next/static/media/376dd8dc38524313-s.p.woff2",revision:"af4d371a10271dafeb343f1eace762bc"},{url:"/_next/static/media/3828f203592f7603-s.woff2",revision:"e9fd398a43c9e51f9ee14e757eaf95d9"},{url:"/_next/static/media/51051a7edfeea436-s.woff2",revision:"f1b74fe764967ea8636858297f750d66"},{url:"/_next/static/media/513657b02c5c193f-s.woff2",revision:"c4eb7f37bc4206c901ab08601f21f0f2"},{url:"/_next/static/media/51ed15f9841b9f9d-s.woff2",revision:"bb9d99fb9bbc695be80777ca2c1c2bee"},{url:"/_next/static/media/591327bf3b62a611-s.woff2",revision:"0ed299a4bb5262e17e2145783b2c18f1"},{url:"/_next/static/media/7777133e901cd5ed-s.p.woff2",revision:"a09f2fccfee35b7247b08a1a266f0328"},{url:"/_next/static/media/7a78f1ce0329757f-s.p.woff2",revision:"15ef609d3bea2ccc8a36910ba440e1f3"},{url:"/_next/static/media/839135d04a097cea-s.woff2",revision:"79e6e81d255edac7e8627c7e16baccf5"},{url:"/_next/static/media/87c72f23c47212b9-s.woff2",revision:"790d0c8dbcd491d29d58f1369c199d40"},{url:"/_next/static/media/8d1a51bb45dd4d14-s.woff2",revision:"185244e129c78b5a1e8de9b0319e5f93"},{url:"/_next/static/media/916d3686010a8de2-s.p.woff2",revision:"9212f6f9860f9fc6c69b02fedf6db8c3"},{url:"/_next/static/media/953974ac5e9ff354-s.woff2",revision:"6731e1ba3788bda094c89ee8fc131aef"},{url:"/_next/static/media/97a9b9c5d2a0c527-s.woff2",revision:"5a21e2433dd0433ddc43877d18467e38"},{url:"/_next/static/media/9a881e2ac07d406b-s.p.woff2",revision:"25b0e113ca7cce3770d542736db26368"},{url:"/_next/static/media/9b44cfc48addbfc9-s.woff2",revision:"b8f12782fb372c92a5c8e3380f926e17"},{url:"/_next/static/media/a2117d63e64fe351-s.p.woff2",revision:"14631968d3384a8f413a906f85eb5659"},{url:"/_next/static/media/ac614beb32f7a7c2-s.woff2",revision:"20f5992a9c019fb146a38e1cc0c101d3"},{url:"/_next/static/media/aefc8ad6d88b3354-s.woff2",revision:"6a4298fc0390ec22c52f618daa0e82bf"},{url:"/_next/static/media/bd427f25ac24d036-s.p.woff2",revision:"5426bf50c8455aab7a3e89d1138eb969"},{url:"/_next/static/media/c04551857776278f-s.p.woff2",revision:"8d91ec1ca2d8b56640a47117e313a3e9"},{url:"/_next/static/media/c9a5bc6a7c948fb0-s.p.woff2",revision:"74c3556b9dad12fb76f84af53ba69410"},{url:"/_next/static/media/d36a2a2bb416f59e-s.p.woff2",revision:"a7f7eebec745ef48ccf7a3d08c66d84a"},{url:"/_next/static/media/d6b16ce4a6175f26-s.woff2",revision:"dd930bafc6297347be3213f22cc53d3e"},{url:"/_next/static/media/d869208648ca5469-s.p.woff2",revision:"72993dddf88a63e8f226656f7de88e57"},{url:"/_next/static/media/e025c64520263018-s.woff2",revision:"dc820d9f0f62811268590ff631f36be9"},{url:"/_next/static/media/ec159349637c90ad-s.woff2",revision:"0e89df9522084290e01e4127495fae99"},{url:"/_next/static/media/f93b79c1ea023ab6-s.woff2",revision:"96b6d54684daa94742f7bfd72a981213"},{url:"/_next/static/media/fd4db3eb5472fc27-s.woff2",revision:"71f3fcaf22131c3368d9ec28ef839831"},{url:"/android-chrome-192x192.png",revision:"6ea55af800f4e5eb1a32c61d9e2bd89d"},{url:"/android-chrome-512x512.png",revision:"7267a833e44fa943de5fc49e028eb108"},{url:"/apple-touch-icon.png",revision:"ed9cc75afb47fbe1e73f462316c71866"},{url:"/assets/EvolutionSoft.png",revision:"d06ad95d22b9e8f09fcd7f47a24a2514"},{url:"/assets/Nlogouniso.png",revision:"3880635e73f431e2c3aaabbce513b4c6"},{url:"/assets/Odonto.png",revision:"6499c76909684d8abb7fc5f450eac10d"},{url:"/assets/SVG/Group 641.svg",revision:"a8c775b29f864b001d7be4be73352760"},{url:"/assets/SVG/fotoUniso_homePage.svg",revision:"f10208c36a12755562a74c1e44e08a9a"},{url:"/assets/SVG/logo.svg",revision:"1e302e82a9a807763c937d0416b1c560"},{url:"/assets/SVG/odonto_homePage.svg",revision:"1a2d0c15314c9a5fd74eedff70b0aff7"},{url:"/assets/avatar_doutor.png",revision:"0ac5dce09c3c3fd71bdbf1a2e54b07c4"},{url:"/assets/bubble.png",revision:"d75f17dcfb97ba99a94d500515e91f08"},{url:"/assets/bubble_dark.png",revision:"43ca161dfbcf0aef9e32d5d2fa64e234"},{url:"/assets/ellipse_dark_1.png",revision:"d73246b6eb1747c4c0bda8874fa180a6"},{url:"/assets/ellipse_dark_2.png",revision:"29a8bc36ad042b3a543f28d8e0cfc1c7"},{url:"/assets/ellipse_light_1.png",revision:"3794b8108e3f5cb215514a41cd68ca27"},{url:"/assets/ellipse_light_2.png",revision:"4badf40f1d0a79bf83399f3332836119"},{url:"/assets/home/alunos/felipe.jpg",revision:"178894907939d7ba5bfe64194ab757e7"},{url:"/assets/home/alunos/kioyshi.jpg",revision:"699dab3b6484efd660a3acdc624349b3"},{url:"/assets/home/alunos/leme.jpg",revision:"898e0a33222e856aa686b0f44ff353eb"},{url:"/assets/home/professores/denicezar.jpg",revision:"2dd7bdde1cac205bf72598489787756e"},{url:"/assets/home/professores/michel.jpg",revision:"08a11f7ca7f2e5f3baa4990a6568954b"},{url:"/assets/log1.png",revision:"02be9aea4398763551bce5ed8487c3f1"},{url:"/assets/logo-extensiva-color.png",revision:"455339b4c170722cb36ae859382c1ce6"},{url:"/assets/logo1.png",revision:"ae3b7c7fa6aa960af582e24eaba5801a"},{url:"/assets/logo3.png",revision:"ab5dbec9b7367996a15669d83f099204"},{url:"/assets/logo4.png",revision:"2dd799634ff650eb50043645c9bccb60"},{url:"/assets/logo_black.png",revision:"e87f770209207149bec98b8cfaab5495"},{url:"/assets/logo_nucleo_ti.png",revision:"13181edd4a02fb72eb8daa2fd8108b0a"},{url:"/assets/logo_odonto.png",revision:"f46d98004adb492acbc865e62ad3b8f8"},{url:"/assets/logo_uniso_white.png",revision:"aee6981c3002ee87b9578a0a3a8c3219"},{url:"/assets/logo_white.png",revision:"e5289c627fb26d4ecfb98d2809e5256f"},{url:"/favicon-16x16.png",revision:"12f96eb49159155cf9dd46862d931a81"},{url:"/favicon-32x32.png",revision:"a0121203d064d726da8d5c2d295eb101"},{url:"/favicon.ico",revision:"f86876bde2e51479663fc70149d574bd"},{url:"/manifest.json",revision:"53c4bbf9c846802e451e66eb9d2a0b86"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:a,state:i})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
