import Moment from 'moment';

export const MOCK_BANNER = {
  "list": [
    {
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666330087/H4ZP/banner/WEB_28latest_29_dyhbkq.jpg",
      "title": "Fighting Poverty one Step at a Time",
      "subTitle": "HANDS 4 ZERO POVERTY"
    },
    {
      "subTitle": "HANDS 4 ZERO POVERTY",
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666330174/H4ZP/banner/Contact-_28R_29_ie4ecj.jpg",
      "title": "Fighting Poverty one Step at a Time"
    },
    {
      "subTitle": "HANDS 4 ZERO POVERTY",
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666330191/H4ZP/banner/about_28reduced_29_ug5nwo.jpg",
      "title": "Fighting Poverty one Step at a Time"
    }
  ],
  "fluid": true,
  "theme": "",
  "order": 1,
  "component": "banner",
  "parallax": true
}

export const MOCK_GROUP = {
  "imgRatio": "1:1",
  "title": "OTHER SPECIAL PROJECTS",
  "style": "rounded-circle",
  "component": "group",
  "itemInRow":3,
  "order": 4,
  "list": [
      {
        "title": "Fighting Poverty one Step at a Time",
        "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436083/H4ZP/group/moreProject/image-asset_izixlp.jpg"
      },
      {
        "title": "Fighting Poverty one Step at a Time",
        "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436096/H4ZP/group/moreProject/DSC_1096_khblje.jpg"
      },
      {
        "title": "Fighting Poverty one Step at a Time",
        "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666436109/H4ZP/group/moreProject/H4ZP_IRC_Video_Contest_cuprg7.jpg",
      }
  ],
  "fluid": false,
  "theme": "",
  "description": "Join the group of people helping to make life better for the people living in extreme poverty. The H4ZP projects are possible because of the support and care of people like you."
}

export const MOCK_JUMBOTRON = {
  "order": 2,
  "btnList": [
    {
      "btnLink": "",
      "btnText": "FUNDLY"
    },
    {
      "btnText": "H4ZP",
      "btnLink": ""
    }
  ],
  "fluid": false,
  "theme": "",
  "component": "jumbotron",
  "title": "We are back!",
  "description": "Supporting medical camps, food and shoe distributions, medical and school supplies, and much more. Help us expand our reach by donating today using Fundly or the H4ZP website."
}

export const MOCK_NEWS = {
  "list": [
    {
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666336275/H4ZP/news/initial/Hands_4_Zero_Poverty_H4ZP_Street_Blanket_Distribution_rlopmk.jpg",
      "reference": "",
      "description": "In the last recent years, India has been experiencing record low-temperatures during the winter season. It has caught many of its citizens off-guard, especially people who live on the streets. Hands 4 Zero Poverty—along with loving volunteers—walked through the night to find and provide people with blankets and food.  The H4ZP team distributed 100 blankets and 150 sandwiches. We invite you to view the web page created to document the event…",
      "footer": "If you would like to support or join us on the ground, helping communities in need, please contact us out at info@h4zp.org. We would be delighted to get your help.",
      "BtnText": "BLANKET & FOOD DISTRIBUTION",
      "BtnUrl": "/",
      "title":'Title',
      "date": Moment(new Date()).format('YYYY-MM-DD'),
      "credit":''
    },
    {
      "reference": "",
      "BtnText": "FOOD DISTRIBUTION",
      "footer": "If you would like to support a food distribution, contact us at info@h4zp.org.",
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666336289/H4ZP/news/initial/Hands_4_Zero_Poverty_7C_Food_Distribution_u8imb2.jpg",
      "description": "Poverty can lead to household food insecurity, inadequate care, and lack of proper health. Malnutrition is a contributor to poverty. Malnutrition impedes the ability for people to perform simple tasks. It weakens their body, their immune system. Thanks to our supporters, Hands 4 Zero Poverty continues to support food distributions across communities in need. Click on the link below to view H4ZP's latest food distribution and learn what medical professionals shared with us regarding consequences associated with malnutrition.",
      "BtnUrl": "/",
      "title":'Title',
      "date": Moment(new Date()).format('YYYY-MM-DD'),
      "credit":''
    },
    {
      "BtnUrl": "#",
      "description": "Thanks to our supporters, Hands 4 Zero Poverty (H4ZP) brought two Doctors and four Nurses to the slums. One hundred and sixty-five people came seeking medical care. Medical care is not a luxury; it is a necessity. Everyone should have access to free medical care. We are honored to be able to serve these people with your help. Together we will continue providing support to the communities in need.",
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666336300/H4ZP/news/initial/Hands_4_Zero_Poverty_7C_H4ZP_7C_Medical_Camp_eqgxkz.jpg",
      "footer": "If you would like to support a Medical Camp, contact us at info@h4zp.org.",
      "reference": "",
      "BtnText": "MEDICAL CAMP",
      "title":'Title',
      "date": Moment(new Date()).format('YYYY-MM-DD'),
      "credit":''
    },
    {
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666336312/H4ZP/news/initial/Hands_4_Zero_Poverty_7C_H4ZP_7C_Scholarship_myd5mf.jpg",
      "footer": "If you would like to support a  child's education, contact us at info@h4zp.org.",
      "BtnText": "SNEHA STORY",
      "description": "Thanks to your support, Hands 4 Zero Poverty had to privilege to provide the means to welcome a child back to school after one year. Due to financial distress, Sneha’s family had no choice but to pull her out of school. Sneha is now back in school, where she belongs. \n We can make a positive change in people's lives. If you are interested in sponsoring a child's education, contact us at info@h4zp.org. The estimated cost for a child's education is $25-30 per month. We pledge one-hundred percent of your contributions go towards the child's education.We invite you to read the blog written by Mikaela Cauble describing Sneha's story. We hope to continue sharing stories as such.",
      "reference": "",
      "BtnUrl": "#",
      "title":'Title',
      "date": Moment(new Date()).format('YYYY-MM-DD'),
      "credit":''
    }
  ],
  "component": "news",
  "title": "Recent news",
  "order": 6,
  "fluid": false,
  "theme": "",
}

export const MOCK_BLOGS ={
  "list": [
    {
      "BtnUrl": "#",
      "reference": "",
      "description": "Seventy-five families received food supplies to last the average family of five approximately 2~3 weeks…",
      "title": "Learn about our fall 2022 food distribution ",
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666334204/H4ZP/blogs/oct-2022/IMG_2816-2_28R_29_ybs592.jpg",
      "BtnText": "Read more",
      "date": Moment(new Date()).format('YYYY-MM-DD'),
      "credit":''
    },
    {
      "description": "One hundred and thirty-four people attended the camp…",
      "url": "https://res.cloudinary.com/ddfh2nxrt/image/upload/v1666334192/H4ZP/blogs/oct-2022/Food_distribution_ciwdpv.jpg",
      "BtnUrl": "#",
      "BtnText": "Read more",
      "reference": "",
      "date": Moment(new Date()).format('YYYY-MM-DD'),
      "credit":'',
      "title": "Learn about our recent medical camp, completed as part of our fall 2022 projects. "
    }
  ],
  "component": "blogs",
  "order": 4,
  "title": "Recent Activities",
  "more": "",
  "fluid": false,
  "theme": "",
}

export const MOCK_IFRAME = {
  "component": "iframe",
  "theme": "bg-light",
  "order": 5,
  "mute": true,
  "url": "//www.youtube.com/embed/xPFlY6fY2c0?wmode=opaque&enablejsapi=1",
  "autoplay": false,
  "fluid": false
}