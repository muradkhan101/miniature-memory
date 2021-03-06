//Constants for website build
const base = 'blog';
const api = 'api';
const makeURL = (entry) => `http://${entry}.tycc.io`
const baseURL = makeURL(base);

const footer = {
    copyright: `Copyright &copy; ${(new Date()).getFullYear()} Murad Khan - All Rights Reserved`,
    summary: 'This blog was created not only as a new pet project for me to practice new development techniques, but also ' +
             'as a way for me to teach others about a variety of topics. My main focus will be front-end development, ' +
             'since that is my what I spend a majority of my time on. However, I will post about other topics I am learning, ' +
             'such as machine learning, back-end development, AWS, and others. I hope you gain something useful and the posts are ' +
             'as helpful for you to read as they are for me to write!'
};

const navigation = [
    {
        href: baseURL,
        title: 'Home'
    },
    {
        href: `${baseURL}/categories`,
        title: 'Categories'
    },

    {
        href: `${makeURL(api)}/random`,
        title: 'Random'
    },
    {
        href: `${makeURL(api)}/search`,
        title: 'Search'
    }
];
const footerNav = [
    {
        href: baseURL,
        title: 'Home'
    },
    {
        href: `${baseURL}/categories`,
        title: 'Categories'
    },

    {
        href: `${makeURL(api)}/random`,
        title: 'Random'
    },
    {
        href: `https://github.com/muradkhan101`,
        title: 'My Github'
    }
];
const blogname = 'Things You Can Code';
module.exports = {
  navigation,
  footer,
  blogname,
  baseURL,
  footerNav
}
