const fs = require("fs");
const path = require("path")
function parseSchoolInfo(school) {
    
    let contents = fs.readFileSync(path.join(__dirname, `../res/${school}/availability.txt`), "utf8");
    let content_lines = contents.split('\n');

    let currentDayOfWeek = null;
    let retObj = {};

    for (let i = 0; i < content_lines.length; i++) {
        const matchDayOfWeek = content_lines[i].match(/^-([A-Z]+)$/i);
        if (matchDayOfWeek && matchDayOfWeek.length >= 2){
            currentDayOfWeek = matchDayOfWeek[1];
            retObj[currentDayOfWeek] = [];
        } else if (currentDayOfWeek) {
            const matchProps = content_lines[i].match(/^--([A-Z]+)*/i);
            if (matchProps && matchProps.length == 2){
                let prop = [];
                let index = -1;
                switch(matchProps[1]) {
                    case 'Room':
                        prop = content_lines[i].match(/^--([A-Z]+)[:]\s([A-Z0-9]+)$/i);
                        if (prop && prop.length == 3) {
                            roomStatus = {};
                            roomStatus[prop[1]] = prop[2];
                            retObj[currentDayOfWeek].push(roomStatus);
                        }
                        break;
                    case 'Time':
                        prop = content_lines[i].match(/^--([A-Z]+)[:]\s[(](\d+[:]\d+\s[A-Z]+)-(\d+[:]\d+\s[A-Z]+)[)]$/i);
                        index = retObj[currentDayOfWeek].length - 1;
                        if (index >= 0 && prop.length == 4) {
                            retObj[currentDayOfWeek][index]['start'] = prop[2];
                            retObj[currentDayOfWeek][index]['end'] = prop[3];
                        }
                        break;
                    case 'Increment':
                        prop = content_lines[i].match(/^--([A-Z]+)[:]\s(\d+\s[A-Z]+)$/i)
                        index = retObj[currentDayOfWeek].length - 1;
                        if (index >= 0 && prop.length == 3) {
                            retObj[currentDayOfWeek][index]['increment_time'] = prop[2];
                            
                        }
                    default:
                        break;
                }
            }
        }
    }
    return retObj;
}
module.exports = parseSchoolInfo;