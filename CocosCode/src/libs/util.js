let util = {

};
util.title = function (title) {
    title = title ? title + ' - Home' : 'Cocos代码片';
    window.document.title = title;
};

export default util;