import multer, { Multer } from 'multer';
export class Upload {
  private upload: Multer;
  constructor(private isMulti: boolean, private storageType: 'memory' | 'disk', private dest: string,private fileName?:string,private type?:string) {
    if (storageType === 'disk') {
      this.upload = multer({
        storage: multer.diskStorage({
          destination: (req,file,cb)=>{
                let folder = type?`${dest}/${type}`:dest;
                cb(null,folder);
          },
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname);
          },
        }),
      });
    } else {
      this.upload = multer({ storage: multer.memoryStorage() });
    }
  }
  get uploadMiddleware(){
    return this.isMulti? this.upload.array('files'):this.upload.single(this.fileName || 'myfile')
  }
}
