var imgbbUploader = require('imgbb-uploader');
const path = require('path');
const fs = require('fs');

const dirpath = '/Users/alumnus/ramiz/images';

var noOfFiles = 0;
var images = [];

function uploadImageToImg(file) {

    imgbbUploader('44e1646b2595df7da4c28c762ebf32cb', dirpath + '/' + file)
        .then(res => images.push({
            id: images.length + 1,
            url: res.display_url
        }))
        .then(()=>console.log("Successfully upload " + images.length + " images"))
        .then(() => {
            if (images.length === noOfFiles){
                const jsonString = JSON.stringify(images)
                fs.writeFile('./output.json', jsonString, err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file')
                    }
                })
            }
        })
        .catch(err => console.log("err: ", err))

}

fs.readdir(dirpath, function (err, files) {
    //handling error
    if (err) {
        return console.log('Unable to scan directory: ' + err);
    }

    noOfFiles = files.length;

    files.forEach(function (file) {
        uploadImageToImg(file)
    });
    console.log("images are: ", images)
})
