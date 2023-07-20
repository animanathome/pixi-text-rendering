const ROMAN_FONT = {
    family: 'Poppins',
    url: 'https://storage.googleapis.com/lumen5-site-css/Poppins-Bold.ttf',
    text: 'The potato is brown',
    locales: 'en',
};
const BENGALI_FONT = {
    family: 'NotoSansBengali',
    url: 'https://storage.googleapis.com/lumen5-site-css/NotoSansBengali-Regular.ttf',
    text: 'এটা বিশ্ব এবং তার নাগরিকদের',
    locales: 'bn',
};
const ARABIC_FONT_URL = {
    family: 'NotoNaskhArabic',
    url: 'https://storage.googleapis.com/lumen5-site-css/NotoNaskhArabic-Medium.ttf',
    text: 'البطاطس بنية اللون',
    locales: 'aao',
};
const HEBREW_FONT_URL = {
    family: 'NotoSansHebrew',
    url: 'https://storage.googleapis.com/lumen5-site-css/NotoSansHebrew-Medium.ttf',
    text: 'תפוחי אדמה חומים',
    locales: 'he',
}
const CHINESE_FONT_URL = {
    family: 'NotoSansSimpleChinese',
    url: 'https://storage.googleapis.com/lumen5-site-css/NotoSansSC-Medium.otf',
    text: '诶必西弟衣艾付记爱耻挨宅开饿罗饿母恩呕',
    locales: 'zh',
};

const LANGUAGES = {
    'en': ROMAN_FONT,
    'bn': BENGALI_FONT,
    'ar': ARABIC_FONT_URL,
    'he': HEBREW_FONT_URL,
    'zh': CHINESE_FONT_URL,
}

export default LANGUAGES;