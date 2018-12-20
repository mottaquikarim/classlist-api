const fs = require('fs');
const FILE_NAME = 'users.txt'

const save = (userList, cb) => {
    console.log('IN function save')
    const userRows = [];
    for (let user of userList) {
        console.log(user)
        userRows.push(user.name +','+ user.age)
    }
    console.log(userRows)
    const fileblob = userRows.join('\n');
    console.log(fileblob)
    fs.writeFile(FILE_NAME, fileblob, (err, res) => {
        cb(err, res)
    })
};

const load = (cb) => {
    console.log('in LOAD!')
    fs.readFile(FILE_NAME, 'utf8', (err, data) => {
        if (!data) {
            cb(err, [])
            return;
            
        }
        const rows = data.split('\n')
        const users = [];
        console.log(err, rows)
        for (let row of rows) {
            const bits = row.split(',');
            users.push({name: bits[0], age: parseInt(bits[1], 10)})
        }
        console.log('ABOUT TO RUN')
        cb(err, users)
    })
}

const add = (row, cb) => {
    // load existing content
    // update with new row
    // save new content

    load((err, currentUsers) => {
        console.log(currentUsers)
        currentUsers.push(row);
        save(currentUsers, (err, res) => {
            console.log(err)
            // we done - new content saved
            cb(err, res)
        });
    })
}

module.exports = {
    save,
    load,
    add,
}