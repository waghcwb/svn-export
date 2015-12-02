var fs = require('fs-extra');
var regex = /-*.(.*)-*./g;
var separator = '------------------------------------------------------------------------';
var parsed = '';
var lastDate;

fs.readFile('svn-log.log', 'utf-8', function (error, content) {
    if (error) {
        return error;
    }

    var commits = content.split(separator), commitOrganizer = {};

    commits.forEach(function (commit, index) {

        var commitData = extractData(commit);

        if (commitData) {
            if (lastDate) {
                var duration = getTaskDuration(lastDate, new Date(Date.parse(commitData.commitDate)));
                
                lastDate = new Date(Date.parse(commitData.commitDate))
            } else {
                lastDate = new Date(Date.parse(commitData.commitDate))
            }

            parsed += '<tr>';
            parsed += '<td contenteditable>' + commitData.commitRevision + '</td>';
            parsed += '<td contenteditable>' + commitData.commitDate + '</td>';
            parsed += '<td contenteditable>' + getDurationString(duration) + '</td>';
            parsed += '<td contenteditable>' + commitData.commitMessage + '</td>';
            parsed += '</tr>';
        }
    });

    fs.outputFile('final.html', parsed, function (error) {
        if (error) {
            return error;
        }
        else {
            console.info('Arquivo gerado com sucesso');
        }
    });
});

function extractData(commit) {

    try {
        // var commitData = JSON.stringify(commit.replace(/\r|\n/g, "#")).match(/##r(\d+)\s+\|\s+(.*?)\s+\|\s+(.*?)\(.*?\).*####(.*?)##/);

        var infos = commit.match(/(r\d*) \| (.*) \| (.*) \| (.*)/g);
        var descriptions = commit.split('Changed paths:');

        if(infos) {
            if(descriptions[1]) {
                var re = descriptions[1].replace(/[A-Z] (.*)/g, '$1');
                var file = re.split('\n')[1].trim();
                var description = re.split('\n')[3].trim();
                    infos = infos[0].split('|');

                var revision = infos[0].trim().split('r')[1];
                var user = infos[1].trim();
                var convert = new Date(infos[2].trim());
                var month = (convert.getMonth() + 1);
                
                return {
                    commitRevision: revision,
                    commitUser: user,
                    commitDate: convert,
                    commitMessage: description
                }
            }
        }

    } catch (e) {
        console.error(e);

        return null
    }
}

function getTaskDuration(lastDate, currentDate) {
    var interval = currentDate - lastDate;
    
    return {
        inDays: Math.round(interval / 86400000),
        inHours: Math.round((interval % 86400000) / 3600000),
        inMinutes: Math.round(((interval % 86400000) % 3600000) / 60000)
    }
}

function getDurationString(duration) {
    return (duration)
        // ? duration.inDays + ' Dia(s), ' + duration.inHours + ' hora(s), ' + duration.inMinutes + ' Minuto(s)'
        ? duration.inDays + ':' + duration.inHours + ':' + duration.inMinutes
        : 'indefinida';
}
