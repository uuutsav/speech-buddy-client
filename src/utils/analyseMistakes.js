const _ = require('lodash')

const analyseMistakes = (text, transcript) => {
    const arrText = _.words(_.lowerCase(text))
    const arrSpoken = _.words(_.lowerCase(transcript))

    const mistakes = _.difference(arrText, arrSpoken).filter(word => word.length > 2);
    let str = "";
    for (let i = 0; i < mistakes.length; i++){
        str += " "  + mistakes[i];
    }
    return str;
}

export default analyseMistakes;