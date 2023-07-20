import * as PIXI from "pixi.js";
import WebFont from 'webfontloader';

import LANGUAGES from "./library";

const WEB_FONT_LOAD_TIMEOUT = 10000;

 const generateFontFaceCSS = (familyName: string, url: string) => {
    const style = familyName;
    return `
        @font-face {
            font-family: "${familyName}";
            src: url('${url}');
        }
        .${familyName}, .${familyName} span, .${familyName} p, .${familyName} div {
            font-family: ${familyName} !important;
        }
    `;
}

const createStyleElement = (familyName, url) => {
    const newStyle = document.createElement('style');
    const css = generateFontFaceCSS(familyName, url);

    newStyle.appendChild(document.createTextNode(css));
    window.document.head.appendChild(newStyle);
}


const getWords = (text, locales) => {
     let words: string[] = [];

     // @ts-ignore
    const wordSegmenter = new Intl.Segmenter(locales, { granularity: 'word' });
    const wordIterator = wordSegmenter.segment(text)[Symbol.iterator]();
    for(const word of wordIterator) {
        if (!word.isWordLike) {
            continue;
        }
        words.push(word.segment);
    }
    return words;
}

// return the graphemes from a text string
const getGraphemes = (words: string[], locales) => {
     let graphemes: string[] = [];

    for(const word of words) {
        // @ts-ignore
        const graphemeSegmenter = new Intl.Segmenter(locales, { granularity: 'grapheme' });
        const graphemeIterator = graphemeSegmenter.segment(word)[Symbol.iterator]();
        for(const grapheme of graphemeIterator) {
            graphemes.push(grapheme.segment);
        }
    }
    graphemes.push(' ');

    return graphemes;
}

const loadFont = async(familyName, fontUrl) => {
     createStyleElement(familyName, fontUrl);

     return new Promise((resolve, reject) => {
         const WebFontConfig = {
            custom: {
                families: [familyName],
            },
            fontactive: (familyName, fvd) => {
                resolve(familyName);
            },
            fontinactive: (familyName, fvd) => {
                const error = new Error(`Failed to load font ${familyName}`);
                reject(error);
            },
            timeout: WEB_FONT_LOAD_TIMEOUT,
        };
        WebFont.load(WebFontConfig);
     });
}

const drawAndSelectRomanText = async() => {
    console.log('drawAndSelectRomanText')
    const app = new PIXI.Application({
        backgroundColor: 0xffffff,
        antialias: true,
        autoStart: true,
        width: 512,
        height: 196,
    });
    document.body.appendChild((app as any).view);

    const languages = Object.keys(LANGUAGES);
    const languageCount = languages.length;
    const space = 10;
    console.log('languageCount', languageCount);

    let yOffset = 0;

    const {family: fontFamily, url: fontUrl, text, locales} = LANGUAGES[languages[0]];
    console.log('fontFamily', fontFamily, 'text', text, locales);

    const words = getWords(text, locales);
    let graphemes : string[] = getGraphemes(words, locales);

    await loadFont(fontFamily, fontUrl);

    // add a div with the text to the body to confirm the font is loaded and working`
    const textDiv = document.createElement('div');
    textDiv.innerText = text;
    textDiv.style.fontFamily = fontFamily;
    document.body.appendChild(textDiv);

    // add a div with the graphemes to the body to confirm we have the correct ones
    const graphDiv = document.createElement('div');
    graphDiv.innerText = graphemes.join(' ');
    graphDiv.style.fontFamily = fontFamily;
    document.body.appendChild(graphDiv);

    const bitmapFontName = `${fontFamily}BitmapFont`;

    // NOTES:
    // - the bitmap font requires us the specify the characters or graphemes we want to use
    //   by default it will use the ASCII characters
    // - we can't add chars to the bitmap font after it has been created
    // - no kerning is available for bitmap fonts
    const bitmapFont = PIXI.BitmapFont.from(bitmapFontName,
        {fontFamily: fontFamily, fontSize: 36},
         {chars: graphemes}
    );

    // show bitmap font texture so we can see which characters are available
    const bitmapFontSprite = new PIXI.Sprite(bitmapFont.pageTextures[0]);
    app.stage.addChild(bitmapFontSprite);
    bitmapFontSprite.y = 60;

    const bitmapText = new PIXI.BitmapText(text, {
        fontName: bitmapFontName,
        fontSize: 36,
        align: 'left',
    });

    // NOTES:
    // - on the object bounds are available
    const {x, y, height, width} = bitmapText.getLocalBounds();

    app.stage.addChild(bitmapText);
    bitmapText.y = yOffset;
    yOffset += height + space;
    console.log('yOffset', yOffset);
}
drawAndSelectRomanText();