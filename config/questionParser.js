const fs = require('fs');
const path = require('path');
function parseQuestions(school){
    let contents = fs.readFileSync(path.join(__dirname, `../res/${school}/survey_questions.txt`), "utf8");
    let content_lines = contents.split('\n');

    let currentUserType = null;
    let retObj = {};
    for (let i = 0; i < content_lines.length; i ++) {
        //matches string with "-" in the beginning
        let matchResult = content_lines[i].match(/^-([A-Z]+)/i);
       
        if (matchResult && matchResult.length >= 2){
            currentUserType = matchResult[1];
            retObj[currentUserType] = [];
        }else if (currentUserType){
            //matches to the question the the ran
            let matchQuestion = content_lines[i].match(/^[$]R[$]([A-Z\s\-_\/]+)\s[(](\d)-(\d)[)]$/i); 
            console.log(matchQuestion)
            if (matchQuestion && matchQuestion.length >= 4) {
                retObj[currentUserType].push({
                    original_text: matchQuestion[0],
                    body: matchQuestion[1],
                    type: "range",
                    start: parseInt(matchQuestion[2]),
                    end: parseInt(matchQuestion[3])
                });
            }
        }
    }
    return retObj;
}

module.exports = parseQuestions;