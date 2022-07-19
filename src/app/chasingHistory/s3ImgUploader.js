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

const imageUploader = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'astrochaser', // 생성한 버킷 이름을 적어주세요.
    key: (req, file, callback) => {
      const uploadDirectory = req.query.title // 업로드할 디렉토리를 설정하기 위해 넣어둔 코드로, 없어도 무관합니다.
      const extension = path.extname(file.originalname)
      if (!allowedExtensions.includes(extension)) { // extension 확인을 위한 코드로, 없어도 무관합니다.
        return callback(new Error('wrong extension'))
      }
      callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`)
    },
    acl: 'public-read-write'
  }),
})

  
module.exports ={
    imageUploader
} 