const AWS = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const path = require('path');
const secret_config = require("../../../config/secret");

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: secret_config.accessKeyId,
    secretAccessKey: secret_config.secretAccessKey,
  });
  
const s3 = new AWS.S3()

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.bmp']

//랜덤 문자열 생성
const generateRandomString = (num) => {
  const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let result = '';
  const charactersLength = characters.length;
  for (let i = 0; i < num; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

let randomStr = generateRandomString(15)

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'astrochaser', // 생성한 버킷 이름을 적어주세요.
    key: (req, file, callback) => {
      console.log(req)
      const uploadDirectory = randomStr // 업로드할 디렉토리를 설정하기 위해 넣어둔 코드로, 없어도 무관합니다.
      const extension = path.extname(file.originalname)

      if (!allowedExtensions.includes(extension)) { // extension 확인을 위한 코드로, 없어도 무관합니다.
        return callback(new Error('wrong extension'))
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
    },
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read-write'
  }),
})

module.exports ={
    imageUploader
} 